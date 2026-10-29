import styled from 'styled-components';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors?.background || '#F2ECE4'};
  border-top: 1px solid rgba(80, 43, 58, 0.14);
  border-bottom: 1px solid rgba(80, 43, 58, 0.14);
  margin-top: clamp(3.5rem, 5vw, 5rem);
  box-sizing: border-box;
`;

const Grid = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-sizing: border-box;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ColumnCard = styled.div`
  padding: clamp(2.5rem, 4vw, 3.25rem) 1.5rem;
  text-align: center;
  border-right: 1px solid rgba(80, 43, 58, 0.14);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 960px) {
    &:nth-child(2n) {
      border-right: none;
    }
    &:nth-child(1),
    &:nth-child(2) {
      border-bottom: 1px solid rgba(80, 43, 58, 0.14);
    }
  }

  @media (max-width: 560px) {
    border-right: none !important;
    border-bottom: 1px solid rgba(80, 43, 58, 0.14);
    padding: 2rem 1.25rem;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors?.secondary || '#BFAB82'};

  svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    transition: transform 0.25s ease;
  }

  ${ColumnCard}:hover & svg {
    transform: translateY(-2px);
  }
`;

const ColumnTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors?.secondary || '#BA9C74'};
  margin: 0 0 10px 0;
`;

const TextLine = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  line-height: 1.65;
  margin: 0;
`;

const InteractiveLink = styled.a`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  line-height: 1.65;
  margin: 0;
  display: block;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors?.secondary || '#BA9C74'};
    text-decoration: underline;
  }
`;

const InfoContacto = () => {
  return (
    <SectionWrapper>
      <Grid data-reveal-group="75" data-reveal-cols="4">
        {/* DIRECCIÓN */}
        <ColumnCard>
          <IconWrapper>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </IconWrapper>
          <ColumnTitle>DIRECCIÓN</ColumnTitle>
          <TextLine>Carretera Inca - Sencelles, Km 3</TextLine>
          <TextLine>07140 Sencelles (Mallorca) - España</TextLine>
        </ColumnCard>

        {/* TELÉFONO */}
        <ColumnCard>
          <IconWrapper>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.79 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.7 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 10.91a16 16 0 006.08 6.08l1.07-1.07a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 18.92z" />
            </svg>
          </IconWrapper>
          <ColumnTitle>TELÉFONO</ColumnTitle>
          <InteractiveLink href="tel:+34971137113">
            Eventos y Reservas: Tf. 971 137 113
          </InteractiveLink>
          <InteractiveLink href="tel:+34971137115">
            Administración y Comercial: Tf. 971 137 115
          </InteractiveLink>
        </ColumnCard>

        {/* EMAIL */}
        <ColumnCard>
          <IconWrapper>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </IconWrapper>
          <ColumnTitle>EMAIL</ColumnTitle>
          <InteractiveLink href="mailto:info@bodegasantacatarina.com">
            Info@bodegasantacatarina.com
          </InteractiveLink>
        </ColumnCard>

        {/* HORARIO */}
        <ColumnCard>
          <IconWrapper>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </IconWrapper>
          <ColumnTitle>HORARIO</ColumnTitle>
          <TextLine>Lunes a Viernes: abierto de 10:00 a 17:00 h.</TextLine>
        </ColumnCard>
      </Grid>
    </SectionWrapper>
  );
};

export default InfoContacto;
