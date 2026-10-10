import styled from 'styled-components';

// ── Estilos ───────────────────────────────────────────────────────────────────

const Card = styled.article`
  background: #ffffff;
  border-radius: 8px;
  padding: 1.75rem;
  box-shadow: 0 2px 12px rgba(80, 43, 58, 0.08);
  border-left: 3px solid ${(p) => p.theme.colors.secondary};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(80, 43, 58, 0.14);
  }
`;

const Coleccion = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.secondary};
`;

const Titulo = styled.h2`
  font-size: 1.5rem;
  margin: 0.3rem 0 0.1rem;
`;

const Meta = styled.p`
  font-size: 0.875rem;
  color: ${(p) => p.theme.colors.primary};
  opacity: 0.6;
  margin-bottom: 1rem;
`;

const Descripcion = styled.p`
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${(p) => p.theme.colors.primary};
`;

// ── Componente ────────────────────────────────────────────────────────────────

const VinoCard = ({ vino }) => {
  const { coleccion, anio, variedad, tipo, descripcion } = vino;

  return (
    <Card>
      <Coleccion>{coleccion}</Coleccion>
      <Titulo>{variedad} {anio}</Titulo>
      <Meta>{tipo}</Meta>
      <Descripcion>{descripcion}</Descripcion>
    </Card>
  );
};

export default VinoCard;
