const prisma = require('../services/prismaClient');

/**
 * Obtiene métricas 100% reales de la base de datos y estado de la bodega para el Dashboard.
 */
const getDashboardStats = async (req, res) => {
  try {
    const [
      vinosCount,
      catasCount,
      menusCount,
      eventosCount,
      blogCount,
      tarjetasCount,
      vacaciones,
      ultimosVinos,
      ultimosBlogs,
      ultimosEventos,
      config,
    ] = await Promise.all([
      prisma.vino.count(),
      prisma.cata.count(),
      prisma.menuGastronomico.count(),
      prisma.evento.count(),
      prisma.blog.count(),
      prisma.tarjetaRegalo.count(),
      prisma.diaVacacion.findMany({
        where: { activo: true },
        orderBy: { fechaInicio: 'asc' },
      }),
      prisma.vino.findMany({
        take: 6,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          titulo: true,
          variedad: true,
          coleccion: true,
          anio: true,
          tipo: true,
          activo: true,
        },
      }),
      prisma.blog.findMany({
        take: 5,
        orderBy: { fecha: 'desc' },
        select: {
          id: true,
          titulo: true,
          fecha: true,
          activo: true,
        },
      }),
      prisma.evento.findMany({
        take: 4,
        orderBy: { posicion: 'asc' },
        select: {
          id: true,
          titulo: true,
          subtitulo: true,
          posicion: true,
          activo: true,
        },
      }),
      prisma.configuracionGeneral.findUnique({
        where: { id: 1 },
      }),
    ]);

    // Verificar si hoy o próximamente hay vacaciones activas
    const ahora = new Date();
    const enVacaciones = vacaciones.some((v) => {
      const ini = new Date(v.fechaInicio);
      const fin = new Date(v.fechaFin);
      fin.setHours(23, 59, 59, 999);
      return ahora >= ini && ahora <= fin;
    });

    const proximaVacacion = vacaciones.find((v) => new Date(v.fechaFin) >= ahora) || null;

    res.json({
      totales: {
        vinos: vinosCount,
        catas: catasCount,
        menus: menusCount,
        eventos: eventosCount,
        blog: blogCount,
        tarjetas: tarjetasCount,
        diasVacaciones: vacaciones.length,
      },
      estadoBodega: {
        enVacaciones,
        proximaVacacion,
        totalDiasBloqueados: vacaciones.length,
      },
      banner: {
        activo: Boolean(config?.bannerActivo),
        texto: config?.bannerTexto || '',
        enlace: config?.bannerEnlace || '',
      },
      configuracion: {
        telefono: config?.telefono || '',
        whatsapp: config?.whatsapp || '',
        emailReservas: config?.emailReservas || '',
        emailContacto: config?.emailContacto || '',
        emailEventos: config?.emailEventos || '',
        direccion: config?.direccion || '',
      },
      ultimosVinos,
      ultimosBlogs,
      ultimosEventos,
      vacaciones,
    });
  } catch (error) {
    console.error('[dashboardController] Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener métricas del dashboard' });
  }
};

module.exports = { getDashboardStats };
