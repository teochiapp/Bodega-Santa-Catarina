import { useState } from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors?.background || '#F2ECE4'};
  position: relative;
  box-sizing: border-box;
`;

/* ─── HERO BANNER CON FOTO Y TÍTULO ─── */
const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: clamp(420px, 48vh, 520px);
  background-image: url('/assets/contacto-hero.jpg');
  background-size: cover;
  background-position: center 40%;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;

  @media (max-width: 960px) {
    height: clamp(320px, 42vh, 400px);
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(25, 12, 18, 0.12) 0%,
    rgba(25, 12, 18, 0.3) 50%,
    rgba(25, 12, 18, 0.72) 100%
  );
  pointer-events: none;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  padding-bottom: clamp(2rem, 3.5vw, 3rem);
  box-sizing: border-box;

  @media (max-width: 960px) {
    padding-bottom: clamp(3.2rem, 8vw, 4.5rem);
  }

  h1.contact-hero-title {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: clamp(3.2rem, 5.5vw, 4.8rem);
    font-weight: 500;
    color: #FFFFFF;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);
  }
`;

/* ─── GRID PRINCIPAL DE CONTACTO ─── */
const GridContainer = styled.div`
  width: 100%;
  box-sizing: border-box;

  .contact-main-grid {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 clamp(1.5rem, 4vw, 3rem);
    display: grid;
    grid-template-columns: 1fr 480px;
    gap: clamp(2.5rem, 5vw, 5rem);
    align-items: start;
    box-sizing: border-box;

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  /* Columna derecha en desktop: Formulario flotante */
  .contact-form-column {
    grid-column: 2;
    grid-row: 1;
    margin-top: -240px;
    position: relative;
    z-index: 10;

    @media (max-width: 960px) {
      grid-column: 1;
      grid-row: 1;
      margin-top: -24px;
      width: 100%;
    }
  }

  /* Formulario flotante */
  .contact-floating-form {
    background-color: #FAF8F5;
    border-radius: 18px;
    box-shadow: 0 16px 40px rgba(80, 43, 58, 0.08), 0 2px 8px rgba(0, 0, 0, 0.03);
    padding: clamp(1.75rem, 3.5vw, 2.75rem);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .contact-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 1.15rem;

    label {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
      font-size: 0.84rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors?.primary || '#502B3A'};

      span {
        color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
        font-weight: 700;
        margin-left: 2px;
      }
    }

    input,
    textarea {
      width: 100%;
      background-color: #FFFFFF;
      border: 1px solid #DFD9CF;
      border-radius: 6px;
      padding: 0.8rem 1rem;
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
      font-size: 0.92rem;
      color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
      box-sizing: border-box;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &:focus {
        outline: none;
        border-color: #BFAB82;
        box-shadow: 0 0 0 3px rgba(191, 171, 130, 0.25);
      }
    }

    textarea {
      resize: vertical;
      min-height: 130px;
      line-height: 1.5;
    }
  }

  .contact-submit-button {
    margin-top: 0.75rem;
    width: 100%;
    background-color: #BFAB82;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    border: none;
    border-radius: 9999px;
    padding: 0.95rem 2rem;
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(191, 171, 130, 0.3);

    &:hover {
      background-color: #B29D72;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(191, 171, 130, 0.45);
    }

    &:active {
      transform: translateY(0);
    }
  }

  /* Columna izquierda en desktop: Cómo llegar y Redes */
  .contact-details-column {
    grid-column: 1;
    grid-row: 1;
    padding-top: 3.5rem;
    box-sizing: border-box;

    @media (max-width: 960px) {
      grid-column: 1;
      grid-row: 2;
      padding-top: 0.5rem;
    }
  }

  .contact-how-to {
    h2 {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
      font-size: clamp(2rem, 3vw, 2.4rem);
      font-weight: 600;
      color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
      margin: 0 0 1.5rem 0;
    }
  }

  .contact-direction-item {
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(80, 43, 58, 0.12);
    margin-bottom: 1.25rem;

    h3 {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
      font-size: 0.92rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
      margin: 0 0 0.45rem 0;
    }

    p {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
      font-size: 0.88rem;
      line-height: 1.65;
      color: #66555C;
      margin: 0;
    }
  }

  .contact-page-social {
    margin-top: 2.25rem;

    h2 {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
      font-size: clamp(1.8rem, 2.5vw, 2.2rem);
      font-weight: 600;
      color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
      margin: 0 0 1.25rem 0;
    }
  }

  .contact-social-links {
    display: flex;
    gap: 14px;
    align-items: center;
  }

  .contact-social-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors?.primary || '#502B3A'};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    background: transparent;
    transition: all 0.25s ease;
    text-decoration: none;

    svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      fill: none;
      transition: transform 0.2s ease;
    }

    svg path,
    svg .contact-social-icon-dot {
      fill: currentColor;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
      color: #FAF8F5;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(80, 43, 58, 0.2);
    }
  }
`;

const FeedbackMessage = styled.div`
  margin-top: 1.15rem;
  padding: 0.95rem 1.15rem;
  border-radius: 8px;
  background-color: rgba(56, 142, 60, 0.1);
  border: 1px solid rgba(56, 142, 60, 0.25);
  color: #2E7D32;
  font-size: 0.86rem;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  line-height: 1.55;
  text-align: center;
`;

const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subjectText = formData.asunto.trim() || `Contacto Bodega Santa Catarina - ${formData.nombre} ${formData.apellido}`;
    const bodyText = `Nombre: ${formData.nombre} ${formData.apellido}
Email: ${formData.email}
Asunto: ${formData.asunto}

Mensaje:
${formData.mensaje}`;

    const mailtoUrl = `mailto:info@bodegasantacatarina.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  return (
    <SectionWrapper>
      {/* HERO BANNER FOTOGRÁFICO */}
      <HeroSection>
        <HeroOverlay />
        <HeroInner>
          <h1 className="contact-hero-title">CONTACTO</h1>
        </HeroInner>
      </HeroSection>

      {/* GRID PRINCIPAL: FORMULARIO FLOTANTE Y DETALLES */}
      <GridContainer>
        <section className="contact-main-grid">
          {/* COLUMNA FORMULARIO */}
          <div className="contact-form-column">
            <form className="contact-floating-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Nombre <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  required
                  autoComplete="given-name"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange('nombre')}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-surname">
                  Apellido <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-surname"
                  required
                  autoComplete="family-name"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange('apellido')}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">
                  E-mail <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  required
                  autoComplete="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Asunto</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.asunto}
                  onChange={handleChange('asunto')}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Mensaje</label>
                <textarea
                  id="contact-message"
                  rows={6}
                  value={formData.mensaje}
                  onChange={handleChange('mensaje')}
                />
              </div>

              <button className="contact-submit-button" type="submit">
                Enviar
              </button>

              {isSubmitted && (
                <FeedbackMessage>
                  ✓ Tu mensaje ha sido preparado. Se abrirá tu aplicación de correo para enviar la consulta a <strong>info@bodegasantacatarina.com</strong>.
                </FeedbackMessage>
              )}
            </form>
          </div>

          {/* COLUMNA DETALLES: CÓMO LLEGAR Y REDES SOCIALES */}
          <div className="contact-details-column">
            <div className="contact-how-to">
              <h2>Cómo llegar</h2>
              <div className="contact-direction-item">
                <h3>En coche</h3>
                <p>Desde Palma: dirección Inca por la MA-13, salida Sencelles. 30 minutos desde el centro de Palma.</p>
              </div>
              <div className="contact-direction-item">
                <h3>Desde el aeropuerto</h3>
                <p>Aeropuerto de Palma de Mallorca (PMI) a 35 km. Recomendamos alquilar un vehículo.</p>
              </div>
            </div>

            <div className="contact-page-social">
              <h2>Redes sociales</h2>
              <div className="contact-social-links">
                <a
                  className="contact-social-icon"
                  href="https://www.instagram.com/bodegasantacatarina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="17.4" cy="6.7" r="1" className="contact-social-icon-dot" fill="currentColor" />
                  </svg>
                </a>
                <a
                  className="contact-social-icon"
                  href="https://www.facebook.com/Bodega-Santa-Catarina-101403018851927/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.24 0-1.62.77-1.62 1.56v1.9h2.76l-.44 2.91h-2.32V22C18.34 21.24 22 17.08 22 12.06Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </GridContainer>
    </SectionWrapper>
  );
};

export default FormularioContacto;
