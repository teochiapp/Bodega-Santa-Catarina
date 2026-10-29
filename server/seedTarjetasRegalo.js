const prisma = require('./services/prismaClient');

const seedTarjetas = async () => {
  const tarjetas = [
    {
      id: 1,
      titulo: 'Bono regalo 1',
      precio: 150,
      portada: '/images/catas-menus-experiencias/experiencia-3-vinos.webp',
      descripcion: 'Incluye recorrido guiado por la bodega y viñedos, cata de 3 vinos y maridaje de aperitivos típicos mallorquines para dos personas.',
      activo: true,
    },
    {
      id: 2,
      titulo: 'Bono regalo 2',
      precio: 250,
      portada: '/images/catas-menus-experiencias/cata-5-vinos.webp',
      descripcion: 'Experiencia enológica y gastronómica completa para dos personas: visita a viñedos, cata de autor y almuerzo maridado en nuestra terraza con vistas a la Sierra de Tramuntana.',
      activo: true,
    },
    {
      id: 3,
      titulo: 'Bono personalizado',
      precio: 0,
      portada: '/images/catas-menus-experiencias/experiencia-5-vinos.webp',
      descripcion: 'Diseña una experiencia a tu medida: catas privadas, almuerzos entre viñas, celebraciones especiales o regalos corporativos. Solicita presupuesto sin compromiso.',
      activo: true,
    },
  ];

  for (const t of tarjetas) {
    await prisma.tarjetaRegalo.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    });
  }

  console.log('Tarjetas regalo actualizadas con éxito.');
  await prisma.$disconnect();
};

seedTarjetas().catch((e) => {
  console.error(e);
  process.exit(1);
});
