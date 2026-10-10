import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavMenu from './NavMenu';
import NavButtons from './NavButtons';
import MobileMenu from './MobileMenu';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 68px;
  margin-right: 56px;
  flex-shrink: 0;
`;

const LogoImage = styled.img`
  width: 210px;
  height: auto;
  max-height: 68px;
  object-fit: contain;
  display: block;
  mix-blend-mode: multiply;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-left: auto; /* Mantenemos auto para empujar los botones a la derecha visualmente, o 24px si se quieren pegados al menú */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-left: auto;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        <LogoLink to="/">
          <LogoImage src="/logo-santacatarina.png" alt="Bodega Santa Catarina" />
        </LogoLink>
        <NavMenu />
        <RightSection>
          <NavButtons />
          <MobileMenu />
        </RightSection>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
