import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: rgb(64, 26, 46);
  width: 100%;
  color: rgb(242, 236, 228);
  box-sizing: border-box;
`;

const FooterInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 80px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 48px 32px;
  }

  @media (max-width: 650px) {
    padding: 40px 24px;
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

const Footer = () => {
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
    </FooterContainer>
  );
};

export default Footer;
