import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fade} 200ms ease;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: var(--tn-bg);
  width: 100%;
  max-width: 500px;
  border: 1px solid var(--tn-rule);
  box-shadow: var(--tn-shadow-lg);
  animation: ${rise} 200ms ease;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const ModalHeader = styled.div`
  height: var(--tn-topbar-h);
  border-bottom: 2px solid var(--tn-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
  background: var(--tn-surface);
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--tn-text);
  letter-spacing: -0.01em;
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 2px solid var(--tn-rule);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
  background: var(--tn-surface);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--tn-muted);
`;

const Input = styled.input`
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--tn-rule);
  border-radius: 0;
  font-family: var(--tn-font);
  font-size: 14px;
  color: var(--tn-text);
  background: var(--tn-bg);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  width: 100%;

  &:hover {
    border-color: var(--tn-n-400);
  }

  &:focus {
    border-color: var(--tn-acc);
    box-shadow: inset 0 0 0 1px var(--tn-acc);
  }
`;

const Textarea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid var(--tn-rule);
  border-radius: 0;
  font-family: var(--tn-font);
  font-size: 14px;
  color: var(--tn-text);
  background: var(--tn-bg);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  width: 100%;
  resize: vertical;
  min-height: 80px;

  &:hover {
    border-color: var(--tn-n-400);
  }

  &:focus {
    border-color: var(--tn-acc);
    box-shadow: inset 0 0 0 1px var(--tn-acc);
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  > * { flex: 1; }
`;

const BtnSecondary = styled.button`
  height: 38px;
  padding: 0 14px;
  background: var(--tn-bg);
  color: var(--tn-text);
  border: 1px solid var(--tn-rule);
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease;

  &:hover {
    background: var(--tn-n-100);
    border-color: var(--tn-n-300);
  }
`;

const BtnPrimary = styled.button`
  height: 38px;
  padding: 0 20px;
  background: var(--tn-acc-700);
  color: #fff;
  border: none;
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover:not(:disabled) {
    background: var(--tn-acc-800);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorAlert = styled.div`
  border: 1px solid var(--tn-line);
  border-left: 3px solid var(--tn-rojo-700);
  background: var(--tn-rojo-100);
  color: var(--tn-rojo-700);
  padding: 10px 14px;
  font-size: 13px;
  margin-bottom: 4px;
`;

// ── Componente ────────────────────────────────────────────────────────────────

const AdminVinoForm = ({ onClose, onSave, vinoAEditar = null }) => {
  const isEditing = !!vinoAEditar;
  
  const [formData, setFormData] = useState({
    coleccion: vinoAEditar?.coleccion ?? '',
    anio: vinoAEditar?.anio ?? '',
    variedad: vinoAEditar?.variedad ?? '',
    tipo: vinoAEditar?.tipo ?? '',
    descripcion: vinoAEditar?.descripcion ?? '',
  });
  
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.coleccion || !formData.anio || !formData.variedad || !formData.tipo || !formData.descripcion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setCargando(true);
    try {
      // Siempre pasamos solo formData, AdminVinosList ya sabe el ID si está editando
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err.message || `Error al ${isEditing ? 'editar' : 'crear'} el vino`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox className="admin-scope" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{isEditing ? 'Editar Vino' : 'Agregar Vino'}</Title>
        </ModalHeader>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ModalBody>
            {error && <ErrorAlert>{error}</ErrorAlert>}
            
            <Row>
              <FormGroup>
                <Label htmlFor="vino-coleccion">Colección</Label>
                <Input
                  id="vino-coleccion"
                  name="coleccion"
                  placeholder="Ej: Reserva"
                  value={formData.coleccion}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="vino-anio">Año</Label>
                <Input
                  id="vino-anio"
                  name="anio"
                  type="number"
                  placeholder="Ej: 2022"
                  value={formData.anio}
                  onChange={handleChange}
                />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label htmlFor="vino-variedad">Variedad</Label>
                <Input
                  id="vino-variedad"
                  name="variedad"
                  placeholder="Ej: Merlot"
                  value={formData.variedad}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="vino-tipo">Tipo</Label>
                <Input
                  id="vino-tipo"
                  name="tipo"
                  placeholder="Ej: Tinto"
                  value={formData.tipo}
                  onChange={handleChange}
                />
              </FormGroup>
            </Row>

            <FormGroup>
              <Label htmlFor="vino-descripcion">Descripción</Label>
              <Textarea
                id="vino-descripcion"
                name="descripcion"
                placeholder="Descripción del vino..."
                value={formData.descripcion}
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <BtnSecondary type="button" onClick={onClose} disabled={cargando}>
              Cancelar
            </BtnSecondary>
            <BtnPrimary type="submit" disabled={cargando} id="btn-submit-vino">
              {cargando ? 'Guardando...' : (isEditing ? 'Guardar cambios' : 'Guardar vino')}
            </BtnPrimary>
          </ModalFooter>
        </form>
      </ModalBox>
    </Overlay>
  );
};

export default AdminVinoForm;
