import styled from 'styled-components';

const Section = styled.section`
  background: rgb(244, 242, 235);
  padding: clamp(3rem, 6vw, 5rem) 2rem;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    padding: 3rem 1.25rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0px auto;
  display: grid;
  gap: 14px;
`;

const AccordionItem = styled.details`
  background: rgb(242, 236, 228);
  border: 1px solid rgb(224, 221, 213);
  padding: 1.25rem 1.5rem;
  transition: all 0.3s ease;

  &[open] {
    box-shadow: 0 4px 16px rgba(80, 43, 58, 0.04);
  }

  &[open] summary .toggle-icon {
    transform: rotate(45deg);
  }
`;

const AccordionSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  list-style: none;
  user-select: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    outline-offset: 4px;
  }
`;

const AccordionTitle = styled.span`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
`;

const ToggleIcon = styled.span`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 1;
  display: inline-block;
  transition: transform 0.25s ease;
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const ArticleCard = styled.article`
  border-top: 1px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  padding: 1rem 0px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ArticleHeading = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0px;
  font-weight: 500;
  line-height: 1.3;
`;

const Proximamente = () => {
  return (
    <Section id="proximamente">
      <Container>
        <AccordionItem open>
          <AccordionSummary>
            <AccordionTitle>Próximamente en Son Aloy</AccordionTitle>
            <ToggleIcon className="toggle-icon">+</ToggleIcon>
          </AccordionSummary>
          <ArticlesGrid>
            <ArticleCard>
              <ArticleHeading>Presentaciones y ferias</ArticleHeading>
            </ArticleCard>
            <ArticleCard>
              <ArticleHeading>Mercado de Navidad</ArticleHeading>
            </ArticleCard>
            <ArticleCard>
              <ArticleHeading>Conciertos al atardecer</ArticleHeading>
            </ArticleCard>
          </ArticlesGrid>
        </AccordionItem>

        <AccordionItem>
          <AccordionSummary>
            <AccordionTitle>Experiencias</AccordionTitle>
            <ToggleIcon className="toggle-icon">+</ToggleIcon>
          </AccordionSummary>
          <ArticlesGrid>
            <ArticleCard>
              <ArticleHeading>Cenas maridaje</ArticleHeading>
            </ArticleCard>
            <ArticleCard>
              <ArticleHeading>Tardes de viñedos</ArticleHeading>
            </ArticleCard>
            <ArticleCard>
              <ArticleHeading>Bonos de regalo para nuevas experiencias</ArticleHeading>
            </ArticleCard>
          </ArticlesGrid>
        </AccordionItem>
      </Container>
    </Section>
  );
};

export default Proximamente;
