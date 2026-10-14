import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.footerBg};
  color: ${(props) => props.theme.colors.secondary};
  padding: 3rem 2rem;
  text-align: center;
  margin-top: auto; /* Pushes footer to the bottom of the layout if flex */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h3 {
    color: ${(props) => props.theme.colors.secondary};
    font-size: calc(1.5rem + 2px);
  }

  p {
    color: ${(props) => props.theme.colors.background};
    font-size: calc(0.9rem + 2px);
    opacity: 0.8;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <h3>Bodega Santa Catarina</h3>
        <p>Viticultura de precisión en el Mediterráneo desde 1984.</p>
        <p>&copy; {new Date().getFullYear()} Bodega Santa Catarina. Todos los derechos reservados.</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
