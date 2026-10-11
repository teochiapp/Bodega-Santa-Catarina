const prisma = require('./prismaClient');

const obtenerTodosLosMenus = async () => {
  return prisma.menuGastronomico.findMany({
    orderBy: { id: 'asc' },
  });
};

const obtenerMenuPorId = async (id) => {
  return prisma.menuGastronomico.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

const crearMenu = async (data) => {
  return prisma.menuGastronomico.create({
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

const editarMenu = async (id, data) => {
  return prisma.menuGastronomico.update({
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

const eliminarMenu = async (id) => {
  return prisma.menuGastronomico.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = {
  obtenerTodosLosMenus,
  obtenerMenuPorId,
  crearMenu,
  editarMenu,
  eliminarMenu,
};
