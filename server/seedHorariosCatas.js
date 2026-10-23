// Crea la plantilla semanal por defecto (lunes a viernes) para las catas que aún no tienen horarios.
// Uso: node seedHorariosCatas.js
require('dotenv').config();
const prisma = require('./services/prismaClient');

const HORAS = ['10:00', '11:30', '13:00', '15:00'];
const DIAS = [1, 2, 3, 4, 5];

(async () => {
  const catas = await prisma.cata.findMany({ include: { _count: { select: { horarios: true } } } });
  for (const cata of catas) {
    if (cata._count.horarios > 0) continue;
    await prisma.horarioCata.createMany({
      data: DIAS.flatMap((diaSemana) => HORAS.map((hora) => ({ cataId: cata.id, diaSemana, hora }))),
    });
    console.log(`Horarios por defecto creados para "${cata.titulo}"`);
  }
  console.log(`Catas procesadas: ${catas.length}`);
  await prisma.$disconnect();
})();
