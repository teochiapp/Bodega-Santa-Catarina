import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

// Subtítulos y orden estándar por gama / colección
const COLECCIONES_CONFIG = {
  'Gama sta': {
    subtitulo: 'MONOVARIETALES AUTÓCTONOS',
    orden: 1,
  },
  'Colección Surant': {
    subtitulo: 'FRESCURA Y EXPRESIÓN',
    orden: 2,
  },
  'Colección ‘Nguany': {
    subtitulo: 'VINOS DE FINCA SON ALOY',
    orden: 3,
  },
  'Colección \'Nguany': {
    subtitulo: 'VINOS DE FINCA SON ALOY',
    orden: 3,
  },
};

// Mapeo de portadas estáticas por defecto
const DEFAULT_IMAGES = {
  'Manto Negro': '/assets/VINOS-02.png',
  'Callet': '/assets/VINOS-01.png',
  'Prensal': '/assets/VINOS-03.png',
  'Giró Ros': '/assets/VINOS-04.png',
  'Surant Blanco': '/assets/VINOS-06.png',
  'Surant Rosado': '/assets/VINOS-05.png',
  '‘Nguany Tinto': '/assets/wine-nguany-tinto.png',
  '\'Nguany Tinto': '/assets/wine-nguany-tinto.png',
  '‘Nguany Blanco': '/assets/wine-nguany-blanco.png',
  '\'Nguany Blanco': '/assets/wine-nguany-blanco.png',
  '‘Nguany Rosado': '/assets/wine-nguany-rosado.png',
  '\'Nguany Rosado': '/assets/wine-nguany-rosado.png',
};

const DEFAULT_CATALOG = [
  {
    gama: 'Gama sta',
    subtitulo: 'MONOVARIETALES AUTÓCTONOS',
    vinos: [
      {
        id: 'mock-1',
        nombre: 'Manto Negro',
        tipo: 'TINTO',
        variedad: '100% Manto Negro',
        añada: 2023,
        imagen: '/assets/VINOS-02.png',
        descripcion: 'Elaborado exclusivamente con la variedad reina autóctona de Mallorca, expresando la calidez y el terroir de Son Aloy.',
        notaCata: 'Color rubí vivo con matices violáceos. En nariz se aprecian frutos del bosque, higos maduros y notas balsámicas de pino mediterráneo. En boca es envolvente, equilibrado y con taninos pulidos.',
        maridaje: 'Carnes asadas, embutidos ibéricos y quesos curados de oveja.',
        reconocimientos: '92 Puntos Peñín 2023 | Medalla de Oro',
        fichaTecnica: 'Graduación: 14% vol. Cosecha Seleccionada.',
      },
      {
        id: 'mock-2',
        nombre: 'Callet',
        tipo: 'TINTO',
        variedad: '100% Callet',
        añada: 2022,
        imagen: '/assets/VINOS-01.png',
        descripcion: 'Un tinto elegante de uvas Callet procedentes de cepas viejas en suelo calcáreo pedregoso.',
        notaCata: 'Capa media con reflejos granate. Muy aromático, floral, con recuerdos a sotobosque, pimienta blanca y frutas rojas silvestres. En boca destaca por su gran frescura, acidez viva y mineralidad.',
        maridaje: 'Pescados azules al horno, arroces de montaña y carnes blancas.',
        reconocimientos: 'Oro - Concours Mondial de Bruxelles',
        fichaTecnica: 'Graduación: 13.5% vol. Cosecha Seleccionada.',
      },
      {
        id: 'mock-3',
        nombre: 'Prensal',
        tipo: 'BLANCO',
        variedad: '100% Prensal Blanc',
        añada: 2023,
        imagen: '/assets/VINOS-03.png',
        descripcion: 'La máxima pureza del Prensal Blanc mallorquín. Fermentación a baja temperatura para preservar toda su sutileza aromática.',
        notaCata: 'Amarillo pajizo brillante. Notas cítricas de piel de limón, hinojo silvestre y manzana verde. Paso por boca ágil, salino y muy refrescante.',
        maridaje: 'Mariscos frescos, aperitivos, ensaladas mediterráneas y fideuá.',
        reconocimientos: 'Mejor Blanco Joven de Baleares 2023',
        fichaTecnica: 'Graduación: 12.5% vol. Cosecha Seleccionada.',
      },
      {
        id: 'mock-4',
        nombre: 'Giró Ros',
        tipo: 'BLANCO',
        variedad: '100% Giró Ros',
        añada: 2022,
        imagen: '/assets/VINOS-04.png',
        descripcion: 'Variedad histórica recuperada de Mallorca. Crianza sobre lías finas durante 4 meses para ganar untuosidad y estructura.',
        notaCata: 'Dorado pálido con reflejos oro nuevo. Complejo en nariz, con notas de melocotón de viña, albaricoque y un sutil fondo anisado. Boca con volumen, untuosa y de persistencia prolongada.',
        maridaje: 'Guisos marineros tradicionales, caldereta de langosta y quesos semicurados.',
        reconocimientos: '90 Puntos Parker | 91 Puntos Guía Peñín',
        fichaTecnica: 'Graduación: 13% vol. Cosecha Seleccionada.',
      },
    ],
  },
  {
    gama: 'Colección Surant',
    subtitulo: 'FRESCURA Y EXPRESIÓN',
    vinos: [
      {
        id: 'mock-5',
        nombre: 'Surant Blanco',
        tipo: 'BLANCO',
        variedad: 'Chardonnay, Prensal',
        añada: 2022,
        imagen: '/assets/VINOS-06.png',
        descripcion: 'Fusión armoniosa entre la frescura autóctona y la finura internacional, criado parcialmente en fudres de roble.',
        notaCata: 'Aromas a flor de azahar, fruta blanca madura y sutiles toques de brioche. En boca conjuga la vivacidad del Prensal con la estructura cremosa del Chardonnay.',
        maridaje: 'Aves de corral, pescados grasos al grill y risottos cremosos.',
        reconocimientos: 'Gran Oro - Berliner Wein Trophy',
        fichaTecnica: 'Graduación: 13% vol. Cosecha Seleccionada.',
      },
      {
        id: 'mock-6',
        nombre: 'Surant Rosado',
        tipo: 'ROSADO',
        variedad: 'Manto Negro, Merlot',
        añada: 2023,
        imagen: '/assets/VINOS-05.png',
        descripcion: 'Prensado directo de racimos seleccionados para lograr un rosado vibrante y sedoso.',
        notaCata: 'Color salmón delicado. Notas fragantes de grosella, frambuesa fresca y pétalos de flor silvestre. Boca limpia, equilibrada y con refrescante final cítrico.',
        maridaje: 'Tapas de autor, comida asiática, sushi y pastas frescas.',
        reconocimientos: '91 Puntos Peñín 2024',
        fichaTecnica: 'Graduación: 12.5% vol. Cosecha Seleccionada.',
      },
    ],
  },
  {
    gama: 'Colección ‘Nguany',
    subtitulo: 'VINOS DE FINCA SON ALOY',
    vinos: [
      {
        id: 'mock-7',
        nombre: '‘Nguany Tinto',
        tipo: 'TINTO',
        variedad: 'Manto Negro, Cabernet',
        añada: 2019,
        imagen: '/assets/wine-nguany-tinto.png',
        descripcion: 'El vino de máxima expresión de Finca Son Aloy. Uvas de bancales seleccionados vendimiadas en cajas pequeñas.',
        notaCata: 'Rojo granate profundo. Complejo y solemne: ciruelas negras, caja de puros, cacao puro y notas minerales terrosas. Taninos nobles y un posgusto largo y majestuoso.',
        maridaje: 'Caza mayor, carnes rojas maduradas y estofados tradicionales.',
        reconocimientos: '95 Puntos Parker | Bacchus de Oro',
        fichaTecnica: 'Graduación: 14.5% vol. Crianza de 18 meses en roble francés. Cosecha Seleccionada.',
      },
      {
        id: 'mock-8',
        nombre: '‘Nguany Blanco',
        tipo: 'BLANCO',
        variedad: 'Giró Ros, Viognier',
        añada: 2021,
        imagen: '/assets/wine-nguany-blanco.png',
        descripcion: 'Un blanco de guarda gastronómico y memorable, pensado para evolucionar majestuosamente en botella.',
        notaCata: 'Oro brillante. Intenso y seductor con aromas a albaricoque seco, flores amarillas y pan tostado. En boca es opulento pero con una acidez vertical que lo equilibra con maestría.',
        maridaje: 'Bogavante, vieiras a la plancha, foie y aves nobles.',
        reconocimientos: '93 Puntos Peñín 2023',
        fichaTecnica: 'Graduación: 13.5% vol. Fermentado y criado en barrica de 500L durante 8 meses. Cosecha Seleccionada.',
      },
      {
        id: 'mock-9',
        nombre: '‘Nguany Rosado',
        tipo: 'ROSADO',
        variedad: '100% Gorgollassa',
        añada: 2022,
        imagen: '/assets/wine-nguany-rosado.png',
        descripcion: 'Rareza enológica elaborada con la variedad casi extinta Gorgollassa rescatada en Son Aloy.',
        notaCata: 'Tonalidad piel de cebolla. Exquisito perfil especiado con recuerdos a granada madura, cereza blanca y monte bajo. Boca sutil, mineral y profundamente gastronómica.',
        maridaje: 'Carpaccio de ternera, tartar de atún rojo y arroces marineros melosos.',
        reconocimientos: 'Mejor Rosado Singular de España 2023',
        fichaTecnica: 'Graduación: 12.5% vol. Producción limitada numerada a mano. Cosecha Seleccionada.',
      },
    ],
  },
];

const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(4rem, 7vw, 6rem) 2rem;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: clamp(2.5rem, 5vw, 4rem) 1.25rem;
  }
`;

const GamaContainer = styled.div`
  margin-bottom: 5rem;

  &:last-of-type {
    margin-bottom: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    margin-bottom: 3.5rem;
  }
`;

const GamaHeader = styled.div`
  border-bottom: 1px solid rgba(194, 164, 120, 0.25);
  padding-bottom: 20px;
  margin-bottom: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    margin-bottom: 1.75rem;
    padding-bottom: 14px;
  }
`;

const GamaSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 6px 0;
`;

const GamaTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2rem, 3vw, 3.2rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0;
  line-height: 1.1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled(motion.div)`
  background: rgb(242, 236, 228);
  border: 1px solid rgb(224, 221, 213);
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(80, 43, 58, 0.08);
    border-color: rgba(194, 164, 120, 0.6);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    padding: 20px 16px;
    gap: 14px;
  }
`;

const CardBody = styled.div`
  display: flex;
  gap: 16px;
  align-items: stretch;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const BottleContainer = styled.div`
  background: rgb(242, 236, 228);
  border-radius: 8px;
  height: 520px;
  min-width: 0px;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  padding: 16px 8px;
  box-sizing: border-box;

  @media (max-width: 960px) {
    height: 480px;
  }

  @media (max-width: 576px) {
    height: auto;
    min-height: 340px;
    padding: 12px 6px;
  }
`;

const BottleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(-24px)' : 'translateX(0)')};

  @media (max-width: 576px) {
    transform: none;
  }
`;

const BottleImg = styled.img`
  height: 390px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.03);
  }

  @media (max-width: 960px) {
    height: 350px;
  }

  @media (max-width: 576px) {
    height: 270px;
  }
`;

const BottleInfo = styled.div`
  text-align: center;
  margin-top: 14px;
`;

const BottleName = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(1.3rem, 1.8vw, 1.6rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0;
  line-height: 1.2;
`;

const BottleType = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 4px 0 0 0;
`;

const SidePanel = styled.div`
  width: ${({ $isOpen }) => ($isOpen ? 'clamp(280px, 48%, 320px)' : '170px')};
  height: 520px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  border-left: ${({ $isOpen }) => ($isOpen ? 'none' : '1px solid rgb(224, 221, 213)')};
  padding-left: ${({ $isOpen }) => ($isOpen ? '0px' : '16px')};
  box-sizing: border-box;
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease;

  @media (max-width: 960px) {
    height: 480px;
  }

  @media (max-width: 768px) {
    width: ${({ $isOpen }) => ($isOpen ? '260px' : '140px')};
  }

  @media (max-width: 576px) {
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 1px solid rgb(224, 221, 213);
    padding-left: 0;
    padding-top: 14px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
`;

const NotaCataButton = styled.button`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  border-radius: 100px;
  padding: 10px 18px;
  cursor: pointer;
  white-space: nowrap;
  align-self: flex-end;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    color: #FFFFFF;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(80, 43, 58, 0.15);
  }

  @media (max-width: 576px) {
    align-self: center;
    width: 100%;
    justify-content: center;
    padding: 12px 20px;
  }
`;

const TastingNoteBox = styled(motion.div)`
  background: rgb(242, 236, 228);
  border-radius: 8px;
  padding: 16px;
  border-left: 3px solid rgb(194, 164, 120);
  margin-top: 14px;
  overflow-y: auto;
  max-height: 440px;
  box-sizing: border-box;

  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(194, 164, 120, 0.4);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 576px) {
    max-height: unset;
  }
`;

const NoteCategory = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: rgb(194, 164, 120);
  margin: 0px 0px 8px;
  font-weight: 700;
  text-transform: uppercase;
`;

const NoteDescription = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.8rem;
  line-height: 1.65;
  color: rgb(80, 43, 58);
  margin: 0px;
  font-style: italic;
`;

const NoteDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  border-top: 1px solid rgb(224, 221, 213);
  margin-top: 14px;
  padding-top: 14px;
`;

const NoteDetailItem = styled.div``;

const NoteDetailTitle = styled.strong`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: rgb(80, 43, 58);
  font-weight: 700;
  display: block;
  margin-bottom: 2px;
  text-transform: uppercase;
`;

const NoteDetailText = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.75rem;
  line-height: 1.55;
  color: rgb(80, 43, 58);
  margin: 0px;
`;

const FichaTecnicaBtn = styled.button`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: rgb(80, 43, 58);
  background: transparent;
  border-width: 0px 0px 1px;
  border-style: none none solid;
  border-color: currentcolor currentcolor rgb(80, 43, 58);
  border-image: none;
  padding: 0px 0px 3px;
  cursor: pointer;
  margin-top: 14px;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    color: rgb(194, 164, 120);
    border-color: rgb(194, 164, 120);
    transform: translateX(2px);
  }
`;

const CardFooter = styled.div`
  border-top: 1px solid rgb(224, 221, 213);
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const FooterBadge = styled.span`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
`;

const FooterAñada = styled.span`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
`;

const CatalogoVinos = ({ filtroColeccion, ocultarHeaderGama = false }) => {
  const [openNotaId, setOpenNotaId] = useState(null);
  const [catalog, setCatalog] = useState(DEFAULT_CATALOG);
  const [, setLoading] = useState(true);

  useEffect(() => {
    api.get('/vinos')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const grupos = {};

          data
            .filter((v) => v.activo !== false && v.titulo && v.titulo.trim() !== '')
            .forEach((v) => {
              const gama = v.coleccion || (Array.isArray(v.categorias) && v.categorias[0]) || 'Gama sta';
              if (!grupos[gama]) {
                const config = COLECCIONES_CONFIG[gama] || {
                  subtitulo: 'COLECCIÓN BODEGA',
                  orden: 99,
                };
                grupos[gama] = {
                  gama,
                  subtitulo: config.subtitulo,
                  orden: config.orden,
                  vinos: [],
                };
              }

              const resolvedImage =
                v.portada && v.portada !== '/isologo.png'
                  ? v.portada
                  : DEFAULT_IMAGES[v.titulo] || '/assets/VINOS-01.png';

              grupos[gama].vinos.push({
                id: v.id,
                nombre: v.titulo,
                tipo: (v.tipo || 'TINTO').toUpperCase(),
                variedad: v.variedad || '',
                añada: v.anio || 'Cosecha Seleccionada',
                badge: v.fichaTecnica?.includes('Cosecha') ? 'Cosecha Seleccionada' : 'Cosecha Seleccionada',
                descripcion: v.descripcion || '',
                notaCata: v.notaCata || '',
                maridaje: v.maridaje || '',
                reconocimientos: v.reconocimientos || '',
                fichaTecnica: v.fichaTecnica || '',
                imagen: resolvedImage,
                gama,
              });
            });

          const transformed = Object.values(grupos).sort((a, b) => a.orden - b.orden);

          if (transformed.length > 0) {
            setCatalog(transformed);
          }
        }
      })
      .catch((err) => {
        console.warn('[CatalogoVinos] Usando datos de catálogo local tras error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDownloadFicha = (vino) => {
    const contenido = `BODEGA SANTA CATARINA - MALLORCA
FICHA TÉCNICA
==========================================
Vino: ${vino.nombre}
Tipo: ${vino.tipo}
Variedad: ${vino.variedad || '-'}
Añada: ${vino.añada || '-'}
Colección: ${vino.gama || '-'}

HISTORIA Y NOTA DE CATA
------------------------------------------
${vino.notaCata || vino.descripcion || '-'}

MARIDAJE
------------------------------------------
${vino.maridaje || '-'}

DATOS TÉCNICOS
------------------------------------------
${vino.fichaTecnica || 'Graduación: 13.5% vol. Cosecha Seleccionada.'}

RECONOCIMIENTOS
------------------------------------------
${vino.reconocimientos || 'Selección de la bodega'}

==========================================
Bodega Santa Catarina · Finca Son Aloy, Mallorca
`;
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ficha-tecnica-${vino.nombre.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resolveGamaId = (gama) => {
    const g = (gama || '').toLowerCase();
    if (g.includes('sta')) return 'coleccion-sta';
    if (g.includes('surant')) return 'coleccion-surant';
    if (g.includes('nguany')) return 'coleccion-nguany';
    return undefined;
  };

  const displayedCatalog = filtroColeccion
    ? catalog.filter((seccion) => {
        const gama = (seccion.gama || '').toLowerCase();
        const f = filtroColeccion.toLowerCase();
        return gama.includes(f);
      })
    : catalog;

  return (
    <Section>
      {displayedCatalog.map((seccion, idx) => (
        <GamaContainer
          key={idx}
          id={resolveGamaId(seccion.gama)}
          style={{ scrollMarginTop: '110px' }}
        >
          {!ocultarHeaderGama && (
            <GamaHeader>
              <GamaSubtitle>{seccion.subtitulo || 'COLECCIÓN'}</GamaSubtitle>
              <GamaTitle>{seccion.gama}</GamaTitle>
            </GamaHeader>
          )}

          <Grid>
            {seccion.vinos.map((vino, vIdx) => {
              const vinoKey = vino.id || `${seccion.gama}-${vino.nombre}-${vIdx}`;
              const isOpen = openNotaId === vinoKey;

              return (
                <Card
                  key={vinoKey}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (vIdx % 2) * 0.1 }}
                  onClick={() => setOpenNotaId(isOpen ? null : vinoKey)}
                >
                  <CardBody>
                    <BottleContainer>
                      <BottleWrapper $isOpen={isOpen}>
                        <BottleImg
                          src={vino.imagen}
                          alt={`${vino.nombre} · ${vino.tipo}`}
                          loading="lazy"
                        />
                        <BottleInfo>
                          <BottleName>{vino.nombre}</BottleName>
                          <BottleType>{vino.tipo}</BottleType>
                        </BottleInfo>
                      </BottleWrapper>
                    </BottleContainer>

                    <SidePanel $isOpen={isOpen}>
                      <NotaCataButton
                        type="button"
                        $isOpen={isOpen}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenNotaId(isOpen ? null : vinoKey);
                        }}
                      >
                        NOTA DE CATA {isOpen ? '▲' : '▼'}
                      </NotaCataButton>

                      <AnimatePresence>
                        {isOpen && (
                          <TastingNoteBox
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <NoteCategory>HISTORIA Y NOTA DE CATA</NoteCategory>
                            <NoteDescription>
                              {vino.notaCata ||
                                vino.descripcion ||
                                'Fruta roja madura, violeta, especias suaves. Taninos sedosos, final persistente con notas de ciruela y regaliz.'}
                            </NoteDescription>

                            <NoteDetailsGrid>
                              {vino.maridaje && (
                                <NoteDetailItem>
                                  <NoteDetailTitle>MARIDAJE</NoteDetailTitle>
                                  <NoteDetailText>{vino.maridaje}</NoteDetailText>
                                </NoteDetailItem>
                              )}

                              <NoteDetailItem>
                                <NoteDetailTitle>VARIEDAD · AÑADA</NoteDetailTitle>
                                <NoteDetailText>
                                  {vino.variedad ? `${vino.variedad}${vino.añada ? ' · ' : ''}` : ''}
                                  {vino.añada || ''}
                                </NoteDetailText>
                              </NoteDetailItem>

                              <NoteDetailItem>
                                <NoteDetailTitle>RECONOCIMIENTOS</NoteDetailTitle>
                                <NoteDetailText>
                                  {vino.reconocimientos || 'Selección de la bodega'}
                                </NoteDetailText>
                              </NoteDetailItem>
                            </NoteDetailsGrid>

                            <FichaTecnicaBtn
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadFicha(vino);
                              }}
                            >
                              DESCARGAR FICHA TÉCNICA
                            </FichaTecnicaBtn>
                          </TastingNoteBox>
                        )}
                      </AnimatePresence>
                    </SidePanel>
                  </CardBody>

                  <CardFooter>
                    <FooterBadge>{vino.badge || 'Cosecha Seleccionada'}</FooterBadge>
                    {vino.añada && typeof vino.añada === 'number' && (
                      <FooterAñada>{vino.añada}</FooterAñada>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </Grid>
        </GamaContainer>
      ))}
    </Section>
  );
};

export default CatalogoVinos;
