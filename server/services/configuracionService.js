const prisma = require('./prismaClient');

const CONFIG_ID = 1;

const DEFAULTS = {
  telefono: '+34 971 00 00 00',
  whatsapp: '+34 600 00 00 00',
  emailContacto: 'info@santacatarina.com',
  emailReservas: 'reservas@santacatarina.com',
  emailEventos: 'eventos@santacatarina.com',
  direccion: 'Finca Son Aloy, Ma-3140, km 3, Sencelles, Mallorca',
  googleMapsUrl: 'https://maps.google.com/?q=Finca+Son+Aloy+Sencelles',
  instagramUrl: 'https://instagram.com/bodegasantacatarina',
  facebookUrl: 'https://facebook.com/bodegasantacatarina',
  tripAdvisorUrl: 'https://tripadvisor.es',
  bannerActivo: false,
  bannerTexto: '',
  bannerEnlace: '',
};

const obtenerConfiguracion = async () => {
  let config = await prisma.configuracionGeneral.findUnique({
    where: { id: CONFIG_ID },
  });

  if (!config) {
    config = await prisma.configuracionGeneral.create({
      data: {
        id: CONFIG_ID,
        ...DEFAULTS,
      },
    });
  }

  const vacaciones = await prisma.diaVacacion.findMany({
    orderBy: { fechaInicio: 'asc' },
  });

  return {
    ...config,
    diasVacaciones: vacaciones,
  };
};

const actualizarConfiguracion = async (data) => {
  return prisma.configuracionGeneral.upsert({
    where: { id: CONFIG_ID },
    create: {
      id: CONFIG_ID,
      telefono: data.telefono,
      whatsapp: data.whatsapp,
      emailContacto: data.emailContacto,
      emailReservas: data.emailReservas,
      emailEventos: data.emailEventos,
      direccion: data.direccion,
      googleMapsUrl: data.googleMapsUrl,
      instagramUrl: data.instagramUrl,
      facebookUrl: data.facebookUrl,
      tripAdvisorUrl: data.tripAdvisorUrl,
      bannerActivo: Boolean(data.bannerActivo),
      bannerTexto: data.bannerTexto,
      bannerEnlace: data.bannerEnlace,
    },
    update: {
      telefono: data.telefono !== undefined ? data.telefono : undefined,
      whatsapp: data.whatsapp !== undefined ? data.whatsapp : undefined,
      emailContacto: data.emailContacto !== undefined ? data.emailContacto : undefined,
      emailReservas: data.emailReservas !== undefined ? data.emailReservas : undefined,
      emailEventos: data.emailEventos !== undefined ? data.emailEventos : undefined,
      direccion: data.direccion !== undefined ? data.direccion : undefined,
      googleMapsUrl: data.googleMapsUrl !== undefined ? data.googleMapsUrl : undefined,
      instagramUrl: data.instagramUrl !== undefined ? data.instagramUrl : undefined,
      facebookUrl: data.facebookUrl !== undefined ? data.facebookUrl : undefined,
      tripAdvisorUrl: data.tripAdvisorUrl !== undefined ? data.tripAdvisorUrl : undefined,
      bannerActivo: data.bannerActivo !== undefined ? Boolean(data.bannerActivo) : undefined,
      bannerTexto: data.bannerTexto !== undefined ? data.bannerTexto : undefined,
      bannerEnlace: data.bannerEnlace !== undefined ? data.bannerEnlace : undefined,
    },
  });
};

const obtenerDiasVacaciones = async () => {
  return prisma.diaVacacion.findMany({
    orderBy: { fechaInicio: 'asc' },
  });
};

const crearDiaVacacion = async (data) => {
  return prisma.diaVacacion.create({
    data: {
      fechaInicio: new Date(data.fechaInicio),
      fechaFin: new Date(data.fechaFin),
      motivo: data.motivo || 'Vacaciones / Cierre de temporada',
      activo: data.activo !== undefined ? Boolean(data.activo) : true,
    },
  });
};

const editarDiaVacacion = async (id, data) => {
  return prisma.diaVacacion.update({
    where: { id: parseInt(id, 10) },
    data: {
      fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : undefined,
      fechaFin: data.fechaFin ? new Date(data.fechaFin) : undefined,
      motivo: data.motivo !== undefined ? data.motivo : undefined,
      activo: data.activo !== undefined ? Boolean(data.activo) : undefined,
    },
  });
};

const eliminarDiaVacacion = async (id) => {
  return prisma.diaVacacion.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = {
  obtenerConfiguracion,
  actualizarConfiguracion,
  obtenerDiasVacaciones,
  crearDiaVacacion,
  editarDiaVacacion,
  eliminarDiaVacacion,
};
