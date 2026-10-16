import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import terrazasImg from '../../../imports/Santa_Catarina_189-1.jpg';

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

const BreadcrumbBar = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: rgb(194, 164, 120);
  margin: 0px 0px 1.75rem;
`;

const BackButton = styled.button`
  padding: 0px;
  border: 0px;
  background: transparent;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SingleArticle = styled.article`
  border: 1px solid rgb(224, 221, 213);
  background: rgb(244, 242, 235);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow: hidden;
  box-sizing: border-box;

  .event-space-standard-image {
    width: 50%;
    flex: 0 0 50%;
    aspect-ratio: 4 / 3;
    min-height: 320px;
    object-fit: cover;
    display: block;
  }

  .event-space-standard-copy {
    width: 50%;
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: clamp(2.5rem, 5vw, 4rem);
    box-sizing: border-box;
  }

  h2 {
    margin: 0px 0px 8px;
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: clamp(2rem, 3.5vw, 3.3rem);
    font-weight: 600;
    line-height: 1;
    color: rgb(80, 43, 58);
  }

  .capacity {
    margin: 0px 0px 18px;
    font-family: 'Manrope', 'Raleway', sans-serif;
    font-size: 0.86rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgb(194, 164, 120);
  }

  .description {
    margin: 0px;
    font-family: 'Manrope', 'Raleway', sans-serif;
    font-size: 0.88rem;
    line-height: 1.8;
    color: rgb(80, 43, 58);
  }

  .budget-button {
    margin-top: 24px;
    padding: 11px 22px;
    border: 1px solid rgb(80, 43, 58);
    border-radius: 0px;
    background: transparent;
    color: rgb(80, 43, 58);
    font-family: 'Manrope', 'Raleway', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 600;
    transition: all 0.25s ease;

    &:hover {
      background-color: rgb(80, 43, 58);
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(80, 43, 58, 0.2);
    }
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
      padding: 2rem 1.5rem;
    }
  }
`;

const SUB_SPACES = [
  {
    title: 'Terraza Panorámica',
    capacity: 'Hasta 200 personas',
    description: 'Las vistas más espectaculares de la finca. Perfecta para ceremonias al aire libre y cócteles al atardecer.',
    img: terrazasImg,
    fallback: '/assets/Santa_Catarina_189-1-Csn_lgkP.jpg',
  },
  {
    title: 'Terraza Tramuntana',
    capacity: '135 m²',
    description: 'Terraza privada con vistas abiertas a la sierra.',
    img: terrazasImg,
    fallback: '/assets/Santa_Catarina_189-1-Csn_lgkP.jpg',
  },
  {
    title: 'Terraza Techo de Cañizo',
    capacity: '75 m²',
    description: 'Terraza privada cubierta, con sombra y vistas a la finca.',
    img: terrazasImg,
    fallback: '/assets/Santa_Catarina_189-1-Csn_lgkP.jpg',
  },
];

const TerrazasSingle = ({ onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/eventos');
    }
  };

  const handleBudgetClick = () => {
    const cta = document.getElementById('cta-bodas');
    if (cta) {
      cta.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contacto');
    }
  };

  return (
    <Section id="espacios-eventos">
      <BreadcrumbBar>
        <BackButton type="button" onClick={handleBack}>
          Eventos y Bodas
        </BackButton>{' '}
        / Terrazas
      </BreadcrumbBar>

      <CardsList>
        {SUB_SPACES.map((sub, idx) => (
          <SingleArticle key={idx} className="event-space-standard event-single-space">
            <img
              className="event-space-standard-image"
              alt={sub.title}
              src={sub.img}
              onError={(e) => {
                if (sub.fallback && e.currentTarget.src !== sub.fallback) {
                  e.currentTarget.src = sub.fallback;
                }
              }}
            />
            <div className="event-space-standard-copy">
              <h2>{sub.title}</h2>
              <p className="capacity">{sub.capacity}</p>
              <p className="description">{sub.description}</p>
              <button
                type="button"
                className="budget-button"
                onClick={handleBudgetClick}
              >
                PIDE TU PRESUPUESTO
              </button>
            </div>
          </SingleArticle>
        ))}
      </CardsList>
    </Section>
  );
};

export default TerrazasSingle;
