import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Import images from /src/imports
import sonAloyImg from '../../imports/Santa_Cararina_229.jpg';
import barricasImg from '../../imports/Santa_Cararina_390-3.jpg';
import terrazasImg from '../../imports/Santa_Catarina_189-1.jpg';
import ajardinadaImg from '../../imports/eventos-zona-ajardinada.jpg';
import porcheImg from '../../imports/IMG_6519-4.jpeg';
import polivalenteImg from '../../imports/eventos-sala-polivalente.jpg';
import clastraImg from '../../imports/la-clastra.jpeg';

const Section = styled.section`
  max-width: 1180px;
  margin: 0px auto;
  padding: clamp(4rem, 7vw, 6rem) 2rem;
  scroll-margin-top: 96px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    padding: 3rem 1.25rem;
  }
`;

const Kicker = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: rgb(194, 164, 120);
  margin: 0px 0px 16px;
  text-transform: uppercase;
`;

const Heading = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: clamp(2rem, 3.5vw, 4.3rem);
  font-weight: 600;
  color: rgb(80, 43, 58);
  margin: 0px 0px 3rem;
  line-height: 1.1;

  @media (max-width: 576px) {
    margin-bottom: 2.2rem;
  }
`;

const Intro = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.92rem;
  line-height: 1.8;
  color: rgb(80, 43, 58);
  max-width: 820px;
  margin: -2rem 0px 2.5rem;

  @media (max-width: 576px) {
    margin-top: -1.5rem;
    margin-bottom: 2rem;
    font-size: 0.88rem;
  }
`;

const ListContainer = styled.div`
  max-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SpaceButton = styled.button`
  width: 100%;
  padding: 0px;
  border: 1px solid rgb(224, 221, 213);
  background: rgb(244, 242, 235);
  color: rgb(80, 43, 58);
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-radius: 0px;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.25s ease;

  &:hover {
    background: #FAF8F5;
    border-color: rgb(194, 164, 120);
    box-shadow: 0 4px 18px rgba(80, 43, 58, 0.08);
  }

  .event-space-standard-image {
    width: 50%;
    flex: 0 0 50%;
    aspect-ratio: 4 / 3;
    min-height: 280px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover .event-space-standard-image {
    transform: scale(1.02);
  }

  .event-space-standard-copy {
    width: 50%;
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: clamp(2rem, 4vw, 3.5rem);
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .event-space-standard-image {
      width: 100%;
      flex: none;
      aspect-ratio: 16 / 10;
      min-height: auto;
    }

    .event-space-standard-copy {
      width: 100%;
      flex: none;
      padding: 1.75rem 1.25rem;
    }
  }
`;

const TitleSpan = styled.span`
  display: block;
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: clamp(1.6rem, 2.3vw, 2.2rem);
  font-weight: 500;
  line-height: 1.15;
  color: rgb(80, 43, 58);
`;

const DescSpan = styled.span`
  display: block;
  margin-top: 12px;
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.82rem;
  line-height: 1.6;
  color: rgb(80, 43, 58);
  max-width: 360px;
`;

const ESPACIOS = [
  {
    id: 'casa-son-aloy',
    title: 'Casa Son Aloy',
    desc: 'Casa mallorquina con carácter histórico para celebraciones íntimas y encuentros exclusivos.',
    img: sonAloyImg,
    fallback: '/assets/Santa_Cararina_229-CzSpZpJL.jpg',
  },
  {
    id: 'sala-de-barricas',
    title: 'Sala de Barricas',
    desc: 'Rodeada de barricas de roble francés.',
    img: barricasImg,
    fallback: '/assets/Santa_Cararina_390-3-RBJCEfHL.jpg',
  },
  {
    id: 'terrazas',
    title: 'Terrazas',
    desc: 'Vistas al viñedo y a la Serra de Tramuntana.',
    img: terrazasImg,
    fallback: '/assets/Santa_Catarina_189-1-Csn_lgkP.jpg',
  },
  {
    id: 'zona-gravilla',
    title: 'Zona Gravilla y Ajardinada',
    desc: 'Recepciones y cócteles entre viñedos y árboles.',
    img: ajardinadaImg,
    fallback: '/assets/eventos-zona-ajardinada-BxWDX93V.jpg',
  },
  {
    id: 'porche-delantero',
    title: 'Porche Delantero y Caseta con Porche',
    desc: 'Dos espacios exclusivos con acceso directo a la casa mallorquina.',
    img: porcheImg,
    fallback: '/assets/IMG_6519-4-CzhAqZpF.jpeg',
  },
  {
    id: 'sala-polivalente',
    title: 'Sala Polivalente',
    desc: 'Climatizada, con vistas a la Tramuntana.',
    img: polivalenteImg,
    fallback: '/assets/eventos-sala-polivalente-DX0OHfZ8.jpg',
  },
  {
    id: 'la-clastra',
    title: 'La Clastra',
    desc: 'Espacio al aire libre entre la casa y la bodega.',
    img: clastraImg,
    fallback: '/assets/la-clastra-CL6xFguL.jpeg',
  },
];

const EspaciosBodega = ({ onSelectEspacio }) => {
  const navigate = useNavigate();

  const handleClickEspacio = (espacio) => {
    if (onSelectEspacio) {
      onSelectEspacio(espacio.id);
    } else {
      navigate(`/eventos/${espacio.id}`);
    }
  };

  return (
    <Section id="espacios-eventos">
      <Kicker>NUESTROS ESPACIOS</Kicker>
      <Heading>Elige tu espacio ideal</Heading>
      <Intro>
        Espacios interiores y exteriores para bodas, celebraciones, encuentros profesionales y jornadas de ocio, donde la tradición y la cultura del vino crean experiencias inolvidables.
      </Intro>
      <ListContainer>
        {ESPACIOS.map((espacio) => (
          <SpaceButton
            key={espacio.id}
            id={espacio.id}
            type="button"
            className="event-space-standard event-category-row"
            style={{ scrollMarginTop: '96px' }}
            onClick={() => handleClickEspacio(espacio)}
            aria-label={`Ver detalles de ${espacio.title}`}
          >
            <img
              className="event-space-standard-image"
              alt=""
              src={espacio.img}
              onError={(e) => {
                if (espacio.fallback && e.currentTarget.src !== espacio.fallback) {
                  e.currentTarget.src = espacio.fallback;
                }
              }}
            />
            <span className="event-space-standard-copy">
              <TitleSpan>{espacio.title}</TitleSpan>
              <DescSpan>{espacio.desc}</DescSpan>
            </span>
          </SpaceButton>
        ))}
      </ListContainer>
    </Section>
  );
};

export default EspaciosBodega;
