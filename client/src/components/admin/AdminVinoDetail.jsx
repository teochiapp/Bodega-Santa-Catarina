import styled, { keyframes } from 'styled-components';

// ── Animación ─────────────────────────────────────────────────────────────────

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(18px); }
  to   { opacity: 1; transform: translateX(0); }
`;

// ── Íconos ────────────────────────────────────────────────────────────────────

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ── Estilos ───────────────────────────────────────────────────────────────────

const AsideRoot = styled.aside`
  width: var(--tn-detail-w);
  flex-shrink: 0;
  border-left: 2px solid var(--tn-rule);
  background: var(--tn-bg);
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 220ms ease;

  /* Ocultar en pantallas < 1024px */
  @media (max-width: 1023px) {
    display: none;
  }
`;

const AsideHeader = styled.div`
  height: var(--tn-topbar-h);
  border-bottom: 2px solid var(--tn-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  background: var(--tn-bg);
  z-index: 1;
`;

const AsideTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--tn-text);
  letter-spacing: -0.01em;
`;

const AsideKicker = styled.div`
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
`;

const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--tn-rule);
  color: var(--tn-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 150ms ease;

  &:hover {
    background: var(--tn-n-100);
  }
`;

const AsideBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Section = styled.section`
  &:not(:last-child) {
    border-bottom: 2px solid var(--tn-rule);
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-muted);
  margin-bottom: 12px;
  font-weight: 600;
`;

const Facts = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 8px;
`;

const FactItem = styled.div``;

const FactKey = styled.dt`
  font-size: 10.5px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--tn-muted);
  margin-bottom: 2px;
`;

const FactVal = styled.dd`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--tn-text);
  word-break: break-word;
`;

const FullFact = styled(FactItem)`
  grid-column: 1 / -1;
`;

const TypeBadge = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  background: var(--tn-acc-100);
  color: var(--tn-acc-700);
  border: 1px solid var(--tn-acc-200);
`;

const ColeccionBadge = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  background: var(--tn-gold-100);
  color: var(--tn-gold-700);
  border: 1px solid #e8d5a0;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 4px;
`;

const BtnPrimary = styled.button`
  flex: 1;
  height: 38px;
  padding: 0 14px;
  background: var(--tn-acc-700);
  color: #fff;
  border: none;
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: var(--tn-acc-800);
  }
`;

const BtnDanger = styled.button`
  height: 38px;
  padding: 0 14px;
  background: var(--tn-bg);
  color: var(--tn-rojo-700);
  border: 1px solid var(--tn-rojo-700);
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: var(--tn-rojo-100);
  }
`;

// ── Componente ────────────────────────────────────────────────────────────────

/**
 * Panel de detalle lateral para un vino seleccionado.
 *
 * @param {{ vino: object|null, onClose: () => void, onEdit: () => void, onDelete: () => void }} props
 */
const AdminVinoDetail = ({ vino, onClose, onEdit, onDelete }) => {
  if (!vino) return null;

  return (
    <AsideRoot>
      <AsideHeader>
        <div>
          <AsideKicker>Detalle</AsideKicker>
          <AsideTitle>Vino #{vino.id}</AsideTitle>
        </div>
        <CloseBtn onClick={onClose} aria-label="Cerrar detalle" id="btn-cerrar-detalle">
          <IconClose />
        </CloseBtn>
      </AsideHeader>

      <AsideBody>
        <Section>
          <SectionTitle>Identificación</SectionTitle>
          <Facts>
            <FullFact>
              <FactKey>Colección</FactKey>
              <FactVal><ColeccionBadge>{vino.coleccion || '—'}</ColeccionBadge></FactVal>
            </FullFact>
            <FactItem>
              <FactKey>Variedad</FactKey>
              <FactVal>{vino.variedad || '—'}</FactVal>
            </FactItem>
            <FactItem>
              <FactKey>Año</FactKey>
              <FactVal>{vino.anio || '—'}</FactVal>
            </FactItem>
            <FactItem>
              <FactKey>Tipo</FactKey>
              <FactVal><TypeBadge>{vino.tipo || '—'}</TypeBadge></FactVal>
            </FactItem>
            {vino.precio && (
              <FactItem>
                <FactKey>Precio</FactKey>
                <FactVal>{vino.precio}</FactVal>
              </FactItem>
            )}
          </Facts>
        </Section>

        {vino.descripcion && (
          <Section>
            <SectionTitle>Descripción</SectionTitle>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--tn-text)' }}>
              {vino.descripcion}
            </p>
          </Section>
        )}

        <Section>
          <SectionTitle>Acciones</SectionTitle>
          <ActionRow>
            <BtnPrimary
              id={`btn-editar-vino-${vino.id}`}
              onClick={onEdit}
            >
              Editar
            </BtnPrimary>
            <BtnDanger
              id={`btn-eliminar-vino-${vino.id}`}
              onClick={onDelete}
            >
              Eliminar
            </BtnDanger>
          </ActionRow>
        </Section>
      </AsideBody>
    </AsideRoot>
  );
};

export default AdminVinoDetail;
