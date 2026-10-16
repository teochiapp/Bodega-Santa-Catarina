const prisma = require('./prismaClient');

/**
 * Retorna todos los vinos de la base de datos, ordenados por orden ascendente, año o creación.
 */
const obtenerTodosLosVinos = async () => {
  return prisma.vino.findMany({
    orderBy: [{ orden: 'asc' }, { anio: 'desc' }, { id: 'asc' }],
  });
};

/**
 * Obtiene un vino por ID.
 */
const obtenerVinoPorId = async (id) => {
  return prisma.vino.findUnique({
    where: { id: parseInt(id, 10) },
  });
};

/**
 * Crea un nuevo vino en la base de datos.
 */
const crearVino = async (data) => {
  return prisma.vino.create({
    data: {
      titulo: data.titulo || (data.variedad ? `${data.variedad} ${data.anio || ''}`.trim() : 'Sin título'),
      coleccion: data.coleccion || '',
      anio: data.anio ? parseInt(data.anio, 10) : null,
      variedad: data.variedad || '',
      tipo: data.tipo || '',
      portada: data.portada || null,
      categorias: Array.isArray(data.categorias) ? data.categorias : (data.categorias ? [data.categorias] : []),
      notaCata: data.notaCata || null,
      maridaje: data.maridaje || null,
      reconocimientos: data.reconocimientos || null,
      fichaTecnica: data.fichaTecnica || null,
      descripcion: data.descripcion || '',
      orden: data.orden !== undefined ? (parseInt(data.orden, 10) || 0) : 0,
      activo: data.activo !== undefined ? Boolean(data.activo) : true,
    },
  });
};

/**
 * Edita un vino existente.
 */
const editarVino = async (id, data) => {
  return prisma.vino.update({
    where: { id: parseInt(id, 10) },
    data: {
      titulo: data.titulo !== undefined ? data.titulo : undefined,
      coleccion: data.coleccion !== undefined ? data.coleccion : undefined,
      anio: data.anio !== undefined ? (data.anio ? parseInt(data.anio, 10) : null) : undefined,
      variedad: data.variedad !== undefined ? data.variedad : undefined,
      tipo: data.tipo !== undefined ? data.tipo : undefined,
      portada: data.portada !== undefined ? data.portada : undefined,
      categorias: data.categorias !== undefined ? (Array.isArray(data.categorias) ? data.categorias : [data.categorias]) : undefined,
      notaCata: data.notaCata !== undefined ? data.notaCata : undefined,
      maridaje: data.maridaje !== undefined ? data.maridaje : undefined,
      reconocimientos: data.reconocimientos !== undefined ? data.reconocimientos : undefined,
      fichaTecnica: data.fichaTecnica !== undefined ? data.fichaTecnica : undefined,
      descripcion: data.descripcion !== undefined ? data.descripcion : undefined,
      orden: data.orden !== undefined ? (parseInt(data.orden, 10) || 0) : undefined,
      activo: data.activo !== undefined ? Boolean(data.activo) : undefined,
    },
  });
};

/**
 * Elimina un vino.
 */
const eliminarVino = async (id) => {
  return prisma.vino.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = { obtenerTodosLosVinos, obtenerVinoPorId, crearVino, editarVino, eliminarVino };
