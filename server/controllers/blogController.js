const {
  obtenerTodosLosPosts,
  obtenerPostPorId,
  crearPost: crearPostService,
  editarPost: editarPostService,
  eliminarPost: eliminarPostService,
} = require('../services/blogService');

const getPosts = async (req, res) => {
  try {
    const posts = await obtenerTodosLosPosts();
    res.json(posts);
  } catch (err) {
    console.error('[blogController] Error al obtener posts:', err.message);
    res.status(500).json({ error: 'Error interno al obtener los posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await obtenerPostPorId(req.params.id);
    if (!post) return res.status(404).json({ error: 'Artículo no encontrado' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el artículo' });
  }
};

const crearPost = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ error: 'Título y contenido son requeridos' });
    }
    const nuevo = await crearPostService(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('[blogController] Error al crear post:', err.message);
    res.status(500).json({ error: 'Error interno al crear el artículo' });
  }
};

const editarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await editarPostService(id, req.body);
    res.json(actualizado);
  } catch (err) {
    console.error('[blogController] Error al editar post:', err.message);
    res.status(500).json({ error: 'Error interno al editar el artículo' });
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarPostService(id);
    res.status(204).send();
  } catch (err) {
    console.error('[blogController] Error al eliminar post:', err.message);
    res.status(500).json({ error: 'Error interno al eliminar el artículo' });
  }
};

module.exports = {
  getPosts,
  getPostById,
  crearPost,
  editarPost,
  eliminarPost,
};
