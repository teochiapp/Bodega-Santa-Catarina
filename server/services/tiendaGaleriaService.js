const prisma = require('./prismaClient');

const obtenerTodasLasImagenes = async (soloActivas = false) => {
  if (soloActivas) {
    return prisma.$queryRaw`
      SELECT id, imagen, alt, orden, activo, createdAt, updatedAt
      FROM TiendaImagen
      WHERE activo = 1
      ORDER BY orden ASC, id ASC
    `;
  }
  return prisma.$queryRaw`
    SELECT id, imagen, alt, orden, activo, createdAt, updatedAt
    FROM TiendaImagen
    ORDER BY orden ASC, id ASC
  `;
};

const obtenerImagenPorId = async (id) => {
  const numId = parseInt(id, 10);
  const rows = await prisma.$queryRaw`
    SELECT id, imagen, alt, orden, activo, createdAt, updatedAt
    FROM TiendaImagen
    WHERE id = ${numId}
    LIMIT 1
  `;
  return rows[0] || null;
};

const crearImagen = async (data) => {
  const imagen = data.imagen;
  const alt = data.alt || '';
  const orden = parseInt(data.orden, 10) || 0;
  const activo = data.activo !== undefined ? (data.activo ? 1 : 0) : 1;

  await prisma.$executeRaw`
    INSERT INTO TiendaImagen (imagen, alt, orden, activo, createdAt, updatedAt)
    VALUES (${imagen}, ${alt}, ${orden}, ${activo}, NOW(), NOW())
  `;

  const lastInserted = await prisma.$queryRaw`
    SELECT id, imagen, alt, orden, activo, createdAt, updatedAt
    FROM TiendaImagen
    ORDER BY id DESC
    LIMIT 1
  `;
  return lastInserted[0];
};

const editarImagen = async (id, data) => {
  const numId = parseInt(id, 10);
  const existing = await obtenerImagenPorId(numId);
  if (!existing) return null;

  const imagen = data.imagen !== undefined ? data.imagen : existing.imagen;
  const alt = data.alt !== undefined ? data.alt : existing.alt;
  const orden = data.orden !== undefined ? parseInt(data.orden, 10) : existing.orden;
  const activo = data.activo !== undefined ? (data.activo ? 1 : 0) : (existing.activo ? 1 : 0);

  await prisma.$executeRaw`
    UPDATE TiendaImagen
    SET imagen = ${imagen}, alt = ${alt}, orden = ${orden}, activo = ${activo}, updatedAt = NOW()
    WHERE id = ${numId}
  `;

  return obtenerImagenPorId(numId);
};

const eliminarImagen = async (id) => {
  const numId = parseInt(id, 10);
  await prisma.$executeRaw`
    DELETE FROM TiendaImagen
    WHERE id = ${numId}
  `;
  return { id: numId };
};

module.exports = {
  obtenerTodasLasImagenes,
  obtenerImagenPorId,
  crearImagen,
  editarImagen,
  eliminarImagen,
};
