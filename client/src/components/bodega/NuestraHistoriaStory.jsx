import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  width: 100%;
  background-color: rgb(244, 242, 235);
  box-sizing: border-box;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  width: 100%;
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 520px;
  position: relative;
  overflow: hidden;

  @media (max-width: 960px) {
    min-height: 380px;
    height: 420px;
  }

  @media (max-width: 576px) {
    min-height: 280px;
    height: 320px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

const CopyContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5.5rem);
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 18px 0;
`;

const DisplayTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.4rem, 3.8vw, 4.1rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 20px 0;
`;

const Intro = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.15rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.9;
  margin: 0 0 36px 0;
  line-height: 1.5;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const DetailMarker = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  background-color: transparent;
  margin-top: 8px;
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimelineYear = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.35rem;
  font-weight: 600;
  font-style: italic;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  margin: 0 0 4px 0;
  line-height: 1.1;
`;

const TimelineTitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 6px 0;
  line-height: 1.35;
`;

const TimelineDescription = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.86rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0;
`;

const TIMELINE_DATA = [
  {
    year: 'Años 80',
    title: 'Stellan Lundqvist, de Suecia, se traslada a Mallorca',
    description:
      'Acompañado de su familia para emprender un ambicioso proyecto en el mundo del vino. Destacando por su innovadora elaboración de vinos basados en variedades francesas.',
  },
  {
    year: '2002',
    title: 'Pausa de la vinificación propia',
    description:
      'La familia pausó la vinificación y arrendó sus viñedos a otros cellers locales.',
  },
  {
    year: '2012',
    title: 'Un legado que renace',
    description:
      'El fallecimiento de Stellan marcó un punto de inflexión en la trayectoria de Santa Catarina: sus hijos decidieron honrar su sueño retomando las riendas del proyecto.',
  },
  {
    year: '2016',
    title: 'Nuevo proyecto enológico',
    description:
      'Este renacimiento tomó forma con un proyecto enológico renovado.',
  },
];

const NuestraHistoriaStory = () => {
  return (
    <Section className="bodega-story-section">
      <Grid>
        <ImageWrapper
          className="bodega-story-image"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            alt="Vendimia y selección de uva en Son Aloy"
            src="/assets/nuestra-historia-identidad-C4Lo90Eu.jpg"
            loading="lazy"
          />
        </ImageWrapper>

        <CopyContainer
          className="bodega-story-copy"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow className="bodega-eyebrow">
            DE UN PROYECTO PIONERO A UNA NUEVA IDENTIDAD
          </Eyebrow>

          <DisplayTitle className="bodega-display-title">
            Una historia que vuelve a empezar
          </DisplayTitle>

          <Intro className="bodega-intro">
            <em>De un proyecto pionero a una nueva identidad profundamente mallorquina.</em>
          </Intro>

          <Timeline className="bodega-timeline">
            {TIMELINE_DATA.map((item, idx) => (
              <TimelineItem key={idx} className="bodega-timeline-item">
                <DetailMarker className="bodega-detail-marker" aria-hidden="true" />
                <TimelineContent>
                  <TimelineYear className="bodega-timeline-year">
                    {item.year}
                  </TimelineYear>
                  <TimelineTitle className="bodega-timeline-title">
                    {item.title}
                  </TimelineTitle>
                  <TimelineDescription className="bodega-timeline-description">
                    {item.description}
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CopyContainer>
      </Grid>
    </Section>
  );
};

export default NuestraHistoriaStory;
