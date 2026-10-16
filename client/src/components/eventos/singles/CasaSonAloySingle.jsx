import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import sonAloyImg from '../../../imports/Santa_Cararina_229.jpg';

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

const FactsSection = styled.section`
  border: 1px solid rgb(224, 221, 213);
  background: rgb(244, 242, 235);
  margin-top: 20px;
  padding: clamp(3rem, 6vw, 4.5rem) 2rem;
  box-sizing: border-box;

  .son-aloy-facts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(2rem, 4vw, 3.5rem) 2rem;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .fact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  strong {
    display: block;
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 600;
    color: rgb(80, 43, 58);
    line-height: 1;
    margin-bottom: 8px;
  }

  span {
    display: block;
    font-family: 'Manrope', 'Raleway', sans-serif;
    font-size: 0.72rem;
    line-height: 1.45;
    color: rgb(80, 43, 58);
    letter-spacing: 0.04em;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.25rem;

    .son-aloy-facts-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .son-aloy-facts-grid {
      grid-template-columns: 1fr;
      gap: 1.75rem;
    }
  }
`;

const CasaSonAloySingle = ({ onBack }) => {
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
        / Casa Son Aloy
      </BreadcrumbBar>

      <SingleArticle className="event-space-standard event-single-space">
        <img
          className="event-space-standard-image"
          alt="Casa Son Aloy"
          src={sonAloyImg}
          onError={(e) => {
            e.currentTarget.src = '/assets/Santa_Cararina_229-CzSpZpJL.jpg';
          }}
        />
        <div className="event-space-standard-copy">
          <h2>Casa Son Aloy</h2>
          <p className="capacity">Hasta 40 personas (interior)</p>
          <p className="description">
            Casa mallorquina con carácter histórico y ambientes acogedores, ideal para celebraciones íntimas, reuniones privadas y encuentros exclusivos en Son Aloy.
          </p>
          <button
            type="button"
            className="budget-button"
            onClick={handleBudgetClick}
          >
            PIDE TU PRESUPUESTO
          </button>
        </div>
      </SingleArticle>

      <FactsSection className="son-aloy-facts">
        <div className="son-aloy-facts-grid">
          <div className="fact-item">
            <strong>40</strong>
            <span>hectáreas<br />de extensión</span>
          </div>
          <div className="fact-item">
            <strong>33</strong>
            <span>hectáreas<br />replantadas</span>
          </div>
          <div className="fact-item">
            <strong>4.166</strong>
            <span>plantas/ha<br />marco 2,4 x 1 m</span>
          </div>
          <div className="fact-item">
            <strong>125 m</strong>
            <span>sobre el nivel<br />del mar</span>
          </div>
          <div className="fact-item">
            <strong>450 mm</strong>
            <span>pluviometría<br />media anual</span>
          </div>
          <div className="fact-item">
            <strong>110</strong>
            <span>richter<br />portainjertos</span>
          </div>
        </div>
      </FactsSection>
    </Section>
  );
};

export default CasaSonAloySingle;
