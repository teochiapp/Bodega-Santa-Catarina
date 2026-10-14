import { useState } from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  background-color: rgb(244, 242, 235);
  padding: 4rem 2rem;
  text-align: center;
  border-top: 1px solid rgb(224, 221, 213);
  box-sizing: border-box;
`;

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: rgb(194, 164, 120);
  margin-bottom: 14px;
  text-transform: uppercase;
`;

const Title = styled.h3`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: clamp(1.6rem, 2.5vw, 2.5rem);
  font-weight: 600;
  color: rgb(80, 43, 58);
  margin-bottom: 16px;
  line-height: 1.2;
`;

const Description = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.9rem;
  color: rgb(80, 43, 58);
  margin-bottom: 28px;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  gap: 4px;
  max-width: 420px;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Input = styled.input`
  flex: 1 1 0%;
  padding: 0.85rem 1rem;
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.875rem;
  background-color: rgb(242, 236, 228);
  border: 1px solid rgb(224, 221, 213);
  border-radius: 8px;
  color: rgb(80, 43, 58);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: rgba(80, 43, 58, 0.45);
  }

  &:focus {
    border-color: rgb(80, 43, 58);
    box-shadow: 0 0 0 2px rgba(80, 43, 58, 0.12);
  }
`;

const SubmitButton = styled.button`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 0.85rem 1.5rem;
  background-color: rgb(80, 43, 58);
  color: rgb(242, 236, 228);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background-color: #3b1e2a;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessMsg = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.85rem;
  color: rgb(80, 43, 58);
  font-weight: 600;
  margin-top: 14px;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setEnviado(true);
    setTimeout(() => {
      setEmail('');
      setEnviado(false);
    }, 4000);
  };

  return (
    <SectionWrapper>
      <Container>
        <Eyebrow>NEWSLETTER</Eyebrow>
        <Title>Historias de la bodega en tu bandeja</Title>
        <Description>
          Vendimias, maridajes, eventos y las historias que nacen entre viñedos.
        </Description>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="tu@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton type="submit">SUSCRIBIRSE</SubmitButton>
        </Form>
        {enviado && (
          <SuccessMsg>
            ✓ ¡Gracias por suscribirte a nuestra newsletter!
          </SuccessMsg>
        )}
      </Container>
    </SectionWrapper>
  );
};

export default Newsletter;
