import styled from 'styled-components';
import { Cookie } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';

const FooterContainer = styled.footer`
  background-color: rgb(64, 26, 46);
  width: 100%;
  color: rgb(242, 236, 228);
  box-sizing: border-box;
`;

const FooterInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 80px 40px 80px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 48px 32px 32px 32px;
  }

  @media (max-width: 650px) {
    padding: 40px 24px 28px 24px;
    justify-content: flex-start;
  }
`;

const ContactBlock = styled.div`
  text-align: right;
  max-width: 420px;
  box-sizing: border-box;

  @media (max-width: 650px) {
    text-align: left;
    max-width: 100%;
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 18px 0;
`;

const FieldTitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.82rem;
  font-weight: 700;
  color: rgb(242, 236, 228);
  line-height: 1.6;
  margin: 0;
`;

const EmailLink = styled.a`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.82rem;
  color: rgb(163, 159, 149);
  line-height: 1.6;
  text-decoration: none;
  display: block;
  margin-bottom: 16px;
  overflow-wrap: break-word;
  word-break: break-word;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  }
`;

const AddressText = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.82rem;
  color: rgb(163, 159, 149);
  line-height: 1.6;
  margin: 0;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const FooterBottomBar = styled.div`
  border-top: 1px solid rgba(194, 164, 120, 0.15);
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 18px 32px;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 650px) {
    padding: 18px 24px;
  }
`;

const CopyrightText = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.75rem;
  color: rgb(163, 159, 149);
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
`;

const LegalButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.75rem;
  color: rgb(163, 159, 149);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    text-decoration: underline;
  }
`;

const Footer = () => {
  const { openPreferencesModal } = useCookieConsent();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer className="site-footer">
      <FooterInner className="site-footer-main">
        <ContactBlock>
          <Eyebrow>CONTACTO</Eyebrow>
          <FieldTitle>Email</FieldTitle>
          <EmailLink href="mailto:info@bodegasantacatarina.com">
            Info@bodegasantacatarina.com
          </EmailLink>
          <FieldTitle>Dirección</FieldTitle>
          <AddressText>
            Carretera Inca – Sencelles, Km3, 07140 Sencelles, Mallorca
          </AddressText>
        </ContactBlock>
      </FooterInner>

      <FooterBottomBar>
        <CopyrightText>
          © {currentYear} Bodega Santa Catarina. Todos los derechos reservados.
        </CopyrightText>
        <LegalLinks>
          <LegalButton onClick={openPreferencesModal} type="button" title="Configurar cookies">
            <Cookie size={14} />
            Configuración de Cookies
          </LegalButton>
        </LegalLinks>
      </FooterBottomBar>
    </FooterContainer>
  );
};

export default Footer;
