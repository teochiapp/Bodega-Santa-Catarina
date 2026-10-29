// Inicializa o sincroniza las 4 experiencias reales de Catas y Visitas junto con sus horarios semanales.
// Uso: node seedCatas.js
require('dotenv').config();
const prisma = require('./services/prismaClient');

const HORAS = ['10:00', '11:30', '13:00', '15:00'];
const DIAS = [1, 2, 3, 4, 5]; // Lunes a Viernes

const CATAS_SEED = [
  {
    id: 1,
    titulo: 'Cata de 3 vinos',
    subtitulo: null,
    precio: 20,
    portada: '/images/catas-menus-experiencias/cata-3-vinos.webp',
    descripcion:
      'Recorrido por la bodega y cata guiada de 3 de nuestros vinos más representativos en Son Aloy para descubrir la tradición y autenticidad de Santa Catarina.',
    diaSemana: 'Lunes a Viernes',
    horario: '10:00, 11:30, 13:00 y 15:00',
    duracion: '1h 30min',
    duracionMin: 90,
    cupoPorSesion: 10,
    activo: true,
  },
  {
    id: 2,
    titulo: 'Cata de 5 vinos',
    subtitulo: null,
    precio: 25,
    portada: '/images/catas-menus-experiencias/cata-5-vinos.webp',
    descripcion:
      'Una experiencia de degustación profunda con 5 vinos seleccionados de nuestras diferentes colecciones, profundizando en las variedades autóctonas y el terruño mallorquín.',
    diaSemana: 'Lunes a Viernes',
    horario: '10:00, 11:30, 13:00 y 15:00',
    duracion: '1h 30min',
    duracionMin: 90,
    cupoPorSesion: 10,
    activo: true,
  },
  {
    id: 3,
    titulo: 'Visita al viñedo',
    subtitulo: 'Bodega + cata de 3 vinos + pa amb oli mallorquín',
    precio: 40,
    portada: '/images/catas-menus-experiencias/experiencia-3-vinos.webp',
    descripcion:
      'Paseo guiado entre los viñedos de Son Aloy, visita completa a la bodega de elaboración y cata de 3 vinos maridados con un auténtico pa amb oli mallorquín tradicional.',
    diaSemana: 'Lunes a Viernes',
    horario: '10:00, 11:30, 13:00 y 15:00',
    duracion: '2 horas',
    duracionMin: 120,
    cupoPorSesion: 10,
    activo: true,
  },
  {
    id: 4,
    titulo: 'Visita al viñedo',
    subtitulo: 'Bodega + cata de 5 vinos + pa amb oli mallorquín',
    precio: 45,
    portada: '/images/catas-menus-experiencias/experiencia-5-vinos.webp',
    descripcion:
      'Nuestra vivencia enoturística más completa: paseo entre cepas, recorrido técnico por las instalaciones, cata de 5 vinos de autor y almuerzo con pa amb oli en la finca.',
    diaSemana: 'Lunes a Viernes',
    horario: '10:00, 11:30, 13:00 y 15:00',
    duracion: '2 horas 30 min',
    duracionMin: 150,
    cupoPorSesion: 10,
    activo: true,
  },
];

const seedCatas = async () => {
  for (const item of CATAS_SEED) {
    await prisma.cata.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });

    const countHorarios = await prisma.horarioCata.count({ where: { cataId: item.id } });
    if (countHorarios === 0) {
      await prisma.horarioCata.createMany({
        data: DIAS.flatMap((diaSemana) =>
          HORAS.map((hora) => ({
            cataId: item.id,
            diaSemana,
            hora,
            activo: true,
          }))
        ),
      });
    }
  }

  console.log('Catas y horarios sincronizados con éxito.');
  await prisma.$disconnect();
};

seedCatas().catch((err) => {
  console.error('Error al sincronizar catas:', err);
  process.exit(1);
});

