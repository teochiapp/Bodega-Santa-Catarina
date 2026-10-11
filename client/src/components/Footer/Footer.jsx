import styled from 'styled-components';
import { ScrollLink as Link, BackToTopButton } from '../common/ScrollToTop';

const FooterContainer = styled.footer`
  background-color: rgb(64, 26, 46); /* Dark Burgundy from design */
  color: rgb(242, 236, 228);
`;

const FooterInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 80px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 60px 40px 0;
  }
`;

const LeftCol = styled.div`
  max-width: 280px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const BrandTitle = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  font-weight: 700;
  color: rgb(242, 236, 228);
  margin-bottom: 18px;
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgb(163, 159, 149);
  text-decoration: none;
  transition: color 150ms;
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CenterCol = styled.div`
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InspireText = styled.p`
  font-family: 'Parisienne', "Dancing Script", cursive;
  font-size: clamp(2.2rem, 3.6vw, 3.6rem);
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.2;
  margin: 0;
  
  span {
    display: block;
  }
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  font-weight: 600;
  color: rgb(163, 159, 149);
  margin-top: 14px;
  text-transform: uppercase;
`;

const RightCol = styled.div`
  text-align: right;
  max-width: 260px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ContactTitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 18px;
`;

const ContactText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.82rem;
  color: rgb(242, 236, 228);
  line-height: 1.6;
  margin-bottom: 2px;
`;

const ContactMuted = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.82rem;
  color: rgb(163, 159, 149);
  line-height: 1.6;
  margin-bottom: 14px;
`;

const ContactLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.82rem;
  color: rgb(163, 159, 149);
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
  transition: color 150ms;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ActionLink = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: underline;
  margin-top: 10px;
  
  &:hover {
    color: rgb(242, 236, 228);
  }
`;

const DividerContainer = styled.div`
  max-width: 1440px;
  margin: 48px auto 0;
  padding: 0 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 40px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgb(95, 93, 86);
  opacity: 0.3;
`;

const BottomRow = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 80px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
    justify-content: center;
    padding: 24px 40px 40px;
  }
`;

const CopyrightText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.75rem;
  color: rgb(163, 159, 149);
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const LegalLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.75rem;
  color: rgb(163, 159, 149);
  text-decoration: none;
  transition: color 150ms;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SocialLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.75rem;
  color: rgb(163, 159, 149);
  text-decoration: none;
  transition: color 150ms;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Dot = styled.span`
  color: rgb(163, 159, 149);
  opacity: 0.4;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <LeftCol>
          <BrandTitle to="/">BODEGA SANTA CATARINA</BrandTitle>
          <NavLinks aria-label="Navegación principal del pie de página">
            <StyledLink to="/">INICIO</StyledLink>
            <StyledLink to="/la-bodega">LA BODEGA</StyledLink>
            <StyledLink to="/vinos">VINOS</StyledLink>
            <StyledLink to="/enoturismo">ENOTURISMO</StyledLink>
            <StyledLink to="/eventos">EVENTOS Y BODAS</StyledLink>
            <StyledLink to="/donde-comprar">DÓNDE COMPRAR</StyledLink>
            <StyledLink to="/tienda">TIENDA ONLINE</StyledLink>
            <StyledLink to="/blog">BLOG</StyledLink>
            <StyledLink to="/contacto">CONTACTO</StyledLink>
          </NavLinks>
        </LeftCol>

        <CenterCol>
          <InspireText>
            <span>Mallorca</span>
            <span>siempre inspira</span>
          </InspireText>
          <Subtitle>— TRADICIÓN ANCESTRAL</Subtitle>
        </CenterCol>

        <RightCol>
          <ContactTitle>CONTACTO Y VISITAS</ContactTitle>
          <ContactText>Carretera Inca–Sencelles Km 3</ContactText>
          <ContactMuted>07140 Sencelles, Mallorca</ContactMuted>
          <ContactText>Tlf: +34 971 137 115</ContactText>
          <ContactLink href="mailto:info@bodegasantacatarina.com">info@bodegasantacatarina.com</ContactLink>
          <ActionLink to="/tienda">Tarjetas regalo →</ActionLink>
          <ActionLink to="/donde-comprar">Dónde comprar →</ActionLink>
        </RightCol>
      </FooterInner>

      <DividerContainer>
        <Divider />
      </DividerContainer>

      <BottomRow>
        <CopyrightText>
          &copy; {new Date().getFullYear()} Bodega Santa Catarina. Todos los derechos reservados.
        </CopyrightText>
        <BackToTopButton label="Subir al inicio" />
        <LegalLinks>
          <LegalLink to="#">Aviso Legal</LegalLink>
          <LegalLink to="#">Privacidad</LegalLink>
          <LegalLink to="#">Cookies</LegalLink>
          <Dot>·</Dot>
          <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</SocialLink>
          <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</SocialLink>
        </LegalLinks>
      </BottomRow>
    </FooterContainer>
  );
};

export default Footer;
