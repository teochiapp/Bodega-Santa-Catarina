import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &.full-width {
    grid-column: 1 / -1;
  }
  
  label {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
  
  input, select, textarea {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-family: inherit;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  margin-top: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FormularioEventos = () => {
  return (
    <Section id="formulario-eventos">
      <FormContainer>
        <Title>Solicitud de Evento</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <label>Nombre completo / Empresa</label>
            <input type="text" required />
          </InputGroup>
          <InputGroup>
            <label>Email de contacto</label>
            <input type="email" required />
          </InputGroup>
          <InputGroup>
            <label>Tipo de evento</label>
            <select required>
              <option value="">Seleccione...</option>
              <option value="corporativo">Corporativo / Empresa</option>
              <option value="privado">Celebración Privada</option>
              <option value="boda">Boda</option>
            </select>
          </InputGroup>
          <InputGroup>
            <label>Número estimado de invitados</label>
            <input type="number" min="10" required />
          </InputGroup>
          <InputGroup>
            <label>Fecha estimada</label>
            <input type="date" required />
          </InputGroup>
          <InputGroup>
            <label>Flexibilidad de fechas</label>
            <select>
              <option value="fija">Fecha fija</option>
              <option value="flexible">+/- 3 días</option>
              <option value="mes">Cualquier día del mes</option>
            </select>
          </InputGroup>
          <InputGroup className="full-width">
            <label>Servicios necesarios (Catering, audiovisuales...)</label>
            <textarea rows="4"></textarea>
          </InputGroup>
          <InputGroup className="full-width">
            <label>Comentarios adicionales / Necesidades especiales</label>
            <textarea rows="4"></textarea>
          </InputGroup>
          
          <SubmitButton type="submit">Enviar solicitud</SubmitButton>
        </Form>
      </FormContainer>
    </Section>
  );
};

export default FormularioEventos;
