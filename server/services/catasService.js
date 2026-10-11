const prisma = require('./prismaClient');

const obtenerTodasLasCatas = async () => {
  return prisma.cata.findMany({
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
      activo: data.activo !== undefined ? Boolean(data.activo) : undefined,
    },
  });
};

const eliminarCata = async (id) => {
  return prisma.cata.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = {
  obtenerTodasLasCatas,
  obtenerCataPorId,
  crearCata,
  editarCata,
  eliminarCata,
};
