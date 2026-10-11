const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Iniciando Seed de Bodega Santa Catarina ---');

  // 1. Configuración General
  await prisma.configuracionGeneral.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      telefono: '+34 971 87 20 18',
      whatsapp: '+34 620 12 34 56',
      emailContacto: 'info@bodegasantacatarina.com',
      emailReservas: 'reservas@bodegasantacatarina.com',
      emailEventos: 'eventos@bodegasantacatarina.com',
      direccion: 'Finca Son Aloy, Ma-3140, km 3, 07314 Sencelles, Illes Balears',
      googleMapsUrl: 'https://maps.google.com/?q=Bodega+Santa+Catarina+Sencelles',
      instagramUrl: 'https://instagram.com/bodegasantacatarina',
      facebookUrl: 'https://facebook.com/bodegasantacatarina',
      tripAdvisorUrl: 'https://tripadvisor.es/Restaurant_Review-Bodega_Santa_Catarina',
      bannerActivo: true,
      bannerTexto: '🍇 Ya disponible la nueva añada Gran Selección 2023 en nuestra bodega y tienda.',
      bannerEnlace: '/vinos',
    },
  });

  // 2. Días de Vacaciones (Calendario de catas)
  const vacCount = await prisma.diaVacacion.count();
  if (vacCount === 0) {
    await prisma.diaVacacion.createMany({
      data: [
        {
          fechaInicio: new Date('2026-12-24T00:00:00Z'),
          fechaFin: new Date('2027-01-02T23:59:59Z'),
          motivo: 'Cierre por fiestas navideñas y año nuevo',
          activo: true,
        },
        {
          fechaInicio: new Date('2026-08-15T00:00:00Z'),
          fechaFin: new Date('2026-08-18T23:59:59Z'),
          motivo: 'Cierre extraordinario por inicio de vendimia intensiva',
          activo: true,
        },
      ],
    });
  }

  // 3. Catas
  const catasCount = await prisma.cata.count();
  if (catasCount === 0) {
    await prisma.cata.createMany({
      data: [
        {
          titulo: 'Cata Descubrimiento Santa Catarina',
          precio: 25.0,
          descripcion: 'Recorrido por los viñedos de la finca, visita a la sala de barricas y degustación guiada de 3 vinos selectos acompañados de pamboli mallorquín tradicional.',
          diaSemana: 'Lunes a Sábado',
          horario: '11:30 y 16:30',
          duracion: '1 hora 15 min',
          portada: '/isologo.png',
          activo: true,
        },
        {
          titulo: 'Cata Premium Selección de Barrica',
          precio: 45.0,
          descripcion: 'Experiencia exclusiva para amantes del vino: cata técnica de 5 vinos de alta gama, incluyendo añadas históricas y maridaje con quesos artesanos de la isla.',
          diaSemana: 'Miércoles a Domingo',
          horario: '12:00',
          duracion: '2 horas',
          portada: '/isologo.png',
          activo: true,
        },
        {
          titulo: 'Paseo al Atardecer entre Viñedos',
          precio: 55.0,
          descripcion: 'Paseo guiado a la caída del sol con copa en mano por los bancales de Son Aloy, seguido de cata maridada bajo la pérgola centenaria.',
          diaSemana: 'Jueves a Sábado',
          horario: '18:30 (verano)',
          duracion: '2 horas 30 min',
          portada: '/isologo.png',
          activo: true,
        },
      ],
    });
  }

  // 4. Menús Gastronómicos
  const menusCount = await prisma.menuGastronomico.count();
  if (menusCount === 0) {
    await prisma.menuGastronomico.createMany({
      data: [
        {
          titulo: 'Menú Esencia Mediterránea',
          precio: 65.0,
          descripcion: 'Menú de 4 tiempos elaborado con productos ecológicos del huerto propio y cordero mallorquín confitado, maridado con 3 vinos de la bodega.',
          diaSemana: 'Jueves a Domingo',
          horario: '13:00 a 16:00',
          duracion: '2 horas',
          portada: '/isologo.png',
          activo: true,
        },
        {
          titulo: 'Menú Degustación Gran Reserva',
          precio: 85.0,
          descripcion: 'Menú maridaje de autor de 6 pasos diseñado para exaltar las complejidades de nuestras variedades autóctonas Prensal Blanc y Mantonegro.',
          diaSemana: 'Viernes y Sábado',
          horario: '13:30',
          duracion: '2 horas 30 min',
          portada: '/isologo.png',
          activo: true,
        },
      ],
    });
  }

  // 5. Eventos y Bodas
  const eventosCount = await prisma.evento.count();
  if (eventosCount === 0) {
    await prisma.evento.createMany({
      data: [
        {
          titulo: 'Bodas en el Viñedo',
          subtitulo: 'Un enlace de ensueño en el corazón de Mallorca',
          descripcion: 'Espacios exteriores entre bancales de viñas, patio empedrado tradicional y sala de tinajas con capacidad para hasta 200 invitados. Servicio de catering exclusivo y atardeceres mágicos.',
          posicion: 1,
          portada: '/isologo.png',
          activo: true,
        },
        {
          titulo: 'Eventos Corporativos y Presentaciones',
          subtitulo: 'Exclusividad y tranquilidad para su equipo',
          descripcion: 'Salas equipadas con luz natural, catas privadas para empresas, actividades de team building y cenas de gala en un entorno enológico inigualable.',
          posicion: 2,
          portada: '/isologo.png',
          activo: true,
        },
        {
          titulo: 'Celebraciones Privadas y Aniversarios',
          subtitulo: 'Momentos únicos junto a los tuyos',
          descripcion: 'Reserva exclusiva de nuestra terraza panorámica para almuerzos o cócteles privados con cocina mallorquina contemporánea.',
          posicion: 3,
          portada: '/isologo.png',
          activo: true,
        },
      ],
    });
  }

  // 6. Blog
  const blogCount = await prisma.blog.count();
  if (blogCount === 0) {
    await prisma.blog.createMany({
      data: [
        {
          titulo: 'La Vendimia 2024: Tradición y Respeto por la Tierra en Sencelles',
          fecha: new Date('2024-09-15'),
          portada: '/isologo.png',
          galeria: ['/isologo.png'],
          descripcion: '<p>Este año la cosecha ha destacado por una maduración pausada y equilibrada gracias a las suaves brisas nocturnas del Pla de Mallorca. Nuestros enólogos comparten las impresiones sobre lo que promete ser una añada memorable.</p>',
          enlace: '',
          activo: true,
        },
        {
          titulo: 'El Secreto del Suelo Calizo: Por qué Nuestros Vinos son Únicos',
          fecha: new Date('2024-06-20'),
          portada: '/isologo.png',
          galeria: ['/isologo.png'],
          descripcion: '<p>La riqueza mineral de Finca Son Aloy aporta una frescura y vivacidad inconfundibles. Conoce más sobre la composición geológica de nuestros bancales y su influencia en copa.</p>',
          enlace: '',
          activo: true,
        },
      ],
    });
  }

  // 7. Tarjetas de Regalo
  const tarjetasCount = await prisma.tarjetaRegalo.count();
  if (tarjetasCount === 0) {
    await prisma.tarjetaRegalo.createMany({
      data: [
        {
          titulo: 'Experiencia Cata para Dos',
          precio: 50.0,
          descripcion: 'Incluye recorrido guiado por la bodega y viñedos, cata de 3 vinos y maridaje de aperitivos típicos mallorquines para dos personas.',
          portada: '/isologo.png',
          activo: true,
        },
        {
          titulo: 'Tarjeta Regalo Menú & Maridaje',
          precio: 130.0,
          descripcion: 'Almuerzo completo de 4 tiempos para dos personas con maridaje de vinos de autor y obsequio de bienvenida.',
          portada: '/isologo.png',
          activo: true,
        },
        {
          titulo: 'Bono Regalo Tienda Bodega 100€',
          precio: 100.0,
          descripcion: 'Canjeable en nuestra tienda física o por pedido telefónico para cualquier vino de nuestras colecciones.',
          portada: '/isologo.png',
          activo: true,
        },
      ],
    });
  }

  // 8. Actualizar o crear Vinos con los nuevos campos
  const vinosCount = await prisma.vino.count();
  if (vinosCount <= 1) {
    await prisma.vino.createMany({
      data: [
        {
          titulo: 'Santa Catarina Gran Selección',
          coleccion: 'Colección Privada',
          anio: 2021,
          variedad: 'Mantonegro & Cabernet Sauvignon',
          tipo: 'Tinto Crianza',
          portada: '/isologo.png',
          categorias: ['Tintos', 'Crianza', 'Colección Privada'],
          notaCata: 'Color rubí profundo con reflejos teja. En nariz destacan notas de frutos negros maduros, monte bajo mallorquín y vainilla francesa. En boca es untuoso, con taninos aterciopelados y un final largo balsámico.',
          maridaje: 'Carnes rojas a la brasa, caza mayor y quesos curados de Mahón.',
          reconocimientos: '92 Puntos Guía Peñín 2023 | Medalla de Oro Mundus Vini',
          fichaTecnica: 'Graduación: 14.5% vol. Crianza: 14 meses en barrica de roble francés. Producción limitada a 4.200 botellas.',
          descripcion: 'El vino insignia de la bodega. Procedente de los bancales más antiguos de la finca.',
          activo: true,
        },
        {
          titulo: 'Son Aloy Blanc de Blancs',
          coleccion: 'Selección Mediterránea',
          anio: 2023,
          variedad: 'Prensal Blanc & Chardonnay',
          tipo: 'Blanco Joven',
          portada: '/isologo.png',
          categorias: ['Blancos', 'Jóvenes'],
          notaCata: 'Amarillo pajizo brillante con destellos verdosos. Aromas cítricos frescos, manzana verde y sutiles toques florales de almendro. Boca vivaz, fresca y sumamente mineral.',
          maridaje: 'Pescados blancos, mariscos mediterráneos, arroces marineros y ensaladas frescas.',
          reconocimientos: '90 Puntos James Suckling',
          fichaTecnica: 'Graduación: 12.5% vol. Fermentación en tanques de acero inox a temperatura controlada.',
          descripcion: 'Tributo a la frescura mediterránea con la variedad autóctona Prensal Blanc como protagonista.',
          activo: true,
        },
        {
          titulo: 'Rosat de Son Aloy',
          coleccion: 'Selección Mediterránea',
          anio: 2023,
          variedad: 'Callet & Syrah',
          tipo: 'Rosado',
          portada: '/isologo.png',
          categorias: ['Rosados', 'Jóvenes'],
          notaCata: 'Color rosa pálido estilo provenzal. Delicada nariz de grosellas rojas, fresitas silvestres y flores blancas. Boca refrescante, ágil y de agradable acidez.',
          maridaje: 'Tapas, cocina asiática, sushi y aperitivos.',
          reconocimientos: 'Medalla de Plata Concours Mondial de Bruxelles',
          fichaTecnica: 'Graduación: 12.5% vol. Maceración pelicular de 4 horas antes del prensado.',
          descripcion: 'Un rosado elegante y cosmopolita con todo el carácter de las variedades mediterráneas.',
          activo: true,
        },
      ],
    });
  }

  console.log('--- Seed completado con éxito ---');
}

main()
  .catch((e) => {
    console.error('Error durante seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
