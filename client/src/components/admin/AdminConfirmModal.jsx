import styled, { keyframes } from 'styled-components';
import { AlertTriangle, X } from 'lucide-react';

// ── Animaciones ───────────────────────────────────────────────────────────────

const fade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Estilos ───────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(42, 28, 33, 0.55);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fade} 200ms ease;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: var(--tn-bg);
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--tn-rule);
  box-shadow: var(--tn-shadow-lg);
  animation: ${rise} 200ms ease;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  height: 48px;
  border-bottom: 2px solid var(--tn-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--tn-surface);
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: var(--tn-text);
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: var(--tn-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    color: var(--tn-text);
  }
`;

const ModalBody = styled.div`
  padding: 24px 20px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--tn-text);
`;

const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 2px solid var(--tn-rule);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: var(--tn-surface);
`;

const BtnSecondary = styled.button`
  height: 36px;
  padding: 0 14px;
  background: var(--tn-bg);
  color: var(--tn-text);
  border: 1px solid var(--tn-rule);
  font-family: var(--tn-font);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease;

  &:hover {
    background: var(--tn-n-100);
    border-color: var(--tn-n-300);
  }
`;

const BtnDanger = styled.button`
  height: 36px;
  padding: 0 16px;
  background: var(--tn-rojo-700);
  color: #fff;
  border: none;
  font-family: var(--tn-font);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover:not(:disabled) {
    background: var(--tn-rojo-800);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ── Componente ────────────────────────────────────────────────────────────────

const AdminConfirmModal = ({
  isOpen = true,
  title,
  titulo,
  message,
  mensaje,
  confirmText,
  confirmLabel,
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  onClose,
  cargando = false,
}) => {
  if (isOpen === false) return null;

  const displayTitle = title || titulo || 'Confirmar acción';
  const displayMessage = message || mensaje || '¿Estás seguro de que deseas continuar?';
  const displayConfirmText = confirmLabel || confirmText || 'Eliminar';
  const handleCancel = onCancel || onClose;

  return (
    <Overlay onClick={!cargando && handleCancel ? handleCancel : undefined}>
      <ModalBox className="admin-scope" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>
            <AlertTriangle size={17} strokeWidth={2} color="var(--tn-rojo-700)" />
            {displayTitle}
          </Title>
          <CloseBtn onClick={!cargando && handleCancel ? handleCancel : undefined} aria-label="Cerrar">
            <X size={16} strokeWidth={1.8} />
          </CloseBtn>
        </ModalHeader>
        
        <ModalBody>
          {displayMessage}
        </ModalBody>

        <ModalFooter>
          <BtnSecondary onClick={handleCancel} disabled={cargando}>
            {cancelText}
          </BtnSecondary>
          <BtnDanger onClick={onConfirm} disabled={cargando}>
            {cargando ? 'Eliminando...' : displayConfirmText}
          </BtnDanger>
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
};

export default AdminConfirmModal;
