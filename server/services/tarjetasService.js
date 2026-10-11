const prisma = require('./prismaClient');

const obtenerTodasLasTarjetas = async () => {
  return prisma.tarjetaRegalo.findMany({
    orderBy: { precio: 'asc' },
  });
};

const obtenerTarjetaPorId = async (id) => {
  return prisma.tarjetaRegalo.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

const crearTarjeta = async (data) => {
  return prisma.tarjetaRegalo.create({
    data: {
      titulo: data.titulo,
      descripcion: data.descripcion || '',
      precio: parseFloat(data.precio) || 0,
      portada: data.portada || null,
      activo: data.activo !== undefined ? Boolean(data.activo) : true,
    },
  });
};

const editarTarjeta = async (id, data) => {
  return prisma.tarjetaRegalo.update({
    where: { id: parseInt(id, 10) },
    data: {
      titulo: data.titulo !== undefined ? data.titulo : undefined,
      descripcion: data.descripcion !== undefined ? data.descripcion : undefined,
      precio: data.precio !== undefined ? parseFloat(data.precio) : undefined,
      portada: data.portada !== undefined ? data.portada : undefined,
      activo: data.activo !== undefined ? Boolean(data.activo) : undefined,
    },
  });
};

const eliminarTarjeta = async (id) => {
  return prisma.tarjetaRegalo.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = {
  obtenerTodasLasTarjetas,
  obtenerTarjetaPorId,
  crearTarjeta,
  editarTarjeta,
  eliminarTarjeta,
};
