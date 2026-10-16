import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import bodaImg from '../../imports/Santa_Catarina_353-4.jpg';

const Section = styled.section`
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 576px) {
    padding: 4.5rem 1.25rem;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
`;

const DarkOverlay = styled.div`
  position: absolute;
  inset: 0px;
  background-color: rgba(26, 21, 16, 0.72);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  text-align: center;
  max-width: 600px;
  margin: 0px auto;
  z-index: 2;
  box-sizing: border-box;
`;

const Eyebrow = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.26em;
  font-weight: 700;
  color: rgb(194, 164, 120);
  margin-bottom: 16px;
  margin-top: 0;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3.8rem);
  font-weight: 600;
  color: rgb(255, 255, 255);
  margin-bottom: 20px;
  margin-top: 0;
  line-height: 1.2;
`;

const Description = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.9rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 32px;
  margin-top: 0;
`;

const AvailabilityButton = styled.button`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  padding: 14px 32px;
  background-color: rgb(194, 164, 120);
  color: rgb(80, 43, 58);
  border: none;
  border-radius: 0px;
  cursor: pointer;
  text-transform: uppercase;
  display: inline-block;
  line-height: normal;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d6b788;
    color: rgb(80, 43, 58);
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
  }
`;

const CtaBodas = () => {
  const navigate = useNavigate();

  return (
    <Section id="cta-bodas">
      <BackgroundImage
        alt="Boda en Bodega Santa Catarina"
        src={bodaImg}
        onError={(e) => {
          e.currentTarget.src = '/common/eventos-cta.webp';
        }}
      />
      <DarkOverlay />
      <Content>
        <Eyebrow>BODAS EN SANTA CATARINA</Eyebrow>
        <Title>Tu boda entre viñedos</Title>
        <Description>
          Contamos con capacidad para hasta 200 invitados y un equipo dedicado exclusivamente a hacer que tu día sea perfecto.
        </Description>
        <AvailabilityButton type="button" onClick={() => navigate('/contacto')}>
          CONSULTAR DISPONIBILIDAD
        </AvailabilityButton>
      </Content>
    </Section>
  );
};

export default CtaBodas;
