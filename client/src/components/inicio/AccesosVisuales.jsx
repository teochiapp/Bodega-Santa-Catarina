import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const AccesoCard = styled(Link)`
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.border};
  overflow: hidden;

  /* Imagen de fondo simulada */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    transition: background 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    background: rgba(0, 0, 0, 0.2);
  }

  h3 {
    position: relative;
    z-index: 2;
    color: ${({ theme }) => theme.colors.surface};
    font-size: ${({ theme }) => theme.typography.sizes.xl};
    margin: 0;
  }
`;

const AccesosVisuales = () => {
  const accesos = [
    { title: 'Enoturismo', path: '/enoturismo' },
    { title: 'Nuestros Vinos', path: '/vinos' },
    { title: 'Eventos y Bodas', path: '/eventos' },
    { title: 'Tienda Online', path: '/tienda' },
  ];

  return (
    <Grid>
      {accesos.map((acceso, index) => (
        <AccesoCard key={index} to={acceso.path}>
          <h3>{acceso.title}</h3>
        </AccesoCard>
      ))}
    </Grid>
  );
};

export default AccesosVisuales;
