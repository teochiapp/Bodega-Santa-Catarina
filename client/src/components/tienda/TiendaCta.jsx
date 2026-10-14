import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CtaSection = styled.section`
  background-color: #F4F2EB;
  padding: clamp(3.5rem, 6vw, 5rem) 2rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;

const Eyebrow = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin: 0 0 14px 0;
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: clamp(2.1rem, 4vw, 3.5rem);
  font-weight: 500;
  color: rgb(80, 43, 58);
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  max-width: 590px;
  margin: 0 auto 2rem auto;
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgb(80, 43, 58);
`;

const ContactButton = styled.button`
  padding: 14px 30px;
  border: 0;
  border-radius: 100px;
  background-color: rgb(80, 43, 58);
  color: rgb(242, 236, 228);
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;

  &:hover {
    background-color: #381a28;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(80, 43, 58, 0.25);
  }
`;

const TiendaCta = () => {
  const navigate = useNavigate();

  return (
    <CtaSection>
      <Eyebrow>PLANIFICA TU VISITA</Eyebrow>
      <Title>Te esperamos en Son Aloy</Title>
      <Description>
        Escríbenos para confirmar el horario de la tienda o para consultar disponibilidad de vinos y productos.
      </Description>
      <ContactButton type="button" onClick={() => navigate('/contacto')}>
        CONTACTAR
      </ContactButton>
    </CtaSection>
  );
};

export default TiendaCta;
