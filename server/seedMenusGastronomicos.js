const prisma = require('./services/prismaClient');

const seedMenus = async () => {
  const menusSeed = [
    {
      id: 1,
      titulo: 'Menú Mallorquín',
      precio: 65,
      descripcion: 'Selección de tapas tradicionales mallorquinas maridadas con 3 de nuestros vinos de autor. Una experiencia gastronómica íntima en nuestra terraza con vistas a la Sierra de Tramuntana.',
      diaSemana: 'Jueves a Domingo',
      horario: '13:30',
      duracion: '2 horas',
      duracionMin: 120,
      cupoPorSesion: 12,
      portada: '/images/catas-menus-experiencias/menu-mallorquin-526.webp',
      diasSemanaIndices: [4, 5, 6, 0], // Jueves (4), Viernes (5), Sábado (6), Domingo (0)
      horas: ['13:30'],
    },
    {
      id: 2,
      titulo: 'Menú Paella',
      precio: 75,
      descripcion: 'Auténtica paella ciega de marisco o mixta cocinada a la leña frente a los comensales. Incluye entrantes locales, postre casero y barra libre de vinos Santa Catarina durante la comida.',
      diaSemana: 'Viernes a Domingo',
      horario: '14:00',
      duracion: '2.5 horas',
      duracionMin: 150,
      cupoPorSesion: 16,
      portada: '/images/catas-menus-experiencias/menu-paella.webp',
      diasSemanaIndices: [5, 6, 0], // Viernes (5), Sábado (6), Domingo (0)
      horas: ['14:00'],
    },
    {
      id: 3,
      titulo: 'Menú Barbacoa',
      precio: 75,
      descripcion: 'Cortes selectos de carne a la brasa de sarmiento con guarniciones de la huerta, ensaladas mediterráneas y degustación de nuestros tintos de guarda. Ideal para grupos y celebraciones entre viñas.',
      diaSemana: 'Sábados y Domingos',
      horario: '14:00',
      duracion: '3 horas',
      duracionMin: 180,
      cupoPorSesion: 20,
      portada: '/images/catas-menus-experiencias/menu-barbacoa.webp',
      diasSemanaIndices: [6, 0], // Sábado (6), Domingo (0)
      horas: ['14:00'],
    },
  ];

  for (const m of menusSeed) {
    const { diasSemanaIndices, horas, ...data } = m;
    await prisma.menuGastronomico.upsert({
      where: { id: m.id },
      update: data,
      create: data,
    });

    await prisma.horarioMenu.deleteMany({ where: { menuId: m.id } });

    for (const dia of diasSemanaIndices) {
      for (const hora of horas) {
        await prisma.horarioMenu.create({
          data: {
            menuId: m.id,
            diaSemana: dia,
            hora,
            cupo: m.cupoPorSesion,
            activo: true,
          },
        });
      }
    }
  }

  console.log('Menús gastronómicos y horarios semanales inicializados con éxito.');
  await prisma.$disconnect();
};

seedMenus().catch((err) => {
  console.error('Error seeding menus:', err);
  process.exit(1);
});
