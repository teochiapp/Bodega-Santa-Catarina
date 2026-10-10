import styled from 'styled-components';
import VinosList from '../components/VinosList/VinosList';

const PageHeader = styled.div`
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    opacity: 0.65;
    font-size: 1rem;
  }
`;

/**
 * VinosPage — página que solo compone componentes.
 * Sin lógica propia: el fetch y los estados viven en VinosList → useVinos.
 */
const VinosPage = () => {
  return (
    <>
      <PageHeader>
        <h1>Nuestros Vinos</h1>
        <p>Selección de vinos de Bodega Santa Catarina — Mallorca desde 1984.</p>
      </PageHeader>
      <VinosList />
    </>
  );
};

export default VinosPage;
