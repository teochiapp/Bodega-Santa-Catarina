import styled from 'styled-components';
import VinoSidebar from './VinoSidebar';
import { useState, useEffect } from 'react';
import api from '../../services/api';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const GamaContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const GamaTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const VinoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const VinoImage = styled.div`
  height: 250px;
  background-color: #eaeaea;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-image: ${(p) => (p.$bg ? `url(${p.$bg})` : 'none')};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const VinoName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const DEFAULT_CATALOG = [
  {
    gama: 'Gama sta',
    vinos: [
      { nombre: 'Manto Negro', variedad: '100% Manto Negro', añada: '2023', descripcion: 'Un tinto elegante y frutal.', maridaje: 'Carnes asadas, quesos curados.', reconocimientos: '92 Puntos Peñín' },
      { nombre: 'Callet', variedad: '100% Callet', añada: '2022', descripcion: 'Fresco y mineral.', maridaje: 'Pescados al horno, arroces.', reconocimientos: 'Oro - Concours Mondial' },
      { nombre: 'Prensal', variedad: '100% Prensal Blanc', añada: '2023', descripcion: 'Blanco aromático con notas florales.', maridaje: 'Mariscos, aperitivos.', reconocimientos: 'Mejor blanco joven' },
      { nombre: 'Giró Ros', variedad: '100% Giró Ros', añada: '2022', descripcion: 'Vino blanco con crianza.', maridaje: 'Guisos de pescado.', reconocimientos: '90 Puntos Parker' },
    ]
  },
  {
    gama: 'Colección Surant',
    vinos: [
      { nombre: 'Surant Blanco', variedad: 'Chardonnay, Prensal', añada: '2022', descripcion: 'Complejidad y elegancia.', maridaje: 'Aves, pescados grasos.', reconocimientos: 'Gran Oro' },
      { nombre: 'Surant Rosado', variedad: 'Manto Negro, Merlot', añada: '2023', descripcion: 'Fresco, vibrante y estructurado.', maridaje: 'Ensaladas complejas, pastas.', reconocimientos: '91 Puntos Peñín' },
    ]
  },
  {
    gama: 'Colección \'Nguany',
    vinos: [
      { nombre: '\'Nguany Tinto', variedad: 'Manto Negro, Cabernet', añada: '2019', descripcion: 'Elaboración premium con crianza prolongada.', maridaje: 'Caza, estofados.', reconocimientos: '95 Puntos Parker' },
      { nombre: '\'Nguany Blanco', variedad: 'Giró Ros, Viognier', añada: '2021', descripcion: 'Blanco de guarda excepcional.', maridaje: 'Bogavante, foie.', reconocimientos: '93 Puntos Peñín' },
      { nombre: '\'Nguany Rosado', variedad: '100% Gorgollassa', añada: '2022', descripcion: 'Edición limitada y exclusiva.', maridaje: 'Sushi, tartar de atún.', reconocimientos: 'Mejor rosado de España' },
    ]
  }
];

const CatalogoVinos = () => {
  const [selectedVino, setSelectedVino] = useState(null);
  const [catalog, setCatalog] = useState(DEFAULT_CATALOG);

  useEffect(() => {
    api.get('/vinos')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const grupos = {};
          data.forEach((v) => {
            const gama = v.coleccion || (Array.isArray(v.categorias) && v.categorias[0]) || 'Colección Bodega';
            if (!grupos[gama]) grupos[gama] = [];
            grupos[gama].push({
              nombre: v.titulo || `${v.variedad} ${v.anio || ''}`.trim(),
              variedad: v.variedad,
              añada: v.anio,
              descripcion: v.notaCata ? `${v.descripcion}\n\nNota de cata: ${v.notaCata}` : v.descripcion,
              maridaje: v.maridaje || 'Consultar con nuestro sommelier.',
              reconocimientos: v.reconocimientos || '',
              imagen: v.portada || '/isologo.png',
              gama,
            });
          });
          const transformed = Object.keys(grupos).map((gama) => ({
            gama,
            vinos: grupos[gama],
          }));
          setCatalog(transformed);
        }
      })
      .catch((err) => {
        console.warn('[CatalogoVinos] Error cargando vinos de la API, usando mock:', err);
      });
  }, []);

  return (
    <Section>
      {catalog.map((seccion, idx) => (
        <GamaContainer key={idx}>
          <GamaTitle>{seccion.gama}</GamaTitle>
          <Grid>
            {seccion.vinos.map((vino, vIdx) => (
              <VinoCard key={vIdx} onClick={() => setSelectedVino({ ...vino, gama: seccion.gama })}>
                <VinoImage $bg={vino.imagen} />
                <VinoName>{vino.nombre}</VinoName>
              </VinoCard>
            ))}
          </Grid>
        </GamaContainer>
      ))}

      {/* Sidebar para mostrar la info del vino seleccionado */}
      <VinoSidebar vino={selectedVino} onClose={() => setSelectedVino(null)} />
    </Section>
  );
};

export default CatalogoVinos;
