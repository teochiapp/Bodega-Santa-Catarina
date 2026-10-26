const heroesService = require('../services/heroesService');

const getHeroes = async (req, res) => {
  try {
    const soloActivos = req.query.soloActivos === 'true' || req.query.public === 'true';
    const heroes = await heroesService.obtenerTodosLosHeroes(soloActivos);
    return res.json(heroes);
  } catch (error) {
    console.error('Error al obtener los heroes de páginas:', error);
    return res.status(500).json({ error: 'Error al obtener los heroes de páginas' });
  }
};

const getHeroById = async (req, res) => {
  try {
    const hero = await heroesService.obtenerHeroPorId(req.params.id);
    if (!hero) {
      return res.status(404).json({ error: 'Hero de página no encontrado' });
    }
    return res.json(hero);
  } catch (error) {
    console.error('Error al obtener el hero:', error);
    return res.status(500).json({ error: 'Error al obtener el hero de página' });
  }
};

const getHeroBySeccion = async (req, res) => {
  try {
    const { seccion } = req.params;
    const hero = await heroesService.obtenerHeroPorSeccion(seccion);
    if (!hero) {
      return res.status(404).json({ error: 'Hero para la sección indicada no encontrado' });
    }
    return res.json(hero);
  } catch (error) {
    console.error('Error al obtener hero por sección:', error);
    return res.status(500).json({ error: 'Error al obtener hero por sección' });
  }
};

const crearHero = async (req, res) => {
  try {
    const { seccion, titulo } = req.body;
    if (!seccion || !titulo) {
      return res.status(400).json({ error: 'La clave de sección y el título son obligatorios' });
    }

    const nuevoHero = await heroesService.crearHero(req.body);
    return res.status(201).json(nuevoHero);
  } catch (error) {
    console.error('Error al crear hero de página:', error);
    return res.status(500).json({ error: 'Error al crear hero de página' });
  }
};

const editarHero = async (req, res) => {
  try {
    const heroActualizado = await heroesService.editarHero(req.params.id, req.body);
    if (!heroActualizado) {
      return res.status(404).json({ error: 'Hero de página no encontrado' });
    }
    return res.json(heroActualizado);
  } catch (error) {
    console.error('Error al editar hero de página:', error);
    return res.status(500).json({ error: 'Error al actualizar hero de página' });
  }
};

const eliminarHero = async (req, res) => {
  try {
    const resultado = await heroesService.eliminarHero(req.params.id);
    return res.json({ message: 'Hero eliminado correctamente', ...resultado });
  } catch (error) {
    console.error('Error al eliminar hero de página:', error);
    return res.status(500).json({ error: 'Error al eliminar hero de página' });
  }
};

const resetearHeroes = async (req, res) => {
  try {
    const heroes = await heroesService.resetearAValoresIniciales();
    return res.json({ message: 'Valores iniciales restaurados correctamente', data: heroes });
  } catch (error) {
    console.error('Error al restablecer heroes iniciales:', error);
    return res.status(500).json({ error: 'Error al restablecer valores iniciales' });
  }
};

module.exports = {
  getHeroes,
  getHeroById,
  getHeroBySeccion,
  crearHero,
  editarHero,
  eliminarHero,
  resetearHeroes,
};
