import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(35, 18, 25, 0.72);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 3500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 3vw, 2.5rem);
  box-sizing: border-box;
  overflow-y: auto;
`;

const ModalDialog = styled(motion.div)`
  position: relative;
  background: #FAF8F5;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#E0DCD3'};
  width: 100%;
  max-width: 820px;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  padding: clamp(1.75rem, 4vw, 3rem);

  /* Scrollbar estético */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #F2ECE4;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 150ms ease, transform 150ms ease;
  z-index: 10;
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  }
`;

const VisuallyHiddenTitle = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const Inner = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const HeaderBox = styled.div`
  margin-bottom: 2rem;
  padding-right: 2.5rem; /* Margen para no chocar con botón cerrar */
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  text-transform: uppercase;
  margin: 0 0 10px 0;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0 0 12px 0;
  line-height: 1.15;
`;

const Intro = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.88;
  margin: 0;
  max-width: 680px;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid rgb(224, 221, 213);
  background: rgb(242, 236, 228);
  color: rgb(80, 43, 58);
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.88rem;
  box-sizing: border-box;
  outline: none;
  transition: border-color 150ms ease, background-color 150ms ease;

  &::placeholder {
    color: rgba(80, 43, 58, 0.45);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    background-color: #FFFFFF;
  }

  &:disabled,
  &[readonly] {
    cursor: default;
    opacity: 0.85;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  border: 1px solid rgb(224, 221, 213);
  background: rgb(242, 236, 228);
  color: rgb(80, 43, 58);
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.88rem;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%23502B3A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M1 1.5L6 6.5L11 1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 11px 7px;
  transition: border-color 150ms ease, background-color 150ms ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    background-color: #FFFFFF;
  }
`;

const Textarea = styled.textarea`
  grid-column: 1 / -1;
  width: 100%;
  padding: 14px;
  border: 1px solid rgb(224, 221, 213);
  background: rgb(242, 236, 228);
  color: rgb(80, 43, 58);
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.88rem;
  line-height: 1.6;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 150ms ease, background-color 150ms ease;

  &::placeholder {
    color: rgba(80, 43, 58, 0.45);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    background-color: #FFFFFF;
  }
`;

const PrivacyLabel = styled.label`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 6px 0 12px;
  cursor: pointer;
  user-select: none;

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    cursor: pointer;
  }

  span {
    opacity: 0.9;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  width: 100%;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  color: #FFFFFF;
  border: none;
  border-radius: 25px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 200ms ease, transform 150ms ease, box-shadow 200ms ease;
  box-shadow: 0 2px 8px rgba(194, 164, 120, 0.25);

  &:hover {
    background-color: #B09165;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(194, 164, 120, 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const SuccessAlert = styled(motion.div)`
  grid-column: 1 / -1;
  background-color: #388E3C;
  color: #FFFFFF;
  padding: 1rem 1.25rem;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.88rem;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 6px;
`;

const FormularioEventos = ({
  isOpen = false,
  onClose,
  defaultTipoEvento = 'Solicitud de espacio',
  selectedSpace = '',
  onSpaceChange,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: defaultTipoEvento,
    space: selectedSpace || '',
    date: '',
    guests: '',
    message: '',
    privacy: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sincronizar datos al abrir el modal o cambiar props
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        eventType: defaultTipoEvento || 'Solicitud de espacio',
        space: selectedSpace || '',
      }));
      setSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen, defaultTipoEvento, selectedSpace]);

  // Manejo de tecla Escape y bloqueo de scroll de la página
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'space' && onSpaceChange) {
      onSpaceChange(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío limpio y feedback de confirmación
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: defaultTipoEvento,
          space: '',
          date: '',
          guests: '',
          message: '',
          privacy: false,
        });
        if (onClose) {
          onClose();
        }
      }, 3500);
    }, 600);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          className="event-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <ModalDialog
            className="event-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              className="event-modal-close"
              type="button"
              aria-label="Cerrar formulario"
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </CloseButton>

            <VisuallyHiddenTitle id="event-modal-title" className="event-modal-title">
              Solicitud de información
            </VisuallyHiddenTitle>

            <Inner className="event-contact-inner">
              <HeaderBox>
                <Eyebrow className="event-eyebrow">SOLICITA INFORMACIÓN</Eyebrow>
                <Title className="event-form-title">Cuéntanos cómo imaginas tu evento</Title>
                <Intro className="event-form-intro">
                  Completa los datos y nuestro equipo se pondrá en contacto contigo para preparar una propuesta personalizada.
                </Intro>
              </HeaderBox>

              <StyledForm className="event-contact-form" onSubmit={handleSubmit}>
                <AnimatePresence>
                  {submitted && (
                    <SuccessAlert
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      ¡Gracias por contactarnos! Hemos recibido tu solicitud para{' '}
                      <strong>{formData.space || formData.eventType}</strong>. Nuestro equipo se pondrá en contacto contigo muy pronto.
                    </SuccessAlert>
                  )}
                </AnimatePresence>

                <Input
                  required
                  placeholder="Nombre"
                  aria-label="Nombre"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    padding: '14px',
                    border: '1px solid rgb(224, 221, 213)',
                    background: 'rgb(242, 236, 228)',
                    color: 'rgb(80, 43, 58)',
                    fontFamily: 'Manrope, Raleway, sans-serif',
                  }}
                />

                <Input
                  required
                  placeholder="Email"
                  aria-label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    padding: '14px',
                    border: '1px solid rgb(224, 221, 213)',
                    background: 'rgb(242, 236, 228)',
                    color: 'rgb(80, 43, 58)',
                    fontFamily: 'Manrope, Raleway, sans-serif',
                  }}
                />

                <Input
                  required
                  placeholder="Teléfono"
                  aria-label="Teléfono"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    padding: '14px',
                    border: '1px solid rgb(224, 221, 213)',
                    background: 'rgb(242, 236, 228)',
                    color: 'rgb(80, 43, 58)',
                    fontFamily: 'Manrope, Raleway, sans-serif',
                  }}
                />

                <Input
                  readOnly
                  aria-label="Tipo de evento"
                  type="text"
                  name="eventType"
                  value={formData.eventType}
                  title="Tipo de evento"
                  style={{
                    padding: '14px',
                    border: '1px solid rgb(224, 221, 213)',
                    background: 'rgb(242, 236, 228)',
                    color: 'rgb(80, 43, 58)',
                    fontFamily: 'Manrope, Raleway, sans-serif',
                  }}
                />

                <Select
                  required
                  name="space"
                  aria-label="Espacio de interés"
                  value={formData.space}
                  onChange={handleChange}
                  style={{
                    padding: '14px',
                    border: '1px solid rgb(224, 221, 213)',
                    background: 'rgb(242, 236, 228)',
                    color: 'rgb(80, 43, 58)',
                    fontFamily: 'Manrope, Raleway, sans-serif',
                  }}
                >
                  <option value="">Espacio de interés</option>
                  <option value="Casa Son Aloy">Casa Son Aloy</option>
                  <option value="Bodega">Bodega</option>
                  <option value="Clastra Exterior">Clastra Exterior</option>
                  <option value="Caseta">Caseta</option>
                </Select>

                <Input
                  aria-label="Fecha aproximada"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{
                    padding: '14px',
                    border: '1px solid rgb(224, 221, 213)',
                    background: 'rgb(242, 236, 228)',
                    color: 'rgb(80, 43, 58)',
                    fontFamily: 'Manrope, Raleway, sans-serif',
                  }}
                />

                <Input
                  required
                  min="1"
                  placeholder="Número de personas"
                  aria-label="Número de personas"
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  style={{
                    padding: '14px',
                    border: '1px solid rgb(224, 221, 213)',
                    background: 'rgb(242, 236, 228)',
                    color: 'rgb(80, 43, 58)',
                    fontFamily: 'Manrope, Raleway, sans-serif',
                  }}
                />

                <Textarea
                  name="message"
                  rows={5}
                  placeholder="Mensaje"
                  aria-label="Mensaje"
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    padding: '14px',
                    border: '1px solid rgb(224, 221, 213)',
                    background: 'rgb(242, 236, 228)',
                    color: 'rgb(80, 43, 58)',
                    fontFamily: 'Manrope, Raleway, sans-serif',
                    gridColumn: '1 / -1',
                    resize: 'vertical',
                  }}
                />

                <PrivacyLabel className="event-privacy">
                  <input
                    required
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                  />
                  <span>He leído y acepto la política de privacidad.</span>
                </PrivacyLabel>

                <SubmitButton className="event-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'ENVIANDO...' : 'SOLICITAR INFORMACIÓN'}
                </SubmitButton>
              </StyledForm>
            </Inner>
          </ModalDialog>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default FormularioEventos;
