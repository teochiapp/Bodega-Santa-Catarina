const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CATALOG_DATA = [
  // 1. Gama sta
  {
    titulo: 'Manto Negro',
    coleccion: 'Gama sta',
    variedad: '100% Manto Negro',
    tipo: 'TINTO',
    anio: 2023,
    portada: '/assets/VINOS-02.png',
    categorias: ['Gama sta', 'MONOVARIETALES AUTÓCTONOS', 'TINTO'],
    notaCata: 'Color rubí vivo con matices violáceos. En nariz se aprecian frutos del bosque, higos maduros y notas balsámicas de pino mediterráneo. En boca es envolvente, equilibrado y con taninos pulidos.',
    maridaje: 'Carnes asadas, embutidos ibéricos y quesos curados de oveja.',
    reconocimientos: '92 Puntos Peñín 2023 | Medalla de Oro',
    fichaTecnica: 'Graduación: 14% vol. Cosecha Seleccionada.',
    descripcion: 'Elaborado exclusivamente con la variedad reina autóctona de Mallorca, expresando la calidez y el terroir de Son Aloy.',
    activo: true,
  },
  {
    titulo: 'Callet',
    coleccion: 'Gama sta',
    variedad: '100% Callet',
    tipo: 'TINTO',
    anio: 2022,
    portada: '/assets/VINOS-01.png',
    categorias: ['Gama sta', 'MONOVARIETALES AUTÓCTONOS', 'TINTO'],
    notaCata: 'Capa media con reflejos granate. Muy aromático, floral, con recuerdos a sotobosque, pimienta blanca y frutas rojas silvestres. En boca destaca por su gran frescura, acidez viva y mineralidad.',
    maridaje: 'Pescados azules al horno, arroces de montaña y carnes blancas.',
    reconocimientos: 'Oro - Concours Mondial de Bruxelles',
    fichaTecnica: 'Graduación: 13.5% vol. Cosecha Seleccionada.',
    descripcion: 'Un tinto elegante de uvas Callet procedentes de cepas viejas en suelo calcáreo pedregoso.',
    activo: true,
  },
  {
    titulo: 'Prensal',
    coleccion: 'Gama sta',
    variedad: '100% Prensal Blanc',
    tipo: 'BLANCO',
    anio: 2023,
    portada: '/assets/VINOS-03.png',
    categorias: ['Gama sta', 'MONOVARIETALES AUTÓCTONOS', 'BLANCO'],
    notaCata: 'Amarillo pajizo brillante. Notas cítricas de piel de limón, hinojo silvestre y manzana verde. Paso por boca ágil, salino y muy refrescante.',
    maridaje: 'Mariscos frescos, aperitivos, ensaladas mediterráneas y fideuá.',
    reconocimientos: 'Mejor Blanco Joven de Baleares 2023',
    fichaTecnica: 'Graduación: 12.5% vol. Cosecha Seleccionada.',
    descripcion: 'La máxima pureza del Prensal Blanc mallorquín. Fermentación a baja temperatura para preservar toda su sutileza aromática.',
    activo: true,
  },
  {
    titulo: 'Giró Ros',
    coleccion: 'Gama sta',
    variedad: '100% Giró Ros',
    tipo: 'BLANCO',
    anio: 2022,
    portada: '/assets/VINOS-04.png',
    categorias: ['Gama sta', 'MONOVARIETALES AUTÓCTONOS', 'BLANCO'],
    notaCata: 'Dorado pálido con reflejos oro nuevo. Complejo en nariz, con notas de melocotón de viña, albaricoque y un sutil fondo anisado. Boca con volumen, untuosa y de persistencia prolongada.',
    maridaje: 'Guisos marineros tradicionales, caldereta de langosta y quesos semicurados.',
    reconocimientos: '90 Puntos Parker | 91 Puntos Guía Peñín',
    fichaTecnica: 'Graduación: 13% vol. Cosecha Seleccionada.',
    descripcion: 'Variedad histórica recuperada de Mallorca. Crianza sobre lías finas durante 4 meses para ganar untuosidad y estructura.',
    activo: true,
  },

  // 2. Colección Surant
  {
    titulo: 'Surant Blanco',
    coleccion: 'Colección Surant',
    variedad: 'Chardonnay, Prensal',
    tipo: 'BLANCO',
    anio: 2022,
    portada: '/assets/VINOS-06.png',
    categorias: ['Colección Surant', 'FRESCURA Y EXPRESIÓN', 'BLANCO'],
    notaCata: 'Aromas a flor de azahar, fruta blanca madura y sutiles toques de brioche. En boca conjuga la vivacidad del Prensal con la estructura cremosa del Chardonnay.',
    maridaje: 'Aves de corral, pescados grasos al grill y risottos cremosos.',
    reconocimientos: 'Gran Oro - Berliner Wein Trophy',
    fichaTecnica: 'Graduación: 13% vol. Cosecha Seleccionada.',
    descripcion: 'Fusión armoniosa entre la frescura autóctona y la finura internacional, criado parcialmente en fudres de roble.',
    activo: true,
  },
  {
    titulo: 'Surant Rosado',
    coleccion: 'Colección Surant',
    variedad: 'Manto Negro, Merlot',
    tipo: 'ROSADO',
    anio: 2023,
    portada: '/assets/VINOS-05.png',
    categorias: ['Colección Surant', 'FRESCURA Y EXPRESIÓN', 'ROSADO'],
    notaCata: 'Color salmón delicado. Notas fragantes de grosella, frambuesa fresca y pétalos de flor silvestre. Boca limpia, equilibrada y con refrescante final cítrico.',
    maridaje: 'Tapas de autor, comida asiática, sushi y pastas frescas.',
    reconocimientos: '91 Puntos Peñín 2024',
    fichaTecnica: 'Graduación: 12.5% vol. Cosecha Seleccionada.',
    descripcion: 'Prensado directo de racimos seleccionados para lograr un rosado vibrante y sedoso.',
    activo: true,
  },

  // 3. Colección ‘Nguany
  {
    titulo: '‘Nguany Tinto',
    coleccion: 'Colección ‘Nguany',
    variedad: 'Manto Negro, Cabernet',
    tipo: 'TINTO',
    anio: 2019,
    portada: '/assets/wine-nguany-tinto.png',
    categorias: ['Colección ‘Nguany', 'VINOS DE FINCA SON ALOY', 'TINTO'],
    notaCata: 'Rojo granate profundo. Complejo y solemne: ciruelas negras, caja de puros, cacao puro y notas minerales terrosas. Taninos nobles y un posgusto largo y majestuoso.',
    maridaje: 'Caza mayor, carnes rojas maduradas y estofados tradicionales.',
    reconocimientos: '95 Puntos Parker | Bacchus de Oro',
    fichaTecnica: 'Graduación: 14.5% vol. Crianza de 18 meses en roble francés. Cosecha Seleccionada.',
    descripcion: 'El vino de máxima expresión de Finca Son Aloy. Uvas de bancales seleccionados vendimiadas en cajas pequeñas.',
    activo: true,
  },
  {
    titulo: '‘Nguany Blanco',
    coleccion: 'Colección ‘Nguany',
    variedad: 'Giró Ros, Viognier',
    tipo: 'BLANCO',
    anio: 2021,
    portada: '/assets/wine-nguany-blanco.png',
    categorias: ['Colección ‘Nguany', 'VINOS DE FINCA SON ALOY', 'BLANCO'],
    notaCata: 'Oro brillante. Intenso y seductor con aromas a albaricoque seco, flores amarillas y pan tostado. En boca es opulento pero con una acidez vertical que lo equilibra con maestría.',
    maridaje: 'Bogavante, vieiras a la plancha, foie y aves nobles.',
    reconocimientos: '93 Puntos Peñín 2023',
    fichaTecnica: 'Graduación: 13.5% vol. Fermentado y criado en barrica de 500L durante 8 meses. Cosecha Seleccionada.',
    descripcion: 'Un blanco de guarda gastronómico y memorable, pensado para evolucionar majestuosamente en botella.',
    activo: true,
  },
  {
    titulo: '‘Nguany Rosado',
    coleccion: 'Colección ‘Nguany',
    variedad: '100% Gorgollassa',
    tipo: 'ROSADO',
    anio: 2022,
    portada: '/assets/wine-nguany-rosado.png',
    categorias: ['Colección ‘Nguany', 'VINOS DE FINCA SON ALOY', 'ROSADO'],
    notaCata: 'Tonalidad piel de cebolla. Exquisito perfil especiado con recuerdos a granada madura, cereza blanca y monte bajo. Boca sutil, mineral y profundamente gastronómica.',
    maridaje: 'Carpaccio de ternera, tartar de atún rojo y arroces marineros melosos.',
    reconocimientos: 'Mejor Rosado Singular de España 2023',
    fichaTecnica: 'Graduación: 12.5% vol. Producción limitada numerada a mano. Cosecha Seleccionada.',
    descripcion: 'Rareza enológica elaborada con la variedad casi extinta Gorgollassa rescatada en Son Aloy.',
    activo: true,
  },
];

async function seed() {
  console.log('Seeding vinos del catálogo...');
  for (const item of CATALOG_DATA) {
    const existing = await prisma.vino.findFirst({
      where: { titulo: item.titulo },
    });
    if (existing) {
      await prisma.vino.update({
        where: { id: existing.id },
        data: item,
      });
      console.log(`Actualizado: ${item.titulo}`);
    } else {
      await prisma.vino.create({
        data: item,
      });
      console.log(`Creado: ${item.titulo}`);
    }
  }
  console.log('Seeding completado.');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
