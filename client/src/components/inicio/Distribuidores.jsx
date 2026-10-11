import styled from 'styled-components';
import { ScrollLink } from '../common/ScrollToTop';

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  overflow: hidden;
  min-height: 440px;
  display: flex;
  align-items: center;
`;

const BannerImage = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 68%;
  max-width: 1020px;
  height: 100%;
  object-fit: cover;
  object-position: right center;
  transition: transform 0.6s ease;

  @media (max-width: 900px) {
    width: 100%;
    opacity: 0.35;
    object-position: center right;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgb(80, 43, 58) 0%,
    rgb(80, 43, 58) 32%,
    rgba(80, 43, 58, 0.9) 48%,
    rgba(80, 43, 58, 0.3) 72%,
    rgba(80, 43, 58, 0) 100%
  );
  pointer-events: none;

  @media (max-width: 900px) {
    background: linear-gradient(
      to right,
      rgb(80, 43, 58) 0%,
      rgba(80, 43, 58, 0.92) 50%,
      rgba(80, 43, 58, 0.8) 100%
    );
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 2rem;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 60px 1.5rem;
  }
`;

const Content = styled.div`
  max-width: 680px;
  text-align: left;
`;

const Kicker = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 600;
  line-height: 1.05;
  color: rgb(242, 236, 228);
  margin-bottom: 18px;
`;

const TextBlock = styled.div`
  max-width: 680px;

  p {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: 0.88rem;
    line-height: 1.8;
    color: rgba(242, 236, 228, 0.72);
    margin: 0;

    &:first-child {
      margin-bottom: 6px;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 28px;
`;

const ActionButton = styled(ScrollLink)`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgb(242, 236, 228);
  background: transparent;
  border: 1px solid rgb(194, 164, 120);
  padding: 14px 24px;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s ease;

  &:hover {
    background: rgb(194, 164, 120);
    color: rgb(80, 43, 58);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  }
`;

const Distribuidores = () => {
  return (
    <SectionWrapper>
      <BannerImage
        src="/assets/distribuidores-banner.jpg"
        alt="Red de distribuidores en Mallorca Bodega Santa Catarina"
        loading="lazy"
      />
      <GradientOverlay />

      <Container>
        <Content>
          <Kicker>DISTRIBUIDORES</Kicker>
          <Title>Nuestra red, más cerca de ti</Title>
          <TextBlock>
            <p>Estamos preparando el directorio de distribuidores de Santa Catarina.</p>
            <p>Publicaremos aquí los puntos de venta en cuanto estén disponibles.</p>
          </TextBlock>
          <ButtonWrapper>
            <ActionButton to="/donde-comprar">
              VER DISTRIBUIDORES
            </ActionButton>
          </ButtonWrapper>
        </Content>
      </Container>
    </SectionWrapper>
  );
};

export default Distribuidores;
