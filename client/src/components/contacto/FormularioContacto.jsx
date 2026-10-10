import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.md};
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
  
  input, textarea {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-family: inherit;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormularioContacto = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simula reset visual a los 5 segundos
    setTimeout(() => {
      setSubmitted(false);
      e.target.reset();
    }, 5000);
  };

  return (
    <Section>
      <FormContainer>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Envíanos tu consulta</h2>
        
        <AnimatePresence>
          {submitted && (
            <SuccessMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
            </SuccessMessage>
          )}
        </AnimatePresence>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Nombre y Apellidos</label>
            <input type="text" required />
          </InputGroup>
          <InputGroup>
            <label>Teléfono</label>
            <input type="tel" />
          </InputGroup>
          <InputGroup>
            <label>Email</label>
            <input type="email" required />
          </InputGroup>
          <InputGroup>
            <label>Asunto</label>
            <input type="text" required />
          </InputGroup>
          <InputGroup>
            <label>Mensaje</label>
            <textarea rows="5" required></textarea>
          </InputGroup>
          <SubmitButton type="submit">Enviar mensaje</SubmitButton>
        </Form>
      </FormContainer>
    </Section>
  );
};

export default FormularioContacto;
