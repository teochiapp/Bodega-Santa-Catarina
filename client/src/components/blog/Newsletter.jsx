import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Form = styled.form`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 4px 0 0 4px;
  font-family: inherit;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 4px;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  border-radius: 0 4px 4px 0;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  
  &:hover {
    background-color: #b5952f;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 4px;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Suscripción simulada enviada.');
  };

  return (
    <Section>
      <Container>
        <Title>Suscríbete a nuestra Newsletter</Title>
        <p>Entérate de las últimas historias, añadas y eventos exclusivos.</p>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Tu correo electrónico" required />
          <SubmitButton type="submit">Suscribirme</SubmitButton>
        </Form>
      </Container>
    </Section>
  );
};

export default Newsletter;
