const prisma = require('./prismaClient');

const obtenerTodosLosPosts = async () => {
  return prisma.blog.findMany({
    orderBy: { fecha: 'desc' },
  });
};

const obtenerPostPorId = async (id) => {
  return prisma.blog.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

const crearPost = async (data) => {
  return prisma.blog.create({
    data: {
      titulo: data.titulo,
      fecha: data.fecha ? new Date(data.fecha) : new Date(),
      portada: data.portada || null,
      galeria: Array.isArray(data.galeria) ? data.galeria : (data.galeria ? [data.galeria] : []),
      descripcion: data.descripcion || '',
      enlace: data.enlace || null,
      activo: data.activo !== undefined ? Boolean(data.activo) : true,
    },
  });
};

const editarPost = async (id, data) => {
  return prisma.blog.update({
    where: { id: parseInt(id, 10) },
    data: {
      titulo: data.titulo !== undefined ? data.titulo : undefined,
      fecha: data.fecha !== undefined ? new Date(data.fecha) : undefined,
      portada: data.portada !== undefined ? data.portada : undefined,
      galeria: data.galeria !== undefined ? (Array.isArray(data.galeria) ? data.galeria : [data.galeria]) : undefined,
      descripcion: data.descripcion !== undefined ? data.descripcion : undefined,
      enlace: data.enlace !== undefined ? data.enlace : undefined,
      activo: data.activo !== undefined ? Boolean(data.activo) : undefined,
    },
  });
};

const eliminarPost = async (id) => {
  return prisma.blog.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = {
  obtenerTodosLosPosts,
  obtenerPostPorId,
  crearPost,
  editarPost,
  eliminarPost,
};
