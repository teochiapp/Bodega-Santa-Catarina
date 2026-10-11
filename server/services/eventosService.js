const prisma = require('./prismaClient');

const obtenerTodosLosEventos = async () => {
  return prisma.evento.findMany({
    orderBy: [{ posicion: 'asc' }, { id: 'desc' }],
  });
};

const obtenerEventoPorId = async (id) => {
  return prisma.evento.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

const crearEvento = async (data) => {
  return prisma.evento.create({
    data: {
      titulo: data.titulo,
      subtitulo: data.subtitulo || null,
      descripcion: data.descripcion || '',
      portada: data.portada || null,
      posicion: data.posicion !== undefined ? parseInt(data.posicion, 10) : 0,
      activo: data.activo !== undefined ? Boolean(data.activo) : true,
    },
  });
};

const editarEvento = async (id, data) => {
  return prisma.evento.update({
    where: { id: parseInt(id, 10) },
    data: {
      titulo: data.titulo !== undefined ? data.titulo : undefined,
      subtitulo: data.subtitulo !== undefined ? data.subtitulo : undefined,
      descripcion: data.descripcion !== undefined ? data.descripcion : undefined,
      portada: data.portada !== undefined ? data.portada : undefined,
      posicion: data.posicion !== undefined ? parseInt(data.posicion, 10) : undefined,
      activo: data.activo !== undefined ? Boolean(data.activo) : undefined,
    },
  });
};

const eliminarEvento = async (id) => {
  return prisma.evento.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = {
  obtenerTodosLosEventos,
  obtenerEventoPorId,
  crearEvento,
  editarEvento,
  eliminarEvento,
};
