const tiendaGaleriaService = require('../services/tiendaGaleriaService');

const getImagenes = async (req, res) => {
  try {
    const soloActivas = req.query.soloActivas === 'true' || req.query.public === 'true';
    const imagenes = await tiendaGaleriaService.obtenerTodasLasImagenes(soloActivas);
    return res.json(imagenes);
  } catch (error) {
    console.error('Error al obtener imágenes de la galería:', error);
    return res.status(500).json({ error: 'Error al obtener imágenes de la galería' });
  }
};

const getImagenById = async (req, res) => {
  try {
    const imagen = await tiendaGaleriaService.obtenerImagenPorId(req.params.id);
    if (!imagen) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    return res.json(imagen);
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    return res.status(500).json({ error: 'Error al obtener la imagen' });
  }
};

const crearImagen = async (req, res) => {
  try {
    const { imagen, alt, orden, activo } = req.body;
    if (!imagen) {
      return res.status(400).json({ error: 'La URL o ruta de la imagen es requerida' });
    }

    const nuevaImagen = await tiendaGaleriaService.crearImagen({
      imagen,
      alt,
      orden: orden !== undefined ? orden : 0,
      activo: activo !== undefined ? activo : true,
    });

    return res.status(201).json(nuevaImagen);
  } catch (error) {
    console.error('Error al crear imagen en la galería:', error);
    return res.status(500).json({ error: 'Error al crear la imagen' });
  }
};

const editarImagen = async (req, res) => {
  try {
    const imagenActualizada = await tiendaGaleriaService.editarImagen(req.params.id, req.body);
    if (!imagenActualizada) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    return res.json(imagenActualizada);
  } catch (error) {
    console.error('Error al editar imagen en la galería:', error);
    return res.status(500).json({ error: 'Error al actualizar la imagen' });
  }
};

const eliminarImagen = async (req, res) => {
  try {
    const resultado = await tiendaGaleriaService.eliminarImagen(req.params.id);
    return res.json({ message: 'Imagen eliminada correctamente', ...resultado });
  } catch (error) {
    console.error('Error al eliminar imagen de la galería:', error);
    return res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
};

module.exports = {
  getImagenes,
  getImagenById,
  crearImagen,
  editarImagen,
  eliminarImagen,
};
