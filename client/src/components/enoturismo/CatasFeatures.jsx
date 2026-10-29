import styled from 'styled-components';

const Wrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 0 3rem;
`;

const Bar = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: #f4f2eb;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 1.5rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  color: ${({ theme }) => theme.colors.primary};

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    & + & {
      border-left: 0;
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  strong { display: block; font-size: 0.85rem; margin-bottom: 4px; }
  small { font-size: 0.72rem; line-height: 1.5; }
`;

const Icon = styled.span`
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e9dfd2;
  display: grid;
  place-items: center;

  svg { width: 20px; height: 20px; }
`;

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const CatasFeatures = () => (
  <Wrap>
    <Bar aria-label="Información práctica" data-reveal-group="85" data-reveal-cols="3">
      <Item>
        <Icon aria-hidden="true">
          <svg {...svgProps}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
        </Icon>
        <span>
          <strong>Horarios</strong>
          <small>Lunes a viernes · 10:00 – 17:00<br />Sábados y domingos · Cerrado</small>
        </span>
      </Item>
      <Item>
        <Icon aria-hidden="true">
          <svg {...svgProps}>
            <circle cx="9" cy="9" r="3" /><circle cx="16.5" cy="10" r="2.5" />
            <path d="M3.5 19c.7-3.4 2.6-5.2 5.5-5.2s4.8 1.8 5.5 5.2M14 14.5c3.4-.4 5.5 1.1 6.5 4.5" />
          </svg>
        </Icon>
        <span>
          <strong>Aforo limitado</strong>
          <small>Máximo 10 personas.<br />Para grupos mayores, consulta disponibilidad</small>
        </span>
      </Item>
      <Item>
        <Icon aria-hidden="true">
          <svg {...svgProps}><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>
        </Icon>
        <span>
          <strong>Reservas</strong>
          <small>enoturismo@bodegasantacatarina.com</small>
        </span>
      </Item>
    </Bar>
  </Wrap>
);

export default CatasFeatures;
