import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3rem 1.25rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: clamp(2.2rem, 3.5vw, 3.5rem);
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const EspacioCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(80, 43, 58, 0.1);
    border-color: rgba(194, 164, 120, 0.6);
  }
`;

const Imagen = styled.div`
  height: 220px;
  background-color: #d9d9d9;
  background-image: ${(p) => (p.$bg ? `url(${p.$bg})` : 'none')};
  background-size: cover;
  background-position: center;
`;

const Info = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 10px 0;
  }

  p {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: 0.9rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 20px 0;
    flex: 1;
  }
`;

const BookButton = styled.button`
  margin-top: auto;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 10px 18px;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const ESPACIOS = [
  {
    id: 'casa-son-aloy',
    title: 'Casa Son Aloy',
    desc: 'Encanto rústico y señorial mallorquín. Espacio idílico rodeado de historia vinícola y bancales.',
    img: '/assets/finca-son-aloy-CERJ_NRj.jpg',
  },
  {
    id: 'sala-de-barricas',
    title: 'Sala de Barricas',
    desc: 'El corazón de nuestra bodega entre aromas a roble. Ambiente íntimo y solemne para banquetes únicos.',
    img: '/assets/Santa_Catarina_372.jpg',
  },
  {
    id: 'terrazas',
    title: 'Terrazas',
    desc: 'Vistas panorámicas hacia los viñedos y la Serra de Tramuntana. Perfectas para cócteles y veladas al atardecer.',
    img: '/assets/Santa_Cararina_217-1-BZzqf_YD.jpg',
  },
  {
    id: 'zona-gravilla',
    title: 'Zona Gravilla y Ajardinada',
    desc: 'Espacio diáfano al aire libre bajo los olivos, diseñado para ceremonias civiles y banquetes de gran aforo.',
    img: '/assets/Santa_Catarina_Vendimia_296-BNFQEO6C.jpg',
  },
  {
    id: 'porche-delantero',
    title: 'Porche Delantero y Caseta con Porche',
    desc: 'Espacios exteriores techados con sombra natural, brisa mediterránea y vistas directas a la finca.',
    img: '/assets/Santa_Cararina_045-9piNaR8O.jpg',
  },
  {
    id: 'sala-polivalente',
    title: 'Sala Polivalente',
    desc: 'Espacio climatizado y modulable, preparado con tecnología audiovisual para conferencias y celebraciones privadas.',
    img: '/assets/proximos-eventos-DXYwTRvi.jpg',
  },
  {
    id: 'la-clastra',
    title: 'La Clastra',
    desc: 'Tradicional patio mallorquín cerrado de piedra viva, con acústica privilegiada y un ambiente íntimo y protegido.',
    img: '/assets/Santa_Catarina_268-gAddmlwS.jpg',
  },
];

const EspaciosBodega = () => {
  const handleBook = () => {
    document.getElementById('formulario-eventos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section>
      <Title>Nuestros Espacios</Title>
      <Grid>
        {ESPACIOS.map((espacio) => (
          <EspacioCard
            key={espacio.id}
            id={espacio.id}
            style={{ scrollMarginTop: '110px' }}
          >
            <Imagen $bg={espacio.img} />
            <Info>
              <h3>{espacio.title}</h3>
              <p>{espacio.desc}</p>
              <BookButton onClick={handleBook}>Resérvalo</BookButton>
            </Info>
          </EspacioCard>
        ))}
      </Grid>
    </Section>
  );
};

export default EspaciosBodega;
