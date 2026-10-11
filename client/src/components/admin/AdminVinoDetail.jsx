import styled, { keyframes } from 'styled-components';
import { X, Pencil, Trash2 } from 'lucide-react';

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(18px); }
  to   { opacity: 1; transform: translateX(0); }
`;

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
  font-size: 13.5px;
  font-weight: 700;
  color: var(--tn-text);
  letter-spacing: -0.01em;
`;

const AsideKicker = styled.div`
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
`;

const CloseBtn = styled.button`
  width: 34px;
  height: 34px;
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

const WineImage = styled.div`
  width: 100%;
  height: 170px;
  background-color: var(--tn-surface);
  border: 1px solid var(--tn-rule);
  margin-bottom: 16px;
  background-image: ${(p) => (p.$bg ? `url(${p.$bg})` : 'none')};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--tn-muted);
  font-size: 12px;
`;

const Section = styled.section`
  &:not(:last-child) {
    border-bottom: 1px solid var(--tn-rule);
    padding-bottom: 14px;
    margin-bottom: 14px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-muted);
  margin-bottom: 10px;
  font-weight: 700;
`;

const Facts = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 8px;
`;

const FactItem = styled.div``;

const FactKey = styled.dt`
  font-size: 10px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--tn-muted);
  margin-bottom: 2px;
`;

const FactVal = styled.dd`
  font-size: 13px;
  font-weight: 600;
  color: var(--tn-text);
  word-break: break-word;
`;

const FullFact = styled(FactItem)`
  grid-column: 1 / -1;
`;

const TypeBadge = styled.span`
  display: inline-block;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 7px;
  background: var(--tn-acc-100);
  color: var(--tn-acc-700);
  border: 1px solid var(--tn-acc-200);
`;

const ColeccionBadge = styled.span`
  display: inline-block;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 7px;
  background: var(--tn-gold-100);
  color: var(--tn-gold-700);
  border: 1px solid #e8d5a0;
`;

const CategoryTag = styled.span`
  display: inline-block;
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 6px;
  background: var(--tn-surface);
  border: 1px solid var(--tn-rule);
  color: var(--tn-text);
  margin-right: 4px;
  margin-bottom: 4px;
`;

const ParagraphText = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: var(--tn-text);
  white-space: pre-line;
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

const AdminVinoDetail = ({ vino, onClose, onEdit, onDelete }) => {
  if (!vino) return null;

  const categorias = Array.isArray(vino.categorias)
    ? vino.categorias
    : (typeof vino.categorias === 'string' ? vino.categorias.split(',').map(s => s.trim()).filter(Boolean) : []);

  return (
    <AsideRoot>
      <AsideHeader>
        <div>
          <AsideKicker>Ficha de Vino</AsideKicker>
          <AsideTitle>{vino.titulo || vino.variedad || `Vino #${vino.id}`}</AsideTitle>
        </div>
        <CloseBtn onClick={onClose} aria-label="Cerrar detalle" id="btn-cerrar-detalle">
          <X size={16} strokeWidth={1.8} />
        </CloseBtn>
      </AsideHeader>

      <AsideBody>
        {vino.portada ? (
          <WineImage $bg={vino.portada} />
        ) : (
          <WineImage>Sin portada cargada</WineImage>
        )}

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
          </Facts>
          
          {categorias.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <FactKey>Categorías</FactKey>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '4px' }}>
                {categorias.map((cat, idx) => (
                  <CategoryTag key={idx}>{cat}</CategoryTag>
                ))}
              </div>
            </div>
          )}
        </Section>

        {vino.descripcion && (
          <Section>
            <SectionTitle>Descripción</SectionTitle>
            <ParagraphText>{vino.descripcion}</ParagraphText>
          </Section>
        )}

        {vino.notaCata && (
          <Section>
            <SectionTitle>Nota de Cata</SectionTitle>
            <ParagraphText>{vino.notaCata}</ParagraphText>
          </Section>
        )}

        {vino.maridaje && (
          <Section>
            <SectionTitle>Maridaje</SectionTitle>
            <ParagraphText>{vino.maridaje}</ParagraphText>
          </Section>
        )}

        {vino.reconocimientos && (
          <Section>
            <SectionTitle>Reconocimientos</SectionTitle>
            <ParagraphText>{vino.reconocimientos}</ParagraphText>
          </Section>
        )}

        {vino.fichaTecnica && (
          <Section>
            <SectionTitle>Ficha Técnica</SectionTitle>
            <ParagraphText>{vino.fichaTecnica}</ParagraphText>
          </Section>
        )}

        <Section>
          <SectionTitle>Acciones</SectionTitle>
          <ActionRow>
            <BtnPrimary
              id={`btn-editar-vino-${vino.id}`}
              onClick={onEdit}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Pencil size={14} strokeWidth={1.8} />
              Editar
            </BtnPrimary>
            <BtnDanger
              id={`btn-eliminar-vino-${vino.id}`}
              onClick={onDelete}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Trash2 size={14} strokeWidth={1.8} />
              Eliminar
            </BtnDanger>
          </ActionRow>
        </Section>
      </AsideBody>
    </AsideRoot>
  );
};

export default AdminVinoDetail;
