const prisma = require('./prismaClient');

// Convierte a entero dentro de [min, max]; devuelve null si no es válido o está vacío.
const entero = (valor, min, max) => {
  const n = parseInt(valor, 10);
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
};

const obtenerTodasLasCatas = async () => {
  return prisma.cata.findMany({
    include: { horarios: { where: { activo: true }, orderBy: [{ diaSemana: 'asc' }, { hora: 'asc' }] } },
    orderBy: { id: 'asc' },
  });
};

const obtenerCataPorId = async (id) => {
  return prisma.cata.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

const crearCata = async (data) => {
  return prisma.cata.create({
    data: {
      titulo: data.titulo,
      precio: parseFloat(data.precio) || 0,
      descripcion: data.descripcion || '',
      portada: data.portada || null,
      diaSemana: data.diaSemana || null,
      horario: data.horario || null,
      duracion: data.duracion || null,
      duracionMin: entero(data.duracionMin, 1, 1440) ?? 90,
      cupoPorSesion: entero(data.cupoPorSesion, 1, 500) ?? 10,
      activo: data.activo !== undefined ? Boolean(data.activo) : true,
    },
  });
};

const editarCata = async (id, data) => {
  return prisma.cata.update({
    where: { id: parseInt(id, 10) },
    data: {
      titulo: data.titulo !== undefined ? data.titulo : undefined,
      precio: data.precio !== undefined ? parseFloat(data.precio) : undefined,
      descripcion: data.descripcion !== undefined ? data.descripcion : undefined,
      portada: data.portada !== undefined ? data.portada : undefined,
      diaSemana: data.diaSemana !== undefined ? data.diaSemana : undefined,
      horario: data.horario !== undefined ? data.horario : undefined,
      duracion: data.duracion !== undefined ? data.duracion : undefined,
      duracionMin: entero(data.duracionMin, 1, 1440) ?? undefined,
      cupoPorSesion: entero(data.cupoPorSesion, 1, 500) ?? undefined,
      activo: data.activo !== undefined ? Boolean(data.activo) : undefined,
    },
  });
};

const eliminarCata = async (id) => {
  const cataId = parseInt(id, 10);
  const reservas = await prisma.reserva.count({ where: { sesion: { cataId } } });
  if (reservas > 0) {
    const err = new Error('Esta experiencia tiene reservas asociadas. Desactívala en lugar de eliminarla.');
    err.status = 409;
    throw err;
  }
  return prisma.cata.delete({
    where: { id: cataId },
  });
};

module.exports = {
  obtenerTodasLasCatas,
  obtenerCataPorId,
  crearCata,
  editarCata,
  eliminarCata,
};
