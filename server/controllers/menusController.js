const {
  obtenerTodosLosMenus,
  obtenerMenuPorId,
  crearMenu: crearMenuService,
  editarMenu: editarMenuService,
  eliminarMenu: eliminarMenuService,
} = require('../services/menusService');

const getMenus = async (req, res) => {
  try {
    const menus = await obtenerTodosLosMenus();
    res.json(menus);
  } catch (err) {
    console.error('[menusController] Error al obtener menús:', err.message);
    res.status(500).json({ error: 'Error interno al obtener los menús' });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await obtenerMenuPorId(req.params.id);
    if (!menu) return res.status(404).json({ error: 'Menú no encontrado' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el menú' });
  }
};

const crearMenu = async (req, res) => {
  try {
    const { titulo, precio, descripcion } = req.body;
    if (!titulo || precio === undefined) {
      return res.status(400).json({ error: 'Título y precio son requeridos' });
    }
    const nuevo = await crearMenuService(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('[menusController] Error al crear menú:', err.message);
    res.status(500).json({ error: 'Error interno al crear el menú' });
  }
};

const editarMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await editarMenuService(id, req.body);
    res.json(actualizado);
  } catch (err) {
    console.error('[menusController] Error al editar menú:', err.message);
    res.status(500).json({ error: 'Error interno al editar el menú' });
  }
};

const eliminarMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarMenuService(id);
    res.status(204).send();
  } catch (err) {
    console.error('[menusController] Error al eliminar menú:', err.message);
    res.status(500).json({ error: 'Error interno al eliminar el menú' });
  }
};

module.exports = {
  getMenus,
  getMenuById,
  crearMenu,
  editarMenu,
  eliminarMenu,
};
