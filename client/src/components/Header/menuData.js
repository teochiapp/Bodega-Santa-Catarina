export const MENU_ITEMS = [
  {
    name: 'INICIO',
    path: '/',
    exact: true,
  },
  {
    name: 'LA BODEGA',
    path: '/la-bodega',
    submenu: [
      { name: 'Nuestra Historia', path: '/la-bodega/historia' },
      { name: 'La bodega', path: '/la-bodega/la-bodega' },
      { name: 'Viñedos y elaboración', path: '/la-bodega/vinedos-y-elaboracion' },
      { name: 'Nuestra filosofía', path: '/la-bodega/filosofia' },
      { name: 'Sostenibilidad', path: '/la-bodega/sostenibilidad' },
    ],
  },
  {
    name: 'VINOS',
    path: '/vinos',
    submenu: [
      { name: 'Colección STA', path: '/vinos#coleccion-sta' },
      { name: 'Colección Surant', path: '/vinos#coleccion-surant' },
      { name: 'Colección ‘Nguany', path: '/vinos#coleccion-nguany' },
    ],
  },
  {
    name: 'ENOTURISMO',
    path: '/enoturismo',
    submenu: [
      { name: 'Cata y visitas', path: '/enoturismo#catas-y-visitas' },
      { name: 'Experiencias gastronómicas', path: '/enoturismo#experiencias-gastronomicas' },
      { name: 'Regala tu experiencia', path: '/enoturismo#regala-tu-experiencia' },
    ],
  },
  {
    name: 'EVENTOS Y BODAS',
    path: '/eventos',
    submenu: [
      { name: 'Casa Son Aloy', path: '/eventos/casa-son-aloy' },
      { name: 'Sala de Barricas', path: '/eventos/sala-de-barricas' },
      { name: 'Terrazas', path: '/eventos/terrazas' },
      { name: 'Zona Gravilla y Ajardinada', path: '/eventos/zona-gravilla' },
      { name: 'Porche Delantero y Caseta con Porche', path: '/eventos/porche-delantero' },
      { name: 'Sala Polivalente', path: '/eventos/sala-polivalente' },
      { name: 'La Clastra', path: '/eventos/la-clastra' },
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
