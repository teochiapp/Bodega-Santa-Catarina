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

  // 3. Catas (experiencias actuales reales de la web)
  const catasCount = await prisma.cata.count();
  if (catasCount === 0) {
    const catasIniciales = [
      {
        titulo: 'Cata de 3 vinos',
        subtitulo: null,
        precio: 20.0,
        descripcion: 'Recorrido por la bodega y cata guiada de 3 de nuestros vinos más representativos en Son Aloy para descubrir la tradición y autenticidad de Santa Catarina.',
        diaSemana: 'Lunes a Viernes',
        horario: '10:00, 11:30, 13:00 y 15:00',
        duracion: '1h 30min',
        duracionMin: 90,
        cupoPorSesion: 10,
        portada: '/images/catas-menus-experiencias/cata-3-vinos.webp',
        activo: true,
      },
      {
        titulo: 'Cata de 5 vinos',
        subtitulo: null,
        precio: 25.0,
        descripcion: 'Una experiencia de degustación profunda con 5 vinos seleccionados de nuestras diferentes colecciones, profundizando en las variedades autóctonas y el terruño mallorquín.',
        diaSemana: 'Lunes a Viernes',
        horario: '10:00, 11:30, 13:00 y 15:00',
        duracion: '1h 30min',
        duracionMin: 90,
        cupoPorSesion: 10,
        portada: '/images/catas-menus-experiencias/cata-5-vinos.webp',
        activo: true,
      },
      {
        titulo: 'Visita al viñedo',
        subtitulo: 'Bodega + cata de 3 vinos + pa amb oli mallorquín',
        precio: 40.0,
        descripcion: 'Paseo guiado entre los viñedos de Son Aloy, visita completa a la bodega de elaboración y cata de 3 vinos maridados con un auténtico pa amb oli mallorquín tradicional.',
        diaSemana: 'Lunes a Viernes',
        horario: '10:00, 11:30, 13:00 y 15:00',
        duracion: '2 horas',
        duracionMin: 120,
        cupoPorSesion: 10,
        portada: '/images/catas-menus-experiencias/experiencia-3-vinos.webp',
        activo: true,
      },
      {
        titulo: 'Visita al viñedo',
        subtitulo: 'Bodega + cata de 5 vinos + pa amb oli mallorquín',
        precio: 45.0,
        descripcion: 'Nuestra vivencia enoturística más completa: paseo entre cepas, recorrido técnico por las instalaciones, cata de 5 vinos de autor y almuerzo con pa amb oli en la finca.',
        diaSemana: 'Lunes a Viernes',
        horario: '10:00, 11:30, 13:00 y 15:00',
        duracion: '2 horas 30 min',
        duracionMin: 150,
        cupoPorSesion: 10,
        portada: '/images/catas-menus-experiencias/experiencia-5-vinos.webp',
        activo: true,
      },
    ];

    for (const item of catasIniciales) {
      const creada = await prisma.cata.create({ data: item });
      await prisma.horarioCata.createMany({
        data: [1, 2, 3, 4, 5].flatMap((diaSemana) =>
          ['10:00', '11:30', '13:00', '15:00'].map((hora) => ({
            cataId: creada.id,
            diaSemana,
            hora,
            activo: true,
          }))
        ),
      });
    }
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
          titulo: 'Vendimia 2024: la cosecha del renacimiento',
          fecha: new Date('2024-10-15'),
          portada: '/src/imports/Santa_Catarina_Vendimia_284.jpg',
          galeria: ['/src/imports/Santa_Catarina_Vendimia_284.jpg'],
          descripcion: 'La cosecha de 2024 marca un antes y un después en Bodega Santa Catarina. Temperaturas ideales, maduración perfecta y un Manto Negro que promete ser histórico. Los viñedos de Son Aloy ofrecieron este año su mejor expresión en cuatro décadas de historia.\n\nEl otoño llegó tarde a Sencelles este año, pero llegó bien. Tras un verano de calor moderado y noches frescas que preservaron la acidez, la vendimia arrancó a mediados de septiembre con las variedades blancas. El Prensal y el Chardonnay dieron uvas de piel gruesa, aroma intenso y un perfecto equilibrio azúcar-acidez.\n\nLas tintas, en cambio, esperaron hasta octubre. El Manto Negro y el Callet, las dos variedades autóctonas que dan carácter a la Colección Sta, alcanzaron una madurez fenólica excepcional. "Llevamos años esperando una cosecha así", reconoce Marta Alcover, nuestra enóloga jefa. "El frío de las noches de septiembre fue el factor clave."\n\nEn bodega, la decisión fue trabajar con levaduras autóctonas y reducir la intervención al mínimo. El objetivo: que el vino cuente la historia de este año sin filtros. Los primeros análisis son prometedores: el 2024 será, sin duda, una de las mejores añadas en la historia de Santa Catarina.',
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
