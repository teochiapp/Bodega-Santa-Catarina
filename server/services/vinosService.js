const prisma = require('./prismaClient');

/**
 * Retorna todos los vinos de la base de datos, ordenados por año descendente.
 * @returns {Promise<Vino[]>}
 */
const obtenerTodosLosVinos = async () => {
  return prisma.vino.findMany({
    orderBy: { anio: 'desc' },
  });
};

/**
 * Crea un nuevo vino en la base de datos.
 * @param {object} data Datos del vino
 * @returns {Promise<Vino>}
 */
const crearVino = async (data) => {
  return prisma.vino.create({
    data: {
      coleccion: data.coleccion,
      anio: parseInt(data.anio, 10),
      variedad: data.variedad,
      tipo: data.tipo,
      descripcion: data.descripcion,
    },
  });
};

/**
 * Edita un vino existente.
 * @param {number} id 
 * @param {object} data 
 * @returns {Promise<Vino>}
 */
const editarVino = async (id, data) => {
  return prisma.vino.update({
    where: { id: parseInt(id, 10) },
    data: {
      coleccion: data.coleccion,
      anio: parseInt(data.anio, 10),
      variedad: data.variedad,
      tipo: data.tipo,
      descripcion: data.descripcion,
    },
  });
};

/**
 * Elimina un vino.
 * @param {number} id 
 * @returns {Promise<Vino>}
 */
const eliminarVino = async (id) => {
  return prisma.vino.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = { obtenerTodosLosVinos, crearVino, editarVino, eliminarVino };
