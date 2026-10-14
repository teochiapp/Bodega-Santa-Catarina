import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Save } from 'lucide-react';
import AdminImageUpload from './AdminImageUpload';

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
  max-width: 680px;
  border: 1px solid var(--tn-rule);
  box-shadow: var(--tn-shadow-lg);
  animation: ${rise} 200ms ease;
  display: flex;
  flex-direction: column;
  max-height: 92vh;
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
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tn-muted);
`;

const SubHelper = styled.span`
  font-size: 11px;
  color: var(--tn-muted);
  font-weight: 400;
  text-transform: none;
`;

const Input = styled.input`
  height: 38px;
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
  font-size: 13.5px;
  color: var(--tn-text);
  background: var(--tn-bg);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  width: 100%;
  resize: vertical;
  min-height: ${(p) => p.$minHeight || '76px'};

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

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const SectionSeparator = styled.div`
  border-top: 1px dashed var(--tn-rule);
  padding-top: 12px;
  margin-top: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
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
    titulo: vinoAEditar?.titulo ?? '',
    coleccion: vinoAEditar?.coleccion ?? '',
    anio: vinoAEditar?.anio ?? '',
    variedad: vinoAEditar?.variedad ?? '',
    tipo: vinoAEditar?.tipo ?? 'Tinto',
    portada: vinoAEditar?.portada ?? '',
    categorias: Array.isArray(vinoAEditar?.categorias)
      ? vinoAEditar.categorias.join(', ')
      : (typeof vinoAEditar?.categorias === 'string' ? vinoAEditar.categorias : ''),
    notaCata: vinoAEditar?.notaCata ?? '',
    maridaje: vinoAEditar?.maridaje ?? '',
    reconocimientos: vinoAEditar?.reconocimientos ?? '',
    fichaTecnica: vinoAEditar?.fichaTecnica ?? '',
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
    
    if (!formData.coleccion || !formData.variedad || !formData.descripcion) {
      setError('Colección, Variedad y Descripción son obligatorios.');
      return;
    }

    const payload = {
      ...formData,
      titulo: formData.titulo.trim() || `${formData.variedad} ${formData.anio || ''}`.trim(),
      anio: formData.anio ? parseInt(formData.anio, 10) : null,
      categorias: formData.categorias
        ? formData.categorias.split(',').map((c) => c.trim()).filter(Boolean)
        : [],
    };

    setCargando(true);
    try {
      await onSave(payload);
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
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--tn-muted)' }}
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </ModalHeader>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ModalBody>
            {error && <ErrorAlert>{error}</ErrorAlert>}
            
            <Row>
              <FormGroup>
                <Label htmlFor="vino-titulo">Título del Vino</Label>
                <Input
                  id="vino-titulo"
                  name="titulo"
                  placeholder="Ej: Santa Catarina Reserva Merlot"
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="vino-coleccion">Colección / Gama *</Label>
                <Input
                  id="vino-coleccion"
                  name="coleccion"
                  placeholder="Ej: Gama sta, Colección Surant..."
                  value={formData.coleccion}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label htmlFor="vino-variedad">Variedad de Uva *</Label>
                <Input
                  id="vino-variedad"
                  name="variedad"
                  placeholder="Ej: 100% Manto Negro / Merlot"
                  value={formData.variedad}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="vino-anio">Año / Cosecha</Label>
                <Input
                  id="vino-anio"
                  name="anio"
                  type="number"
                  placeholder="Ej: 2023"
                  value={formData.anio}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="vino-tipo">Tipo</Label>
                <Input
                  id="vino-tipo"
                  name="tipo"
                  placeholder="Ej: Tinto, Blanco, Rosado"
                  value={formData.tipo}
                  onChange={handleChange}
                />
              </FormGroup>
            </Row>

            <FormGroup>
              <Label htmlFor="vino-categorias">
                Categorías <SubHelper>(separadas por coma)</SubHelper>
              </Label>
              <Input
                id="vino-categorias"
                name="categorias"
                placeholder="Tintos, Barrica, Selección Especial"
                value={formData.categorias}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <AdminImageUpload
                id="vino-portada"
                label="Imagen de la Botella / Portada"
                helper="Selecciona un archivo de tu PC (PNG con fondo transparente recomendado, JPG o WebP)"
                aspectRatio="bottle"
                value={formData.portada}
                onChange={(url) => setFormData((prev) => ({ ...prev, portada: url }))}
              />
            </FormGroup>

            <SectionSeparator>Enología & Notas</SectionSeparator>

            <FormGroup>
              <Label htmlFor="vino-descripcion">Descripción General *</Label>
              <Textarea
                id="vino-descripcion"
                name="descripcion"
                placeholder="Historia, origen y descripción general del vino..."
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Row>
              <FormGroup>
                <Label htmlFor="vino-notaCata">Nota de Cata</Label>
                <Textarea
                  id="vino-notaCata"
                  name="notaCata"
                  placeholder="Fase visual, olfativa y en boca..."
                  value={formData.notaCata}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="vino-maridaje">Maridaje</Label>
                <Textarea
                  id="vino-maridaje"
                  name="maridaje"
                  placeholder="Platos y maridajes sugeridos..."
                  value={formData.maridaje}
                  onChange={handleChange}
                />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label htmlFor="vino-reconocimientos">Reconocimientos y Premios</Label>
                <Input
                  id="vino-reconocimientos"
                  name="reconocimientos"
                  placeholder="Ej: 92 Puntos Peñín, Medalla de Oro Bruselas"
                  value={formData.reconocimientos}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="vino-fichaTecnica">Ficha Técnica</Label>
                <Input
                  id="vino-fichaTecnica"
                  name="fichaTecnica"
                  placeholder="Graduación 14% Vol, 12 meses roble francés..."
                  value={formData.fichaTecnica}
                  onChange={handleChange}
                />
              </FormGroup>
            </Row>
          </ModalBody>

          <ModalFooter>
            <BtnSecondary type="button" onClick={onClose} disabled={cargando}>
              Cancelar
            </BtnSecondary>
            <BtnPrimary
              type="submit"
              disabled={cargando}
              id="btn-submit-vino"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Save size={14} strokeWidth={2} />
              {cargando ? 'Guardando...' : (isEditing ? 'Guardar cambios' : 'Guardar vino')}
            </BtnPrimary>
          </ModalFooter>
        </form>
      </ModalBox>
    </Overlay>
  );
};

export default AdminVinoForm;
