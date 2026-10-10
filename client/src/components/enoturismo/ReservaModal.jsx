import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 8px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  
  label {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }
  
  input, select, textarea {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-family: inherit;
  }
`;

const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  margin-top: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    background-color: #b5952f;
  }
`;

const ReservaModal = ({ isOpen, onClose, selectedExperience }) => {
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          
          {step === 1 && (
            <>
              <Title>Reservar: {selectedExperience?.title}</Title>
              <Form onSubmit={handleNext}>
                <InputGroup>
                  <label>Fecha y Horario</label>
                  <input type="datetime-local" required />
                </InputGroup>
                <InputGroup>
                  <label>Número de asistentes</label>
                  <input type="number" min="1" defaultValue="2" required />
                </InputGroup>
                <InputGroup>
                  <label>Idioma</label>
                  <select required>
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="de">Alemán</option>
                  </select>
                </InputGroup>
                <PrimaryButton type="submit">Continuar a datos personales</PrimaryButton>
              </Form>
            </>
          )}

          {step === 2 && (
            <>
              <Title>Tus datos</Title>
              <Form onSubmit={handleNext}>
                <InputGroup>
                  <label>Nombre completo</label>
                  <input type="text" required />
                </InputGroup>
                <InputGroup>
                  <label>Email</label>
                  <input type="email" required />
                </InputGroup>
                <InputGroup>
                  <label>Teléfono</label>
                  <input type="tel" required />
                </InputGroup>
                <PrimaryButton type="submit">Ir al pago (Simulado)</PrimaryButton>
              </Form>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <Title>¡Reserva Confirmada!</Title>
              <p>Se ha enviado un email y SMS de confirmación con los detalles de tu experiencia.</p>
              <PrimaryButton onClick={handleClose}>Cerrar</PrimaryButton>
            </div>
          )}
        </ModalContainer>
      </Overlay>
    </AnimatePresence>
  );
};

export default ReservaModal;
