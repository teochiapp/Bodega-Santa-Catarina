const prisma = require('./prismaClient');
const crypto = require('crypto');
const {
  enviarConfirmacionReserva,
  enviarCancelacionReserva,
  enviarReprogramacionReserva,
} = require('./reservaEmailService');

// ─── Configuración ──────────────────────────────────────────────────────────
const DIAS_ANTELACION_MIN = 1; // no se puede reservar para hoy
const MAX_PERSONAS_POR_RESERVA = 10;
const ESTADOS_ASISTENCIA = ['ASISTIO', 'NO_ASISTIO', 'CONFIRMADA'];

/** Error de negocio con status HTTP asociado (los controllers lo traducen). */
class ReservaError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

// ─── Utilidades de fecha (todo en UTC para evitar desfases de zona horaria) ──
const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;
const HORA_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const parseFecha = (str) => {
  if (!FECHA_RE.test(str || '')) throw new ReservaError('Fecha inválida (formato YYYY-MM-DD)');
  const d = new Date(`${str}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== str) {
    throw new ReservaError('Fecha inválida');
  }
  return d;
};

const hoyUTC = () => {
  const n = new Date();
  return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
};

const fechaMinima = () => {
  const d = hoyUTC();
  d.setUTCDate(d.getUTCDate() + DIAS_ANTELACION_MIN);
  return d;
};

const fmt = (d) => d.toISOString().slice(0, 10);

const generarCodigo = () => `SC-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

// ─── Disponibilidad ─────────────────────────────────────────────────────────

const obtenerDiasBloqueados = async (desde, hasta) => {
  const vac = await prisma.diaVacacion.findMany({
    where: { activo: true, fechaFin: { gte: desde }, fechaInicio: { lte: hasta } },
  });
  return vac;
};

const estaBloqueada = (fecha, vacaciones) =>
  vacaciones.some((v) => {
    const ini = new Date(v.fechaInicio); ini.setUTCHours(0, 0, 0, 0);
    const fin = new Date(v.fechaFin); fin.setUTCHours(23, 59, 59, 999);
    return fecha >= ini && fecha <= fin;
  });

// ─── Disponibilidad para Catas ──────────────────────────────────────────────
const obtenerDisponibilidadCataMes = async (cataId, mes) => {
  const id = parseInt(cataId, 10);
  const cata = await prisma.cata.findUnique({ where: { id }, include: { horarios: { where: { activo: true } } } });
  if (!cata || !cata.activo) throw new ReservaError('Experiencia no encontrada', 404);

  const [y, m] = mes.split('-').map(Number);
  const inicio = new Date(Date.UTC(y, m - 1, 1));
  const fin = new Date(Date.UTC(y, m, 0));
  const minima = fechaMinima();

  const [sesiones, vacaciones] = await Promise.all([
    prisma.sesionCata.findMany({ where: { cataId: id, fecha: { gte: inicio, lte: fin } } }),
    obtenerDiasBloqueados(inicio, fin),
  ]);
  const ocupadas = new Map(sesiones.map((s) => [`${fmt(s.fecha)}|${s.hora}`, s.plazasReservadas]));

  const dias = {};
  for (let d = new Date(inicio); d <= fin; d.setUTCDate(d.getUTCDate() + 1)) {
    if (d < minima || estaBloqueada(d, vacaciones)) continue;
    const slots = cata.horarios
      .filter((h) => h.diaSemana === d.getUTCDay())
      .sort((a, b) => a.hora.localeCompare(b.hora))
      .map((h) => {
        const cupo = h.cupo ?? cata.cupoPorSesion;
        const usadas = ocupadas.get(`${fmt(d)}|${h.hora}`) || 0;
        return { hora: h.hora, cupo, disponibles: Math.max(cupo - usadas, 0) };
      });
    if (slots.length) dias[fmt(d)] = slots;
  }
  return { cataId: id, mes, dias };
};

// ─── Disponibilidad para Menús Gastronómicos ─────────────────────────────────
const obtenerDisponibilidadMenuMes = async (menuId, mes) => {
  const id = parseInt(menuId, 10);
  const menu = await prisma.menuGastronomico.findUnique({
    where: { id },
    include: { horarios: { where: { activo: true } } },
  });
  if (!menu || !menu.activo) throw new ReservaError('Menú gastronómico no encontrado', 404);

  const [y, m] = mes.split('-').map(Number);
  const inicio = new Date(Date.UTC(y, m - 1, 1));
  const fin = new Date(Date.UTC(y, m, 0));
  const minima = fechaMinima();

  const [sesiones, vacaciones] = await Promise.all([
    prisma.sesionMenu.findMany({ where: { menuId: id, fecha: { gte: inicio, lte: fin } } }),
    obtenerDiasBloqueados(inicio, fin),
  ]);
  const ocupadas = new Map(sesiones.map((s) => [`${fmt(s.fecha)}|${s.hora}`, s.plazasReservadas]));

  const dias = {};
  for (let d = new Date(inicio); d <= fin; d.setUTCDate(d.getUTCDate() + 1)) {
    if (d < minima || estaBloqueada(d, vacaciones)) continue;
    const slots = menu.horarios
      .filter((h) => h.diaSemana === d.getUTCDay())
      .sort((a, b) => a.hora.localeCompare(b.hora))
      .map((h) => {
        const cupo = h.cupo ?? menu.cupoPorSesion;
        const usadas = ocupadas.get(`${fmt(d)}|${h.hora}`) || 0;
        return { hora: h.hora, cupo, disponibles: Math.max(cupo - usadas, 0) };
      });
    if (slots.length) dias[fmt(d)] = slots;
  }
  return { menuId: id, mes, dias };
};

const obtenerDisponibilidadMes = async (cataIdOrObj, mesParam) => {
  let cataId = null;
  let menuId = null;
  let mes = mesParam;

  if (typeof cataIdOrObj === 'object' && cataIdOrObj !== null) {
    cataId = cataIdOrObj.cataId;
    menuId = cataIdOrObj.menuId;
    mes = cataIdOrObj.mes;
  } else {
    cataId = cataIdOrObj;
  }

  if (!/^\d{4}-\d{2}$/.test(mes || '')) throw new ReservaError('Mes inválido (formato YYYY-MM)');
  if (menuId) return obtenerDisponibilidadMenuMes(menuId, mes);
  if (cataId) return obtenerDisponibilidadCataMes(cataId, mes);
  throw new ReservaError('Debes indicar cataId o menuId');
};

// ─── Resolver Slots y Tomar Plazas (Catas) ──────────────────────────────────
const resolverSlot = async (tx, cataId, fechaStr, hora) => {
  if (!HORA_RE.test(hora || '')) throw new ReservaError('Horario inválido');
  const fecha = parseFecha(fechaStr);
  if (fecha < fechaMinima()) throw new ReservaError('La fecha seleccionada ya no está disponible');

  const cata = await tx.cata.findUnique({ where: { id: cataId } });
  if (!cata || !cata.activo) throw new ReservaError('Experiencia no encontrada', 404);

  const horario = await tx.horarioCata.findFirst({
    where: { cataId, diaSemana: fecha.getUTCDay(), hora, activo: true },
  });
  if (!horario) throw new ReservaError('No hay sesión disponible en ese día y horario');

  const vacaciones = await obtenerDiasBloqueados(fecha, fecha);
  if (estaBloqueada(fecha, vacaciones)) throw new ReservaError('La bodega permanece cerrada en esa fecha');

  return { cata, fecha, cupo: horario.cupo ?? cata.cupoPorSesion };
};

const tomarPlazas = async (tx, cataId, fecha, hora, cupo, personas) => {
  await tx.$executeRaw`
    INSERT IGNORE INTO SesionCata (cataId, fecha, hora, plazasReservadas, createdAt)
    VALUES (${cataId}, ${fecha}, ${hora}, 0, NOW(3))`;
  const sesion = await tx.sesionCata.findUnique({ where: { cataId_fecha_hora: { cataId, fecha, hora } } });

  const afectadas = await tx.$executeRaw`
    UPDATE SesionCata
       SET plazasReservadas = plazasReservadas + ${personas}
     WHERE id = ${sesion.id}
       AND plazasReservadas + ${personas} <= ${cupo}`;
  if (afectadas === 0) {
    throw new ReservaError('No quedan plazas suficientes en esa sesión. Elige otro horario o menos personas.', 409);
  }
  return sesion.id;
};

const liberarPlazas = (tx, sesionId, personas) =>
  tx.$executeRaw`
    UPDATE SesionCata
       SET plazasReservadas = GREATEST(plazasReservadas - ${personas}, 0)
     WHERE id = ${sesionId}`;

// ─── Resolver Slots y Tomar Plazas (Menús) ───────────────────────────────────
const resolverSlotMenu = async (tx, menuId, fechaStr, hora) => {
  if (!HORA_RE.test(hora || '')) throw new ReservaError('Horario inválido');
  const fecha = parseFecha(fechaStr);
  if (fecha < fechaMinima()) throw new ReservaError('La fecha seleccionada ya no está disponible');

  const menu = await tx.menuGastronomico.findUnique({ where: { id: menuId } });
  if (!menu || !menu.activo) throw new ReservaError('Menú gastronómico no encontrado', 404);

  const horario = await tx.horarioMenu.findFirst({
    where: { menuId, diaSemana: fecha.getUTCDay(), hora, activo: true },
  });
  if (!horario) throw new ReservaError('No hay servicio de comida disponible en ese día y horario');

  const vacaciones = await obtenerDiasBloqueados(fecha, fecha);
  if (estaBloqueada(fecha, vacaciones)) throw new ReservaError('La bodega permanece cerrada en esa fecha');

  return { menu, fecha, cupo: horario.cupo ?? menu.cupoPorSesion };
};

const tomarPlazasMenu = async (tx, menuId, fecha, hora, cupo, personas) => {
  await tx.$executeRaw`
    INSERT IGNORE INTO SesionMenu (menuId, fecha, hora, plazasReservadas, createdAt)
    VALUES (${menuId}, ${fecha}, ${hora}, 0, NOW(3))`;
  const sesion = await tx.sesionMenu.findUnique({ where: { menuId_fecha_hora: { menuId, fecha, hora } } });

  const afectadas = await tx.$executeRaw`
    UPDATE SesionMenu
       SET plazasReservadas = plazasReservadas + ${personas}
     WHERE id = ${sesion.id}
       AND plazasReservadas + ${personas} <= ${cupo}`;
  if (afectadas === 0) {
    throw new ReservaError('No quedan plazas suficientes en esa sesión. Elige otro horario o menos personas.', 409);
  }
  return sesion.id;
};

const liberarPlazasMenu = (tx, sesionId, personas) =>
  tx.$executeRaw`
    UPDATE SesionMenu
       SET plazasReservadas = GREATEST(plazasReservadas - ${personas}, 0)
     WHERE id = ${sesionId}`;

// ─── Validación de entrada ──────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_RE = /^[0-9+() \-]{7,20}$/;

const validarDatosReserva = (b) => {
  const nombre = String(b.nombre || '').trim();
  const email = String(b.email || '').trim().toLowerCase();
  const telefono = String(b.telefono || '').trim();
  const personas = Number(b.personas);
  const cataId = b.cataId ? parseInt(b.cataId, 10) : null;
  const menuId = b.menuId ? parseInt(b.menuId, 10) : null;

  if (!cataId && !menuId) throw new ReservaError('Selecciona una experiencia o menú');
  if (nombre.length < 2 || nombre.length > 120) throw new ReservaError('Nombre inválido');
  if (!EMAIL_RE.test(email) || email.length > 190) throw new ReservaError('Email inválido');
  if (!TEL_RE.test(telefono)) throw new ReservaError('Teléfono inválido');
  if (!Number.isInteger(personas) || personas < 1 || personas > MAX_PERSONAS_POR_RESERVA) {
    throw new ReservaError(`El número de personas debe estar entre 1 y ${MAX_PERSONAS_POR_RESERVA}`);
  }
  return {
    cataId,
    menuId,
    nombre,
    email,
    telefono,
    personas,
    idioma: String(b.idioma || 'Español').slice(0, 60),
    comentarios: b.comentarios ? String(b.comentarios).slice(0, 1000) : null,
  };
};

// ─── Includes comunes ───────────────────────────────────────────────────────
const includeReserva = { sesion: { include: { cata: { select: { id: true, titulo: true, duracion: true, precio: true } } } } };
const includeReservaMenu = { sesion: { include: { menu: { select: { id: true, titulo: true, duracion: true, precio: true } } } } };

// ─── Casos de uso ───────────────────────────────────────────────────────────
const crearReserva = async (body) => {
  const datos = validarDatosReserva(body);

  if (datos.menuId) {
    const reserva = await prisma.$transaction(async (tx) => {
      const { menu, fecha, cupo } = await resolverSlotMenu(tx, datos.menuId, body.fecha, body.hora);
      const sesionId = await tomarPlazasMenu(tx, datos.menuId, fecha, body.hora, cupo, datos.personas);

      return tx.reservaMenu.create({
        data: {
          codigo: generarCodigo(),
          sesionId,
          nombre: datos.nombre,
          email: datos.email,
          telefono: datos.telefono,
          personas: datos.personas,
          idioma: datos.idioma,
          comentarios: datos.comentarios,
          precioTotal: 0,
          estadoPago: 'NO_REQUERIDO',
        },
        include: includeReservaMenu,
      });
    });

    enviarConfirmacionReserva(reserva);
    return reserva;
  }

  // Cata
  const reserva = await prisma.$transaction(async (tx) => {
    const { cata, fecha, cupo } = await resolverSlot(tx, datos.cataId, body.fecha, body.hora);
    const sesionId = await tomarPlazas(tx, datos.cataId, fecha, body.hora, cupo, datos.personas);

    return tx.reserva.create({
      data: {
        codigo: generarCodigo(),
        sesionId,
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono,
        personas: datos.personas,
        idioma: datos.idioma,
        comentarios: datos.comentarios,
        precioTotal: 0,
        estadoPago: 'NO_REQUERIDO',
      },
      include: includeReserva,
    });
  });

  enviarConfirmacionReserva(reserva);
  return reserva;
};

const listarReservas = async ({ estado, cataId, menuId, fecha, q } = {}) => {
  const parseWhere = (esMenu = false) => {
    const where = {};
    if (estado) where.estado = estado;
    if (fecha) where.sesion = { ...where.sesion, fecha: parseFecha(fecha) };
    if (!esMenu && cataId) where.sesion = { ...where.sesion, cataId: parseInt(cataId, 10) };
    if (esMenu && menuId) where.sesion = { ...where.sesion, menuId: parseInt(menuId, 10) };
    if (q) {
      where.OR = [
        { nombre: { contains: q } },
        { email: { contains: q } },
        { codigo: { contains: q } },
        { telefono: { contains: q } },
      ];
    }
    return where;
  };

  const queries = [];
  if (!menuId) {
    queries.push(
      prisma.reserva.findMany({
        where: parseWhere(false),
        include: includeReserva,
        take: 300,
      }).then((rows) => rows.map((r) => ({ ...r, tipo: 'cata' })))
    );
  }
  if (!cataId) {
    queries.push(
      prisma.reservaMenu.findMany({
        where: parseWhere(true),
        include: includeReservaMenu,
        take: 300,
      }).then((rows) => rows.map((r) => ({ ...r, tipo: 'menu' })))
    );
  }

  const resultados = await Promise.all(queries);
  const todas = resultados.flat();

  todas.sort((a, b) => {
    const fA = new Date(a.sesion.fecha).getTime();
    const fB = new Date(b.sesion.fecha).getTime();
    if (fB !== fA) return fB - fA;
    if (a.sesion.hora !== b.sesion.hora) return a.sesion.hora.localeCompare(b.sesion.hora);
    return b.id - a.id;
  });

  return todas.slice(0, 500);
};

const obtenerReserva = async (id) => {
  const numId = parseInt(id, 10);
  const rCata = await prisma.reserva.findUnique({ where: { id: numId }, include: includeReserva });
  if (rCata) return { ...rCata, tipo: 'cata' };

  const rMenu = await prisma.reservaMenu.findUnique({ where: { id: numId }, include: includeReservaMenu });
  if (rMenu) return { ...rMenu, tipo: 'menu' };

  throw new ReservaError('Reserva no encontrada', 404);
};

const cancelarReserva = async (id) => {
  const numId = parseInt(id, 10);

  // Comprobar si es reserva de Cata
  const existeCata = await prisma.reserva.findUnique({ where: { id: numId } });
  if (existeCata) {
    const reserva = await prisma.$transaction(async (tx) => {
      const actual = await tx.reserva.findUnique({ where: { id: numId } });
      if (actual.estado === 'CANCELADA') throw new ReservaError('La reserva ya está cancelada', 409);
      if (actual.estado === 'ASISTIO') throw new ReservaError('No se puede cancelar una reserva con asistencia registrada', 409);

      await liberarPlazas(tx, actual.sesionId, actual.personas);
      return tx.reserva.update({
        where: { id: actual.id },
        data: { estado: 'CANCELADA', canceladaAt: new Date() },
        include: includeReserva,
      });
    });
    enviarCancelacionReserva(reserva);
    return { ...reserva, tipo: 'cata' };
  }

  // Comprobar si es reserva de Menú
  const existeMenu = await prisma.reservaMenu.findUnique({ where: { id: numId } });
  if (existeMenu) {
    const reserva = await prisma.$transaction(async (tx) => {
      const actual = await tx.reservaMenu.findUnique({ where: { id: numId } });
      if (actual.estado === 'CANCELADA') throw new ReservaError('La reserva ya está cancelada', 409);
      if (actual.estado === 'ASISTIO') throw new ReservaError('No se puede cancelar una reserva con asistencia registrada', 409);

      await liberarPlazasMenu(tx, actual.sesionId, actual.personas);
      return tx.reservaMenu.update({
        where: { id: actual.id },
        data: { estado: 'CANCELADA', canceladaAt: new Date() },
        include: includeReservaMenu,
      });
    });
    enviarCancelacionReserva(reserva);
    return { ...reserva, tipo: 'menu' };
  }

  throw new ReservaError('Reserva no encontrada', 404);
};

const reprogramarReserva = async (id, { fecha, hora }) => {
  const numId = parseInt(id, 10);

  // Probar en Cata
  const existeCata = await prisma.reserva.findUnique({ where: { id: numId }, include: includeReserva });
  if (existeCata) {
    const resultado = await prisma.$transaction(async (tx) => {
      const actual = await tx.reserva.findUnique({ where: { id: numId }, include: includeReserva });
      if (actual.estado !== 'CONFIRMADA') throw new ReservaError('Solo se pueden reprogramar reservas confirmadas', 409);

      const cataId = actual.sesion.cataId;
      if (fecha === fmt(actual.sesion.fecha) && hora === actual.sesion.hora) {
        throw new ReservaError('La reserva ya está en esa sesión', 409);
      }

      const slot = await resolverSlot(tx, cataId, fecha, hora);
      const nuevaSesionId = await tomarPlazas(tx, cataId, slot.fecha, hora, slot.cupo, actual.personas);
      await liberarPlazas(tx, actual.sesionId, actual.personas);

      const nueva = await tx.reserva.update({
        where: { id: actual.id },
        data: { sesionId: nuevaSesionId },
        include: includeReserva,
      });
      return { nueva, anterior: actual.sesion };
    });
    enviarReprogramacionReserva(resultado.nueva, resultado.anterior);
    return { ...resultado.nueva, tipo: 'cata' };
  }

  // Probar en Menú
  const existeMenu = await prisma.reservaMenu.findUnique({ where: { id: numId }, include: includeReservaMenu });
  if (existeMenu) {
    const resultado = await prisma.$transaction(async (tx) => {
      const actual = await tx.reservaMenu.findUnique({ where: { id: numId }, include: includeReservaMenu });
      if (actual.estado !== 'CONFIRMADA') throw new ReservaError('Solo se pueden reprogramar reservas confirmadas', 409);

      const menuId = actual.sesion.menuId;
      if (fecha === fmt(actual.sesion.fecha) && hora === actual.sesion.hora) {
        throw new ReservaError('La reserva ya está en esa sesión', 409);
      }

      const slot = await resolverSlotMenu(tx, menuId, fecha, hora);
      const nuevaSesionId = await tomarPlazasMenu(tx, menuId, slot.fecha, hora, slot.cupo, actual.personas);
      await liberarPlazasMenu(tx, actual.sesionId, actual.personas);

      const nueva = await tx.reservaMenu.update({
        where: { id: actual.id },
        data: { sesionId: nuevaSesionId },
        include: includeReservaMenu,
      });
      return { nueva, anterior: actual.sesion };
    });
    enviarReprogramacionReserva(resultado.nueva, resultado.anterior);
    return { ...resultado.nueva, tipo: 'menu' };
  }

  throw new ReservaError('Reserva no encontrada', 404);
};

const registrarAsistencia = async (id, estado) => {
  if (!ESTADOS_ASISTENCIA.includes(estado)) throw new ReservaError('Estado de asistencia inválido');
  const numId = parseInt(id, 10);

  const existeCata = await prisma.reserva.findUnique({ where: { id: numId } });
  if (existeCata) {
    if (existeCata.estado === 'CANCELADA') throw new ReservaError('La reserva está cancelada', 409);
    const r = await prisma.reserva.update({ where: { id: numId }, data: { estado }, include: includeReserva });
    return { ...r, tipo: 'cata' };
  }

  const existeMenu = await prisma.reservaMenu.findUnique({ where: { id: numId } });
  if (existeMenu) {
    if (existeMenu.estado === 'CANCELADA') throw new ReservaError('La reserva está cancelada', 409);
    const r = await prisma.reservaMenu.update({ where: { id: numId }, data: { estado }, include: includeReservaMenu });
    return { ...r, tipo: 'menu' };
  }

  throw new ReservaError('Reserva no encontrada', 404);
};

// ─── Horarios y capacidad (admin) ───────────────────────────────────────────
const obtenerHorarios = (cataId) =>
  prisma.horarioCata.findMany({
    where: { cataId: parseInt(cataId, 10) },
    orderBy: [{ diaSemana: 'asc' }, { hora: 'asc' }],
  });

const reemplazarHorarios = async (cataId, horarios) => {
  const id = parseInt(cataId, 10);
  if (!Array.isArray(horarios)) throw new ReservaError('Formato de horarios inválido');

  const vistos = new Set();
  const limpios = horarios.map((h) => {
    const diaSemana = Number(h.diaSemana);
    const cupo = h.cupo === null || h.cupo === undefined || h.cupo === '' ? null : Number(h.cupo);
    if (!Number.isInteger(diaSemana) || diaSemana < 0 || diaSemana > 6) throw new ReservaError('Día de semana inválido');
    if (!HORA_RE.test(h.hora || '')) throw new ReservaError(`Hora inválida: ${h.hora}`);
    if (cupo !== null && (!Number.isInteger(cupo) || cupo < 1 || cupo > 500)) throw new ReservaError('Cupo inválido');
    const clave = `${diaSemana}|${h.hora}`;
    if (vistos.has(clave)) throw new ReservaError('Hay horarios duplicados');
    vistos.add(clave);
    return { cataId: id, diaSemana, hora: h.hora, cupo, activo: h.activo !== false };
  });

  await prisma.$transaction([
    prisma.horarioCata.deleteMany({ where: { cataId: id } }),
    prisma.horarioCata.createMany({ data: limpios }),
  ]);
  return obtenerHorarios(id);
};

const obtenerHorariosMenu = (menuId) =>
  prisma.horarioMenu.findMany({
    where: { menuId: parseInt(menuId, 10) },
    orderBy: [{ diaSemana: 'asc' }, { hora: 'asc' }],
  });

const reemplazarHorariosMenu = async (menuId, horarios) => {
  const id = parseInt(menuId, 10);
  if (!Array.isArray(horarios)) throw new ReservaError('Formato de horarios inválido');

  const vistos = new Set();
  const limpios = horarios.map((h) => {
    const diaSemana = Number(h.diaSemana);
    const cupo = h.cupo === null || h.cupo === undefined || h.cupo === '' ? null : Number(h.cupo);
    if (!Number.isInteger(diaSemana) || diaSemana < 0 || diaSemana > 6) throw new ReservaError('Día de semana inválido');
    if (!HORA_RE.test(h.hora || '')) throw new ReservaError(`Hora inválida: ${h.hora}`);
    if (cupo !== null && (!Number.isInteger(cupo) || cupo < 1 || cupo > 500)) throw new ReservaError('Cupo inválido');
    const clave = `${diaSemana}|${h.hora}`;
    if (vistos.has(clave)) throw new ReservaError('Hay horarios duplicados');
    vistos.add(clave);
    return { menuId: id, diaSemana, hora: h.hora, cupo, activo: h.activo !== false };
  });

  await prisma.$transaction([
    prisma.horarioMenu.deleteMany({ where: { menuId: id } }),
    prisma.horarioMenu.createMany({ data: limpios }),
  ]);
  return obtenerHorariosMenu(id);
};

module.exports = {
  ReservaError,
  MAX_PERSONAS_POR_RESERVA,
  obtenerDisponibilidadMes,
  obtenerDisponibilidadCataMes,
  obtenerDisponibilidadMenuMes,
  crearReserva,
  listarReservas,
  obtenerReserva,
  cancelarReserva,
  reprogramarReserva,
  registrarAsistencia,
  obtenerHorarios,
  reemplazarHorarios,
  obtenerHorariosMenu,
  reemplazarHorariosMenu,
};
