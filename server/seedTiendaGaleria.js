const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEFAULT_IMAGES = [
  {
    imagen: '/assets/tienda-fisica-01.jpg',
    alt: 'Mostrador y selección de vinos de la tienda física',
    orden: 1,
  },
  {
    imagen: '/assets/tienda-fisica-02.jpg',
    alt: 'Productos artesanales mallorquines',
    orden: 2,
  },
  {
    imagen: '/assets/tienda-fisica-03.jpg',
    alt: 'Expositor de productos locales y capazos',
    orden: 3,
  },
  {
    imagen: '/assets/tienda-fisica-04.jpg',
    alt: 'Selección de vinos',
    orden: 4,
  },
  {
    imagen: '/assets/tienda-fisica-05.jpg',
    alt: 'Capazo artesanal Santa Catarina',
    orden: 5,
  },
  {
    imagen: '/assets/tienda-fisica-06.jpg',
    alt: 'Productos gourmet',
    orden: 6,
  },
  {
    imagen: '/assets/tienda-fisica-07.jpg',
    alt: 'Interior de la tienda física',
    orden: 7,
  },
];

async function seedTiendaGaleria() {
  try {
    const existing = await prisma.$queryRaw`SELECT COUNT(*) as count FROM TiendaImagen`;
    const count = Number(existing[0]?.count || 0);

    if (count === 0) {
      console.log('Insertando imágenes de prueba en TiendaImagen...');
      for (const img of DEFAULT_IMAGES) {
        await prisma.$executeRaw`
          INSERT INTO TiendaImagen (imagen, alt, orden, activo, createdAt, updatedAt)
          VALUES (${img.imagen}, ${img.alt}, ${img.orden}, 1, NOW(), NOW())
        `;
      }
      console.log(`Se insertaron ${DEFAULT_IMAGES.length} imágenes de prueba.`);
    } else {
      console.log(`Ya existen ${count} imágenes en TiendaImagen.`);
    }
  } catch (err) {
    console.error('Error insertando imágenes de prueba:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seedTiendaGaleria();
