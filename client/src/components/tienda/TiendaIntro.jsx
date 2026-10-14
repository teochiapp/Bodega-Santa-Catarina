import styled from 'styled-components';

const IntroSection = styled.section`
  background-color: #F2ECE4;
  padding: clamp(3.5rem, 6vw, 6rem) 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const IntroContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 42% 1fr;
  gap: clamp(2.5rem, 5vw, 5.5rem);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Eyebrow = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin: 0 0 16px 0;
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: clamp(2.3rem, 4vw, 3.7rem);
  font-weight: 400;
  line-height: 1.08;
  color: rgb(80, 43, 58);
  margin: 0;
  max-width: 460px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.92rem;
  line-height: 1.75;
  color: rgb(80, 43, 58);
  margin: 0 0 2rem 0;
  max-width: 680px;
`;

const DefinitionList = styled.dl`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const DefinitionRow = styled.div`
  border-top: 1px solid rgba(203, 160, 82, 0.4);
  padding: 1.15rem 0;
  display: flex;
  align-items: baseline;
  gap: 2.5rem;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 0.35rem;
    padding: 1rem 0;
  }
`;

const DefinitionTerm = styled.dt`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgb(194, 164, 120);
  text-transform: uppercase;
  width: 120px;
  flex-shrink: 0;
  margin: 0;
`;

const DefinitionDesc = styled.dd`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.84rem;
  color: rgb(80, 43, 58);
  line-height: 1.6;
  margin: 0;
`;

const TiendaIntro = () => {
  return (
    <IntroSection className="physical-store-intro">
      <IntroContainer>
        <LeftColumn>
          <Eyebrow className="physical-store-eyebrow">BODEGA SANTA CATARINA</Eyebrow>
          <Title>Un rincón de Mallorca para llevarte a casa</Title>
        </LeftColumn>

        <RightColumn>
          <Description>
            Visita nuestra tienda en la finca Son Aloy y descubre los vinos de Santa Catarina junto a una selección cuidada de productos artesanales y gastronómicos de Mallorca.
          </Description>

          <DefinitionList>
            <DefinitionRow>
              <DefinitionTerm>Ubicación</DefinitionTerm>
              <DefinitionDesc>Finca Son Aloy, carretera Inca–Sencelles, Km 3</DefinitionDesc>
            </DefinitionRow>

            <DefinitionRow>
              <DefinitionTerm>Visita</DefinitionTerm>
              <DefinitionDesc>Consulta disponibilidad y horarios antes de venir</DefinitionDesc>
            </DefinitionRow>
          </DefinitionList>
        </RightColumn>
      </IntroContainer>
    </IntroSection>
  );
};

export default TiendaIntro;
