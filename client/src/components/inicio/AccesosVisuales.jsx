import styled from 'styled-components';
import { ScrollLink } from '../common/ScrollToTop';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background || 'rgb(242, 236, 228)'};
  overflow: hidden;
`;

const SectionContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
  display: block;
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.22) 55%,
    rgba(0, 0, 0, 0.04) 100%
  );
  transition: background 300ms ease-out;
  pointer-events: none;
`;

const ContentBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.75rem;
  z-index: 2;
  text-align: left;
`;

const CardTitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  margin: 0 0 4px 0;
`;

const CardSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.8rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.78);
  margin: 0 0 20px 0;
`;

const ArrowWrapper = styled.div`
  transform: translateX(0);
  transition: transform 250ms ease-out;
  display: inline-block;
`;

const ArrowCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid rgb(203, 160, 82);
  background-color: transparent;
  color: rgb(203, 160, 82);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 250ms ease-out, color 250ms ease-out, border-color 250ms ease-out;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CardLink = styled(ScrollLink)`
  position: relative;
  flex: 1 1 0%;
  min-width: 0;
  min-height: 460px;
  overflow: hidden;
  display: block;
  cursor: pointer;
  border: none;
  padding: 0;
  text-decoration: none;

  @media (max-width: 992px) {
    min-height: 380px;
  }

  @media (max-width: 576px) {
    min-height: 320px;
  }

  &:hover {
    ${CardImage} {
      transform: scale(1.06);
    }

    ${GradientOverlay} {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.82) 0%,
        rgba(0, 0, 0, 0.3) 55%,
        rgba(0, 0, 0, 0.08) 100%
      );
    }

    ${ArrowWrapper} {
      transform: translateX(6px);
    }

    ${ArrowCircle} {
      background-color: rgb(203, 160, 82);
      color: #ffffff;
      border-color: rgb(203, 160, 82);
    }
  }
`;

const ACCESOS = [
  {
    id: 'enoturismo',
    title: 'ENOTURISMO',
    subtitle: 'Vive una experiencia única entre viñedos.',
    image: '/inicio/enoturismo-card.webp',
    path: '/enoturismo',
    ariaLabel: 'Ir a ENOTURISMO',
  },
  {
    id: 'vinos',
    title: 'NUESTROS VINOS',
    subtitle: 'La esencia de Mallorca en cada copa.',
    image: '/inicio/nuestros-vinos-card.webp',
    path: '/vinos',
    ariaLabel: 'Ir a NUESTROS VINOS',
  },
  {
    id: 'eventos',
    title: 'EVENTOS Y BODAS',
    subtitle: 'Momentos inolvidables en un entorno mágico.',
    image: '/inicio/eventos-y-bodas-card.webp',
    path: '/eventos',
    ariaLabel: 'Ir a EVENTOS Y BODAS',
  },
  {
    id: 'tienda',
    title: 'TIENDA ONLINE',
    subtitle: 'Llévate Santa Catarina a casa.',
    image: '/inicio/tienda-fisica-card.webp',
    path: '/tienda',
    ariaLabel: 'Ir a TIENDA ONLINE',
  },
];

const AccesosVisuales = () => {
  return (
    <SectionWrapper>
      <SectionContainer>
        {ACCESOS.map((acceso) => (
          <CardLink
            key={acceso.id}
            to={acceso.path}
            aria-label={acceso.ariaLabel}
          >
            <ImageWrapper>
              <CardImage
                src={acceso.image}
                alt={acceso.title}
                loading="lazy"
              />
            </ImageWrapper>

            <GradientOverlay />

            <ContentBox>
              <CardTitle>{acceso.title}</CardTitle>
              <CardSubtitle>{acceso.subtitle}</CardSubtitle>
              <ArrowWrapper>
                <ArrowCircle aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ArrowCircle>
              </ArrowWrapper>
            </ContentBox>
          </CardLink>
        ))}
      </SectionContainer>
    </SectionWrapper>
  );
};

export default AccesosVisuales;
