const prisma = require('./prismaClient');

const HEROES_INICIALES = [
  {
    seccion: 'la-bodega',
    ubicacion: 'La Bodega (Principal / General)',
    ruta: '/la-bodega',
    tag: 'BODEGA SANTA CATARINA',
    titulo: 'El nacimiento de una bodega',
    subtitulo: 'Historia, tradición y pasión por la viticultura mallorquina en Son Aloy.',
    descripcion: '',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Bodega Santa Catarina · Finca Son Aloy',
    posicion: 'center',
    orden: 1,
    activo: 1,
  },
  {
    seccion: 'bodega-historia',
    ubicacion: 'La Bodega · Historia',
    ruta: '/la-bodega/historia',
    tag: 'NUESTRA HISTORIA',
    titulo: 'El nacimiento de una bodega',
    subtitulo: 'De un proyecto pionero a una nueva identidad profundamente mallorquina.',
    descripcion: '',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Historia de Bodega Santa Catarina',
    posicion: 'center',
    orden: 2,
    activo: 1,
  },
  {
    seccion: 'bodega-instalaciones',
    ubicacion: 'La Bodega · Instalaciones',
    ruta: '/la-bodega/la-bodega',
    tag: 'SON ALOY · SENCELLES',
    titulo: 'El nacimiento de una bodega',
    subtitulo: 'Espacios diseñados para la elaboración cuidadosa y la recepción de visitantes.',
    descripcion: '',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Instalaciones de Bodega Santa Catarina',
    posicion: 'center',
    orden: 3,
    activo: 1,
  },
  {
    seccion: 'bodega-vinedos',
    ubicacion: 'La Bodega · Viñedos y Elaboración',
    ruta: '/la-bodega/vinedos-y-elaboracion',
    tag: 'LA FINCA SON ALOY',
    titulo: 'El nacimiento de una bodega',
    subtitulo: 'Suelos arcillo-calcáreos, altitud y clima mediterráneo en el corazón de Mallorca.',
    descripcion: '',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Viñedos y Elaboración en Bodega Santa Catarina',
    posicion: 'center',
    orden: 4,
    activo: 1,
  },
  {
    seccion: 'bodega-filosofia',
    ubicacion: 'La Bodega · Nuestra Filosofía',
    ruta: '/la-bodega/filosofia',
    tag: 'NUESTRA ESENCIA',
    titulo: 'El nacimiento de una bodega',
    subtitulo: 'Una forma de vivir Mallorca, honrando la tierra y el legado familiar.',
    descripcion: '',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Filosofía Bodega Santa Catarina',
    posicion: 'center',
    orden: 5,
    activo: 1,
  },
  {
    seccion: 'bodega-sostenibilidad',
    ubicacion: 'La Bodega · Sostenibilidad',
    ruta: '/la-bodega/sostenibilidad',
    tag: 'COMPROMISO AMBIENTAL',
    titulo: 'El nacimiento de una bodega',
    subtitulo: 'Prácticas sostenibles, respeto por el ecosistema y viticultura regenerativa.',
    descripcion: '',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Sostenibilidad en Bodega Santa Catarina',
    posicion: 'center',
    orden: 6,
    activo: 1,
  },
  {
    seccion: 'vinos-sta',
    ubicacion: 'Vinos · Colección STA',
    ruta: '/vinos/coleccion-sta',
    tag: 'NUESTRA COLECCIÓN · GAMA STA',
    titulo: 'Monovarietales Autóctonos',
    subtitulo: 'Manto Negro, Callet, Prensal Blanc y Giró Ros. La máxima pureza y nobleza de las variedades autóctonas de Mallorca cultivadas en Finca Son Aloy.',
    descripcion: 'Manto Negro, Callet, Prensal Blanc y Giró Ros. La máxima pureza y nobleza de las variedades autóctonas de Mallorca cultivadas en Finca Son Aloy.',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Colección STA · Bodega Santa Catarina',
    posicion: 'center',
    orden: 7,
    activo: 1,
  },
  {
    seccion: 'vinos-surant',
    ubicacion: 'Vinos · Colección Surant',
    ruta: '/vinos/coleccion-surant',
    tag: 'NUESTRA COLECCIÓN · COLECCIÓN SURANT',
    titulo: 'Frescura y Expresión',
    subtitulo: 'Vinos frescos, aromáticos y seductores nacidos bajo el influjo del sol mediterráneo y la brisa de nuestras viñas.',
    descripcion: 'Vinos frescos, aromáticos y seductores nacidos bajo el influjo del sol mediterráneo y la brisa de nuestras viñas.',
    imagen: '/assets/Santa_Catarina_353-4.jpg',
    imagenAlt: 'Colección Surant · Bodega Santa Catarina',
    posicion: 'center',
    orden: 8,
    activo: 1,
  },
  {
    seccion: 'vinos-nguany',
    ubicacion: 'Vinos · Colección ‘Nguany',
    ruta: '/vinos/coleccion-nguany',
    tag: 'NUESTRA COLECCIÓN · COLECCIÓN ‘NGUANY',
    titulo: 'Vinos de Finca Son Aloy',
    subtitulo: 'Ediciones limitadas de autor. Complejidad, estructura y el cuidado minucioso de cada añada bajo el clima único de Mallorca.',
    descripcion: 'Ediciones limitadas de autor. Complejidad, estructura y el cuidado minucioso de cada añada bajo el clima único de Mallorca.',
    imagen: '/assets/Santa_Catarina_Vendimia_284.jpg',
    imagenAlt: 'Colección ‘Nguany · Bodega Santa Catarina',
    posicion: 'center',
    orden: 9,
    activo: 1,
  },
  {
    seccion: 'enoturismo-catas',
    ubicacion: 'Enoturismo · Catas y Visitas',
    ruta: '/enoturismo/catas-y-visitas',
    tag: 'VIVE EL VIÑEDO',
    titulo: 'Vive el viñedo',
    subtitulo: 'Catas y visitas guiadas en Bodega Santa Catarina',
    descripcion: 'Catas y visitas guiadas en Bodega Santa Catarina',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Catas y Visitas · Bodega Santa Catarina',
    posicion: 'center',
    orden: 10,
    activo: 1,
  },
  {
    seccion: 'enoturismo-gastronomia',
    ubicacion: 'Enoturismo · Experiencias Gastronómicas',
    ruta: '/enoturismo/experiencias-gastronomicas',
    tag: 'VIVE EL VIÑEDO',
    titulo: 'Vive el viñedo',
    subtitulo: 'Experiencias gastronómicas entre viñas en Mallorca',
    descripcion: 'Experiencias gastronómicas entre viñas en Mallorca',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Experiencias Gastronómicas · Bodega Santa Catarina',
    posicion: 'center',
    orden: 11,
    activo: 1,
  },
  {
    seccion: 'enoturismo-regalo',
    ubicacion: 'Enoturismo · Regala tu Experiencia',
    ruta: '/enoturismo/regala-tu-experiencia',
    tag: 'VIVE EL VIÑEDO',
    titulo: 'Vive el viñedo',
    subtitulo: 'Regala momentos inolvidables en Bodega Santa Catarina',
    descripcion: 'Regala momentos inolvidables en Bodega Santa Catarina',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Regala tu Experiencia · Bodega Santa Catarina',
    posicion: 'center',
    orden: 12,
    activo: 1,
  },
  {
    seccion: 'eventos',
    ubicacion: 'Eventos y Bodas',
    ruta: '/eventos',
    tag: 'EVENTOS Y BODAS',
    titulo: 'El escenario perfecto',
    subtitulo: 'Momentos inolvidables en un entorno mágico. Bodas, aniversarios, eventos corporativos y celebraciones privadas bajo el cielo de Mallorca.',
    descripcion: 'Momentos inolvidables en un entorno mágico. Bodas, aniversarios, eventos corporativos y celebraciones privadas bajo el cielo de Mallorca.',
    imagen: '/assets/Santa_Cararina_217-1-BZzqf_YD.jpg',
    imagenAlt: 'Eventos y Bodas en Bodega Santa Catarina',
    posicion: 'center',
    orden: 13,
    activo: 1,
  },
  {
    seccion: 'tienda-fisica',
    ubicacion: 'Tienda Física',
    ruta: '/tienda-fisica',
    tag: 'SON ALOY · SENCELLES',
    titulo: 'Tienda física',
    subtitulo: 'Visita nuestro espacio de degustación y venta directa en Son Aloy.',
    descripcion: 'Visita nuestro espacio de degustación y venta directa en Son Aloy.',
    imagen: '/assets/tienda-fisica-01.jpg',
    imagenAlt: 'Tienda Física · Bodega Santa Catarina',
    posicion: 'center 58%',
    orden: 14,
    activo: 1,
  },
  {
    seccion: 'blog',
    ubicacion: 'Blog & Novedades',
    ruta: '/blog',
    tag: 'HISTORIAS DE LA BODEGA',
    titulo: 'Blog',
    subtitulo: 'Noticias, vendimias, cultura del vino y el día a día en Santa Catarina.',
    descripcion: 'Noticias, vendimias, cultura del vino y el día a día en Santa Catarina.',
    imagen: '/breadcrumbs/breadcrumb-blog.webp',
    imagenAlt: 'Blog Bodega Santa Catarina',
    posicion: 'center',
    orden: 15,
    activo: 1,
  },
  {
    seccion: 'contacto',
    ubicacion: 'Contacto',
    ruta: '/contacto',
    tag: 'ATENCIÓN Y VISITAS',
    titulo: 'Contacto',
    subtitulo: 'Estamos a tu disposición para consultas, visitas privadas y reservas especiales.',
    descripcion: 'Estamos a tu disposición para consultas, visitas privadas y reservas especiales.',
    imagen: '/assets/Santa_Catarina_372.jpg',
    imagenAlt: 'Contacto · Bodega Santa Catarina',
    posicion: 'center',
    orden: 16,
    activo: 1,
  },
];

/**
 * Normaliza un objeto retornado de la base de datos (booleano para activo)
 */
const formatHero = (h) => {
  if (!h) return null;
  return {
    ...h,
    activo: Boolean(h.activo),
  };
};

/**
 * Inicializa los registros de hero si la tabla está vacía
 */
const verificarESembrarHeroes = async () => {
  try {
    const counts = await prisma.$queryRaw`SELECT COUNT(*) as total FROM PageHero`;
    const total = Number(counts[0]?.total || 0);
    if (total === 0) {
      console.log('--- Sembrando Heroes Iniciales de Página ---');
      for (const h of HEROES_INICIALES) {
        await prisma.$executeRaw`
          INSERT INTO PageHero (
            seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
          ) VALUES (
            ${h.seccion}, ${h.ubicacion}, ${h.ruta}, ${h.tag}, ${h.titulo}, ${h.subtitulo}, ${h.descripcion}, ${h.imagen}, ${h.imagenAlt}, ${h.posicion}, ${h.orden}, ${h.activo}, NOW(), NOW()
          )
        `;
      }
      console.log(`--- ${HEROES_INICIALES.length} Heroes de Página creados exitosamente ---`);
    }
  } catch (err) {
    console.error('Error al verificar o sembrar Heroes:', err);
  }
};

// Se ejecuta en carga para garantizar que los datos existan desde el inicio
verificarESembrarHeroes();

/**
 * Obtener todos los heroes
 */
const obtenerTodosLosHeroes = async (soloActivos = false) => {
  await verificarESembrarHeroes();
  let rows;
  if (soloActivos) {
    rows = await prisma.$queryRaw`
      SELECT id, seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
      FROM PageHero
      WHERE activo = 1
      ORDER BY orden ASC, id ASC
    `;
  } else {
    rows = await prisma.$queryRaw`
      SELECT id, seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
      FROM PageHero
      ORDER BY orden ASC, id ASC
    `;
  }
  return rows.map(formatHero);
};

/**
 * Obtener hero por ID
 */
const obtenerHeroPorId = async (id) => {
  const numId = parseInt(id, 10);
  const rows = await prisma.$queryRaw`
    SELECT id, seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
    FROM PageHero
    WHERE id = ${numId}
    LIMIT 1
  `;
  return formatHero(rows[0]);
};

/**
 * Obtener hero por identificador de sección o por ruta
 */
const obtenerHeroPorSeccion = async (seccionORuta) => {
  await verificarESembrarHeroes();
  if (!seccionORuta) return null;
  const termino = String(seccionORuta).trim().toLowerCase();
  
  const rows = await prisma.$queryRaw`
    SELECT id, seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
    FROM PageHero
    WHERE LOWER(seccion) = ${termino} OR LOWER(ruta) = ${termino}
    LIMIT 1
  `;
  return formatHero(rows[0]);
};

/**
 * Crear un nuevo hero
 */
const crearHero = async (data) => {
  const seccion = (data.seccion || '').trim().toLowerCase();
  const ubicacion = data.ubicacion || seccion;
  const ruta = data.ruta || '';
  const tag = data.tag || '';
  const titulo = data.titulo || '';
  const subtitulo = data.subtitulo || '';
  const descripcion = data.descripcion || '';
  const imagen = data.imagen || '';
  const imagenAlt = data.imagenAlt || '';
  const posicion = data.posicion || 'center';
  const orden = parseInt(data.orden, 10) || 0;
  const activo = data.activo !== undefined ? (data.activo ? 1 : 0) : 1;

  await prisma.$executeRaw`
    INSERT INTO PageHero (
      seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
    ) VALUES (
      ${seccion}, ${ubicacion}, ${ruta}, ${tag}, ${titulo}, ${subtitulo}, ${descripcion}, ${imagen}, ${imagenAlt}, ${posicion}, ${orden}, ${activo}, NOW(), NOW()
    )
  `;

  const rows = await prisma.$queryRaw`
    SELECT id, seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
    FROM PageHero
    WHERE seccion = ${seccion}
    ORDER BY id DESC
    LIMIT 1
  `;
  return formatHero(rows[0]);
};

/**
 * Editar hero existente
 */
const editarHero = async (id, data) => {
  const numId = parseInt(id, 10);
  const existing = await obtenerHeroPorId(numId);
  if (!existing) return null;

  const seccion = data.seccion !== undefined ? data.seccion.trim().toLowerCase() : existing.seccion;
  const ubicacion = data.ubicacion !== undefined ? data.ubicacion : existing.ubicacion;
  const ruta = data.ruta !== undefined ? data.ruta : existing.ruta;
  const tag = data.tag !== undefined ? data.tag : existing.tag;
  const titulo = data.titulo !== undefined ? data.titulo : existing.titulo;
  const subtitulo = data.subtitulo !== undefined ? data.subtitulo : existing.subtitulo;
  const descripcion = data.descripcion !== undefined ? data.descripcion : existing.descripcion;
  const imagen = data.imagen !== undefined ? data.imagen : existing.imagen;
  const imagenAlt = data.imagenAlt !== undefined ? data.imagenAlt : existing.imagenAlt;
  const posicion = data.posicion !== undefined ? data.posicion : existing.posicion;
  const orden = data.orden !== undefined ? parseInt(data.orden, 10) : existing.orden;
  const activo = data.activo !== undefined ? (data.activo ? 1 : 0) : (existing.activo ? 1 : 0);

  await prisma.$executeRaw`
    UPDATE PageHero
    SET
      seccion = ${seccion},
      ubicacion = ${ubicacion},
      ruta = ${ruta},
      tag = ${tag},
      titulo = ${titulo},
      subtitulo = ${subtitulo},
      descripcion = ${descripcion},
      imagen = ${imagen},
      imagenAlt = ${imagenAlt},
      posicion = ${posicion},
      orden = ${orden},
      activo = ${activo},
      updatedAt = NOW()
    WHERE id = ${numId}
  `;

  return obtenerHeroPorId(numId);
};

/**
 * Eliminar hero
 */
const eliminarHero = async (id) => {
  const numId = parseInt(id, 10);
  await prisma.$executeRaw`
    DELETE FROM PageHero WHERE id = ${numId}
  `;
  return { id: numId };
};

/**
 * Restablecer valores iniciales (útil para el admin si quiere restaurar defaults)
 */
const resetearAValoresIniciales = async () => {
  for (const h of HEROES_INICIALES) {
    const existing = await prisma.$queryRaw`
      SELECT id FROM PageHero WHERE seccion = ${h.seccion} LIMIT 1
    `;
    if (existing.length > 0) {
      await prisma.$executeRaw`
        UPDATE PageHero
        SET
          ubicacion = ${h.ubicacion},
          ruta = ${h.ruta},
          tag = ${h.tag},
          titulo = ${h.titulo},
          subtitulo = ${h.subtitulo},
          descripcion = ${h.descripcion},
          imagen = ${h.imagen},
          imagenAlt = ${h.imagenAlt},
          posicion = ${h.posicion},
          orden = ${h.orden},
          activo = ${h.activo},
          updatedAt = NOW()
        WHERE id = ${existing[0].id}
      `;
    } else {
      await prisma.$executeRaw`
        INSERT INTO PageHero (
          seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
        ) VALUES (
          ${h.seccion}, ${h.ubicacion}, ${h.ruta}, ${h.tag}, ${h.titulo}, ${h.subtitulo}, ${h.descripcion}, ${h.imagen}, ${h.imagenAlt}, ${h.posicion}, ${h.orden}, ${h.activo}, NOW(), NOW()
        )
      `;
    }
  }
  return obtenerTodosLosHeroes(false);
};

module.exports = {
  obtenerTodosLosHeroes,
  obtenerHeroPorId,
  obtenerHeroPorSeccion,
  crearHero,
  editarHero,
  eliminarHero,
  resetearAValoresIniciales,
  HEROES_INICIALES,
};
