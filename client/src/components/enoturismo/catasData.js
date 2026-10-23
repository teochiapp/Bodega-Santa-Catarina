// Constantes de la sección "Catas y visitas" (enoturismo).
// El catálogo, horarios y cupos vienen de la API (/catas y /reservas/disponibilidad).

export const MAX_PERSONAS_POR_RESERVA = 10;

export const CATAS_IDIOMAS = [
  { value: 'Español', label: 'Español' },
  { value: 'Inglés', label: 'Inglés' },
  { value: 'Alemán', label: 'Alemán · Bajo solicitud · coste adicional' },
  { value: 'Francés', label: 'Francés · Bajo solicitud · coste adicional' },
  { value: 'Portugués', label: 'Portugués · Bajo solicitud · coste adicional' },
];

export const AVISO_IDIOMAS_ADICIONALES =
  'Visitas en alemán, francés y portugués: con coste adicional. Deben solicitarse con antelación y quedan pendientes de confirmación por parte de la bodega.';
