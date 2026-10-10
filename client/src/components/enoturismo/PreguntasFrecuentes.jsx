import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  max-width: 800px;
  margin: 0 auto;
`;

const FaqItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  
  &:hover {
    background-color: #f1ebd9;
  }
`;

const Answer = styled(motion.div)`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textLight};
`;

const AnswerContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const PreguntasFrecuentes = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: '¿Es necesario reservar con antelación?', a: 'Sí, todas nuestras experiencias requieren reserva previa para poder garantizar la disponibilidad y un servicio de calidad.' },
    { q: '¿Pueden acceder menores de edad?', a: 'Los menores son bienvenidos a la bodega. Disponemos de mostos y opciones sin alcohol, así como precios reducidos para ellos.' },
    { q: '¿Cuál es la política de cancelaciones?', a: 'Se permite cancelar o modificar la reserva sin coste hasta 48 horas antes de la experiencia. Posterior a ese plazo no se reembolsará el importe.' },
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Section>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Preguntas frecuentes</h2>
      {faqs.map((faq, idx) => (
        <FaqItem key={idx}>
          <Question onClick={() => toggle(idx)}>
            {faq.q}
            <span>{openIndex === idx ? '−' : '+'}</span>
          </Question>
          <AnimatePresence>
            {openIndex === idx && (
              <Answer
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnswerContent>{faq.a}</AnswerContent>
              </Answer>
            )}
          </AnimatePresence>
        </FaqItem>
      ))}
    </Section>
  );
};

export default PreguntasFrecuentes;
