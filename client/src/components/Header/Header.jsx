import styled from 'styled-components';
import { ScrollLink } from '../common/ScrollToTop';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 12px rgba(80, 43, 58, 0.04);
`;

const HeaderInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1180px) {
    padding: 0 1.5rem;
    height: 88px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 1.25rem;
    height: 80px;
  }
`;

const LogoLink = styled(ScrollLink)`
  display: flex;
  align-items: center;
  height: 82px;
  margin-right: 24px;
  flex-shrink: 0;
  text-decoration: none;

  @media (max-width: 1180px) {
    margin-right: auto;
    height: 68px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 58px;
  }
`;

const LogoImage = styled.img`
  width: 234px;
  height: auto;
  max-height: 82px;
  object-fit: contain;
  display: block;
  mix-blend-mode: multiply;

  @media (max-width: 1180px) {
    width: 204px;
    max-height: 68px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 174px;
    max-height: 58px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 1181px) {
    display: none;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        <LogoLink to="/" aria-label="Bodega Santa Catarina - Ir a Inicio">
          <LogoImage src="/logo-santacatarina.png" alt="Bodega Santa Catarina" />
        </LogoLink>
        <NavMenu />
        <RightSection>
          <MobileMenu />
        </RightSection>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
