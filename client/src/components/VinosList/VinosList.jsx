import styled from 'styled-components';
import useVinos from '../../hooks/useVinos';
import VinoCard from '../VinoCard/VinoCard';

// ── Estilos ───────────────────────────────────────────────────────────────────

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const Mensaje = styled.p`
  text-align: center;
  padding: 3rem;
  opacity: 0.6;
  font-size: 1rem;
`;

const MensajeError = styled(Mensaje)`
  color: #c0392b;
`;

// ── Componente ────────────────────────────────────────────────────────────────

const VinosList = () => {
  const { vinos, cargando, error } = useVinos();

  if (cargando) return <Mensaje>Cargando vinos...</Mensaje>;
  if (error) return <MensajeError>Error: {error}</MensajeError>;
  if (vinos.length === 0) return <Mensaje>No hay vinos cargados todavía.</Mensaje>;

  return (
    <Grid>
      {vinos.map((vino) => (
        <VinoCard key={vino.id} vino={vino} />
      ))}
    </Grid>
  );
};

export default VinosList;
