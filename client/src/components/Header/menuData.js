export const MENU_ITEMS = [
  {
    name: 'INICIO',
    path: '/',
    exact: true,
  },
  {
    name: 'ELABORACIÓN',
    path: '/elaboracion',
    submenu: [
      { name: 'Nuestra historia', path: '/elaboracion/historia' },
      { name: 'Viñedos', path: '/elaboracion/vinedos-elaboracion' },
      { name: 'Elaboración', path: '/elaboracion/bodega' },
      { name: 'Nuestra filosofía', path: '/elaboracion/filosofia-valores' },
      { name: 'Sostenibilidad', path: '/elaboracion/sostenibilidad' },
    ],
  },
  {
    name: 'VINOS',
    path: '/vinos',
    submenu: [
      { name: 'Colección STA', path: '/vinos/coleccion-sta' },
      { name: 'Colección Surant', path: '/vinos/coleccion-surant' },
      { name: 'Colección ‘Nguany', path: '/vinos/coleccion-nguany' },
    ],
  },
  {
    name: 'ENOTURISMO',
    path: '/enoturismo',
    submenu: [
      { name: 'Cata y visitas', path: '/enoturismo/catas-y-visitas' },
      { name: 'Experiencias gastronómicas', path: '/enoturismo/experiencias-gastronomicas' },
      { name: 'Regala tu experiencia', path: '/enoturismo/regala-tu-experiencia' },
    ],
  },
  {
    name: 'EVENTOS Y BODAS',
    path: '/eventos',
    submenu: [
      { name: 'Nuestros Espacios', path: '/eventos/nuestros-espacios' },
      { name: 'MICE y eventos corporativos', path: '/eventos/mice-y-eventos-corporativos' },
      { name: 'Celebraciones privadas', path: '/eventos/celebraciones-privadas' },
      { name: 'Bodas', path: '/eventos/bodas' },
    ],
  },
  {
    name: 'DÓNDE COMPRAR',
    path: '/donde-comprar',
  },
  {
    name: 'TIENDA FÍSICA',
    path: '/tienda',
  },
  {
    name: 'BLOG',
    path: '/blog',
  },
  {
    name: 'CONTACTO',
    path: '/contacto',
  },
];
