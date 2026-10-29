const prisma = require('./prismaClient');

const HEROES_INICIALES = [
  {
    seccion: 'inicio',
    ubicacion: 'Inicio · Portada Principal',
    ruta: '/',
    tag: 'TRADICIÓN QUE PERDURA',
    titulo: 'Bodega\nSanta Catarina',
    subtitulo: '40 años elaborando vinos únicos\nen el corazón de Mallorca.',
    descripcion: '40 años elaborando vinos únicos en el corazón de Mallorca.',
    imagen: '/assets/Santa_Catarina_Vendimia_296-BNFQEO6C.jpg',
    imagenAlt: 'Bodega Santa Catarina · Viñedos en Mallorca',
    posicion: 'center 55%',
    orden: 1,
    activo: 1,
  },
  {
    seccion: 'la-bodega',
    ubicacion: 'Elaboración · General',
    ruta: '/elaboracion',
    tag: 'SON ALOY · MALLORCA',
    titulo: 'La esencia de la tierra en cada botella',
    subtitulo: '',
    descripcion: '',
    imagen: '/images/heros/hero-neustra-historia.webp',
    imagenAlt: 'Finca Son Aloy, Bodega Santa Catarina',
    posicion: 'center 20%',
    orden: 2,
    activo: 1,
  },
  {
    seccion: 'bodega-historia',
    ubicacion: 'Elaboración · Nuestra Historia',
    ruta: '/elaboracion/historia',
    tag: 'SON ALOY · MALLORCA',
    titulo: 'La esencia de la tierra en cada botella',
    subtitulo: '',
    descripcion: '',
    imagen: '/images/heros/hero-neustra-historia.webp',
    imagenAlt: 'Historia de Bodega Santa Catarina',
    posicion: 'center 20%',
    orden: 3,
    activo: 1,
  },
  {
    seccion: 'bodega-vinedos',
    ubicacion: 'Elaboración · Viñedos',
    ruta: '/elaboracion/vinedos-elaboracion',
    tag: 'SON ALOY · MALLORCA',
    titulo: 'La esencia de la tierra en cada botella',
    subtitulo: '',
    descripcion: '',
    imagen: '/images/heros/hero-neustra-historia.webp',
    imagenAlt: 'Viñedos en Finca Son Aloy · Bodega Santa Catarina',
    posicion: 'center 20%',
    orden: 4,
    activo: 1,
  },
  {
    seccion: 'bodega-instalaciones',
    ubicacion: 'Elaboración · Elaboración en Bodega',
    ruta: '/elaboracion/bodega',
    tag: 'SON ALOY · MALLORCA',
    titulo: 'La esencia de la tierra en cada botella',
    subtitulo: '',
    descripcion: '',
    imagen: '/images/heros/hero-neustra-historia.webp',
    imagenAlt: 'Elaboración en Bodega Santa Catarina',
    posicion: 'center 20%',
    orden: 5,
    activo: 1,
  },
  {
    seccion: 'bodega-filosofia',
    ubicacion: 'Elaboración · Nuestra Filosofía',
    ruta: '/elaboracion/filosofia-valores',
    tag: 'SON ALOY · MALLORCA',
    titulo: 'La esencia de la tierra en cada botella',
    subtitulo: '',
    descripcion: '',
    imagen: '/images/heros/hero-neustra-historia.webp',
    imagenAlt: 'Filosofía de Bodega Santa Catarina',
    posicion: 'center 20%',
    orden: 6,
    activo: 1,
  },
  {
    seccion: 'bodega-sostenibilidad',
    ubicacion: 'Elaboración · Sostenibilidad',
    ruta: '/elaboracion/sostenibilidad',
    tag: 'SON ALOY · MALLORCA',
    titulo: 'La esencia de la tierra en cada botella',
    subtitulo: '',
    descripcion: '',
    imagen: '/images/heros/hero-neustra-historia.webp',
    imagenAlt: 'Sostenibilidad en Bodega Santa Catarina',
    posicion: 'center 20%',
    orden: 7,
    activo: 1,
  },
  {
    seccion: 'vinos-sta',
    ubicacion: 'Vinos · Colección STA',
    ruta: '/vinos/coleccion-sta',
    tag: 'NUESTRA COLECCIÓN · GAMA STA',
    titulo: 'Monovarietales\nAutóctonos',
    subtitulo: 'Manto Negro, Callet, Prensal Blanc y Giró Ros. La máxima pureza y nobleza de las variedades autóctonas de Mallorca cultivadas en Finca Son Aloy.',
    descripcion: 'Manto Negro, Callet, Prensal Blanc y Giró Ros. La máxima pureza y nobleza de las variedades autóctonas de Mallorca cultivadas en Finca Son Aloy.',
    imagen: '/images/heros/hero-vinos.webp',
    imagenAlt: 'Colección STA · Bodega Santa Catarina',
    posicion: 'center',
    orden: 8,
    activo: 1,
  },
  {
    seccion: 'vinos-surant',
    ubicacion: 'Vinos · Colección Surant',
    ruta: '/vinos/coleccion-surant',
    tag: 'NUESTRA COLECCIÓN · COLECCIÓN SURANT',
    titulo: 'Frescura y\nExpresión',
    subtitulo: 'Vinos frescos, aromáticos y seductores nacidos bajo el influjo del sol mediterráneo y la brisa de nuestras viñas.',
    descripcion: 'Vinos frescos, aromáticos y seductores nacidos bajo el influjo del sol mediterráneo y la brisa de nuestras viñas.',
    imagen: '/images/heros/hero-vinos.webp',
    imagenAlt: 'Colección Surant · Bodega Santa Catarina',
    posicion: 'center',
    orden: 9,
    activo: 1,
  },
  {
    seccion: 'vinos-nguany',
    ubicacion: 'Vinos · Colección ‘Nguany',
    ruta: '/vinos/coleccion-nguany',
    tag: 'NUESTRA COLECCIÓN · COLECCIÓN ‘NGUANY',
    titulo: 'Vinos de Finca\nSon Aloy',
    subtitulo: 'Ediciones limitadas de autor. Complejidad, estructura y el cuidado minucioso de cada añada bajo el clima único de Mallorca.',
    descripcion: 'Ediciones limitadas de autor. Complejidad, estructura y el cuidado minucioso de cada añada bajo el clima único de Mallorca.',
    imagen: '/images/heros/hero-vinos.webp',
    imagenAlt: 'Colección ‘Nguany · Bodega Santa Catarina',
    posicion: 'center',
    orden: 10,
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
    imagen: '/images/heros/hero-enoturismo.webp',
    imagenAlt: 'Catas y Visitas · Bodega Santa Catarina',
    posicion: 'center',
    orden: 11,
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
    imagen: '/images/heros/hero-enoturismo.webp',
    imagenAlt: 'Experiencias Gastronómicas · Bodega Santa Catarina',
    posicion: 'center',
    orden: 12,
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
    imagen: '/images/heros/hero-enoturismo.webp',
    imagenAlt: 'Regala tu Experiencia · Bodega Santa Catarina',
    posicion: 'center',
    orden: 13,
    activo: 1,
  },
  {
    seccion: 'eventos',
    ubicacion: 'Eventos y Bodas · Portada',
    ruta: '/eventos',
    tag: 'EVENTOS Y BODAS',
    titulo: 'El escenario perfecto',
    subtitulo: 'Momentos inolvidables en un entorno mágico en Bodega Santa Catarina.',
    descripcion: 'Momentos inolvidables en un entorno mágico en Bodega Santa Catarina.',
    imagen: '/images/heros/hero-eventos.webp',
    imagenAlt: 'Eventos y Bodas en Bodega Santa Catarina',
    posicion: 'center',
    orden: 14,
    activo: 1,
  },
  {
    seccion: 'eventos-espacios',
    ubicacion: 'Eventos · Nuestros Espacios',
    ruta: '/eventos/nuestros-espacios',
    tag: 'EVENTOS Y BODAS',
    titulo: 'Nuestros espacios',
    subtitulo: 'Espacios singulares entre viñedos e historia para eventos inolvidables en Mallorca.',
    descripcion: 'Espacios singulares entre viñedos e historia para eventos inolvidables en Mallorca.',
    imagen: '/images/heros/hero-eventos.webp',
    imagenAlt: 'Nuestros espacios · Bodega Santa Catarina',
    posicion: 'center',
    orden: 15,
    activo: 1,
  },
  {
    seccion: 'eventos-mice',
    ubicacion: 'Eventos · MICE y Corporativos',
    ruta: '/eventos/mice-y-eventos-corporativos',
    tag: 'MICE Y EVENTOS CORPORATIVOS',
    titulo: 'MICE y eventos corporativos',
    subtitulo: 'Reuniones, convenciones y eventos de empresa en un entorno inspirador rodeado de viñedos.',
    descripcion: 'Reuniones, convenciones y eventos de empresa en un entorno inspirador rodeado de viñedos.',
    imagen: '/images/heros/hero-eventos.webp',
    imagenAlt: 'MICE y eventos corporativos · Bodega Santa Catarina',
    posicion: 'center',
    orden: 16,
    activo: 1,
  },
  {
    seccion: 'eventos-celebraciones',
    ubicacion: 'Eventos · Celebraciones Privadas',
    ruta: '/eventos/celebraciones-privadas',
    tag: 'CELEBRACIONES PRIVADAS',
    titulo: 'Celebraciones privadas',
    subtitulo: 'Celebraciones personales en un entorno mallorquín lleno de historia y naturaleza.',
    descripcion: 'Celebraciones personales en un entorno mallorquín lleno de historia y naturaleza.',
    imagen: '/images/heros/hero-eventos.webp',
    imagenAlt: 'Celebraciones privadas · Bodega Santa Catarina',
    posicion: 'center',
    orden: 17,
    activo: 1,
  },
  {
    seccion: 'eventos-bodas',
    ubicacion: 'Eventos · Bodas',
    ruta: '/eventos/bodas',
    tag: 'BODAS',
    titulo: 'Bodas',
    subtitulo: 'Un escenario único entre historia, viñedos y naturaleza para celebrar vuestro gran día.',
    descripcion: 'Un escenario único entre historia, viñedos y naturaleza para celebrar vuestro gran día.',
    imagen: '/images/heros/hero-eventos.webp',
    imagenAlt: 'Bodas · Bodega Santa Catarina',
    posicion: 'center',
    orden: 18,
    activo: 1,
  },
  {
    seccion: 'donde-comprar',
    ubicacion: 'Dónde Comprar',
    ruta: '/donde-comprar',
    tag: 'MAPA DE DISTRIBUCIÓN',
    titulo: 'De Mallorca al mundo',
    subtitulo: 'Desde Mallorca llegamos a Alemania, Suiza, Italia, Canadá, Bélgica y la Península a través de distribuidores especializados que comparten nuestra pasión por el vino.',
    descripcion: 'Desde Mallorca llegamos a Alemania, Suiza, Italia, Canadá, Bélgica y la Península a través de distribuidores especializados que comparten nuestra pasión por el vino.',
    imagen: '/images/heros/hero-vinos.webp',
    imagenAlt: 'Dónde comprar · Bodega Santa Catarina',
    posicion: 'center',
    orden: 19,
    activo: 1,
  },
  {
    seccion: 'tienda-fisica',
    ubicacion: 'Tienda Física',
    ruta: '/tienda',
    tag: 'SON ALOY · SENCELLES',
    titulo: 'Tienda física',
    subtitulo: '',
    descripcion: 'Visita nuestro espacio de degustación y venta directa en Son Aloy.',
    imagen: '/images/heros/hero-tienda-fisica.webp',
    imagenAlt: 'Tienda Física · Bodega Santa Catarina',
    posicion: 'center 58%',
    orden: 20,
    activo: 1,
  },
  {
    seccion: 'blog',
    ubicacion: 'Blog & Novedades',
    ruta: '/blog',
    tag: 'HISTORIAS DE LA BODEGA',
    titulo: 'Blog',
    subtitulo: '',
    descripcion: 'Noticias, vendimias, cultura del vino y el día a día en Santa Catarina.',
    imagen: '/breadcrumbs/breadcrumb-blog.webp',
    imagenAlt: 'Blog Bodega Santa Catarina',
    posicion: 'center',
    orden: 21,
    activo: 1,
  },
  {
    seccion: 'contacto',
    ubicacion: 'Contacto',
    ruta: '/contacto',
    tag: '',
    titulo: 'CONTACTO',
    subtitulo: '',
    descripcion: 'Estamos a tu disposición para consultas, visitas privadas y reservas especiales.',
    imagen: '/assets/contacto-hero.jpg',
    imagenAlt: 'Contacto · Bodega Santa Catarina',
    posicion: 'center 40%',
    orden: 22,
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

let verificacionInicialCompleta = false;

/**
 * Inicializa los registros de hero faltantes sin sobrescribir personalizaciones existentes
 */
const verificarESembrarHeroes = async () => {
  if (verificacionInicialCompleta) return;
  try {
    const existentes = await prisma.$queryRaw`SELECT seccion FROM PageHero`;
    const seccionesExistentes = new Set(existentes.map((r) => String(r.seccion || '').toLowerCase()));

    let creados = 0;
    for (const h of HEROES_INICIALES) {
      if (!seccionesExistentes.has(h.seccion.toLowerCase())) {
        await prisma.$executeRaw`
          INSERT INTO PageHero (
            seccion, ubicacion, ruta, tag, titulo, subtitulo, descripcion, imagen, imagenAlt, posicion, orden, activo, createdAt, updatedAt
          ) VALUES (
            ${h.seccion}, ${h.ubicacion}, ${h.ruta}, ${h.tag}, ${h.titulo}, ${h.subtitulo}, ${h.descripcion}, ${h.imagen}, ${h.imagenAlt}, ${h.posicion}, ${h.orden}, ${h.activo}, NOW(), NOW()
          )
        `;
        creados += 1;
      }
    }
    if (creados > 0) {
      console.log(`--- ${creados} Heroes de Página sincronizados exitosamente ---`);
    }
    verificacionInicialCompleta = true;
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
