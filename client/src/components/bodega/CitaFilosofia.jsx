import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Quote = styled.blockquote`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  color: ${({ theme }) => theme.colors.primary};
  font-style: italic;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.4;
  
  &::before, &::after {
    content: '"';
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CitaFilosofia = () => {
  return (
    <Section>
      <Quote>
        El buen vino nace en la viña, pero se hace eterno en la memoria de quienes lo comparten.
      </Quote>
    </Section>
  );
};

export default CitaFilosofia;
