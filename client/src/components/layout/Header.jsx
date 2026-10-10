import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 1.5rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;

  a {
    color: ${(props) => props.theme.colors.secondary};
    text-decoration: none;
    font-weight: 500;
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: 1.2rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${(props) => props.theme.colors.background};
    }
  }
`;

const Header = () => {
  return (
    <header>
      <Nav>
        <Link to="/">Inicio</Link>
        <Link to="/bodega">La Bodega</Link>
        <Link to="/vinos">Vinos</Link>
        <Link to="/enoturismo">Enoturismo</Link>
        <Link to="/eventos">Eventos y Bodas</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contacto">Contacto</Link>
      </Nav>
    </header>
  );
};

export default Header;
