import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import AdminLayout from './AdminLayout';
import AdminConfirmModal from './AdminConfirmModal';
import AdminImageUpload from './AdminImageUpload';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';

const Spinner = styled.div`
  width: 22px;
  height: 22px;
  border: 2px solid var(--tn-n-300);
  border-top-color: var(--tn-acc-700);
  border-radius: 50%;
  animation: _spin 0.8s linear infinite;
  margin: 40px auto;
  @keyframes _spin { to { transform: rotate(360deg); } }
`;

const Kicker = styled.p`
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
  margin-bottom: 4px;
`;

const PageH1 = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--tn-text);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--tn-muted);
  margin-bottom: 24px;
  line-height: 1.5;
`;

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--tn-rule);
  padding-bottom: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const StatsBadge = styled.span`
  font-size: 13px;
  color: var(--tn-text);
  background: var(--tn-n-100);
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid var(--tn-line);
`;

const BtnPrimary = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  background: var(--tn-acc-700);
  color: #fff;
  border: none;
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease, transform 150ms ease;

  &:hover {
    background: var(--tn-acc-800);
    transform: translateY(-1px);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background: var(--tn-n-50, #FFFFFF);
  border: 1px solid var(--tn-rule);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:hover {
    border-color: var(--tn-acc-400);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #25121B;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(0.85);
    transition: transform 300ms ease;
  }

  ${Card}:hover img {
    transform: scale(1.03);
  }
`;

const OrderBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(42, 28, 33, 0.85);
  backdrop-filter: blur(4px);
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
  letter-spacing: 0.05em;
`;

const StatusPill = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${(p) => (p.$active ? 'rgba(34, 139, 34, 0.9)' : 'rgba(120, 120, 120, 0.9)')};
  backdrop-filter: blur(4px);
  color: #FFFFFF;
  font-size: 10.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 14px;
`;

const AltText = styled.p`
  font-size: 13.5px;
  color: var(--tn-text);
  line-height: 1.45;
  margin: 0;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--tn-line);
  padding-top: 12px;
  margin-top: auto;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconBtn = styled.button`
  background: none;
  border: 1px solid var(--tn-line);
  padding: 6px 10px;
  color: ${(p) => (p.$danger ? 'var(--tn-rojo-700, #b91c1c)' : 'var(--tn-text)')};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 150ms ease;

  &:hover {
    background: ${(p) => (p.$danger ? 'rgba(185, 28, 28, 0.08)' : 'var(--tn-n-100)')};
    border-color: ${(p) => (p.$danger ? 'var(--tn-rojo-700, #b91c1c)' : 'var(--tn-rule)')};
  }
`;

const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: ${(p) => (p.$active ? 'var(--tn-gold-700)' : 'var(--tn-muted)')};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;

  &:hover {
    color: var(--tn-acc-700);
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(42, 28, 33, 0.65);
  backdrop-filter: blur(2px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: var(--tn-bg, #FFFFFF);
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid var(--tn-rule);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 2px solid var(--tn-rule);
  font-size: 16px;
  font-weight: 700;
  color: var(--tn-text);
`;

const ModalBody = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--tn-muted);
  }

  input[type="text"],
  input[type="number"],
  textarea {
    border: 1px solid var(--tn-line);
    padding: 9px 12px;
    font-family: var(--tn-font);
    font-size: 13.5px;
    color: var(--tn-text);
    background: #fff;
    outline: none;
    transition: border-color 150ms ease;

    &:focus {
      border-color: var(--tn-acc-700);
    }
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  cursor: pointer;
  user-select: none;
  color: var(--tn-text);
  margin-top: 4px;

  input {
    width: 16px;
    height: 16px;
    accent-color: var(--tn-acc-700);
    cursor: pointer;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid var(--tn-line);
  padding-top: 16px;
  margin-top: 8px;
`;

const BtnSecondary = styled.button`
  height: 38px;
  padding: 0 16px;
  background: transparent;
  color: var(--tn-text);
  border: 1px solid var(--tn-line);
  font-family: var(--tn-font);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: var(--tn-n-100);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  border: 2px dashed var(--tn-line);
  color: var(--tn-muted);

  p {
    margin: 12px 0 20px 0;
    font-size: 14px;
  }
`;

const AdminTiendaGaleriaList = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [deletingImage, setDeletingImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    imagen: '',
    alt: '',
    orden: 0,
    activo: true,
  });

  const cargarImagenes = async () => {
    try {
      setLoading(true);
      const data = await api.get('/tienda-galeria');
      setImagenes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error cargando imágenes de tienda:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarImagenes();
  }, []);

  const handleOpenCrear = () => {
    setEditingImage(null);
    const siguienteOrden = imagenes.length > 0 ? Math.max(...imagenes.map((i) => i.orden || 0)) + 1 : 1;
    setFormData({
      imagen: '',
      alt: '',
      orden: siguienteOrden,
      activo: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditar = (item) => {
    setEditingImage(item);
    setFormData({
      imagen: item.imagen || '',
      alt: item.alt || '',
      orden: item.orden || 0,
      activo: Boolean(item.activo),
    });
    setModalOpen(true);
  };

  const handleToggleActivo = async (item) => {
    try {
      const nuevoEstado = !item.activo;
      await api.put(`/tienda-galeria/${item.id}`, { activo: nuevoEstado });
      setImagenes((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, activo: nuevoEstado ? 1 : 0 } : i))
      );
    } catch (err) {
      console.error('Error cambiando estado activo:', err);
      alert('No se pudo actualizar el estado');
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!formData.imagen) {
      alert('Por favor sube o especifica una imagen');
      return;
    }

    try {
      setSaving(true);
      if (editingImage) {
        await api.put(`/tienda-galeria/${editingImage.id}`, formData);
      } else {
        await api.post('/tienda-galeria', formData);
      }
      setModalOpen(false);
      await cargarImagenes();
    } catch (err) {
      console.error('Error guardando imagen:', err);
      alert('Error al guardar la fotografía');
    } finally {
      setSaving(false);
    }
  };

  const handleEliminar = async () => {
    if (!deletingImage) return;
    try {
      await api.delete(`/tienda-galeria/${deletingImage.id}`);
      setDeletingImage(null);
      await cargarImagenes();
    } catch (err) {
      console.error('Error eliminando imagen:', err);
      alert('Error al eliminar la fotografía');
    }
  };

  return (
    <AdminLayout section="Galería Tienda Física">
      <Kicker>CONTENIDO & TIENDA</Kicker>
      <PageH1>Galería de la Tienda Física</PageH1>
      <Subtitle>
        Gestiona las fotografías que se exhiben en el carrusel de la página de Tienda Física (Son Aloy).
        Puedes reorganizarlas asignando el número de orden deseado.
      </Subtitle>

      <PanelHead>
        <StatsBadge>
          Total: <strong>{imagenes.length}</strong> fotografías
        </StatsBadge>
        <BtnPrimary onClick={handleOpenCrear}>
          <Plus size={16} strokeWidth={2.2} />
          Añadir Fotografía
        </BtnPrimary>
      </PanelHead>

      {loading ? (
        <Spinner />
      ) : imagenes.length === 0 ? (
        <EmptyState>
          <ImageIcon size={48} strokeWidth={1.2} />
          <p>Aún no hay fotografías en la galería de la tienda.</p>
          <BtnPrimary style={{ margin: '0 auto' }} onClick={handleOpenCrear}>
            <Plus size={16} strokeWidth={2.2} />
            Subir la primera foto
          </BtnPrimary>
        </EmptyState>
      ) : (
        <GalleryGrid>
          {imagenes.map((item) => (
            <Card key={item.id}>
              <ImageWrap>
                <img
                  src={item.imagen}
                  alt={item.alt || 'Fotografía tienda'}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/tienda-fisica-01.jpg';
                  }}
                />
                <OrderBadge>#{item.orden}</OrderBadge>
                <StatusPill $active={Boolean(item.activo)}>
                  {Boolean(item.activo) ? 'Visible' : 'Oculto'}
                </StatusPill>
              </ImageWrap>

              <CardBody>
                <AltText title={item.alt}>
                  {item.alt || <em>Sin descripción alternativa</em>}
                </AltText>

                <CardFooter>
                  <ToggleBtn
                    type="button"
                    $active={Boolean(item.activo)}
                    onClick={() => handleToggleActivo(item)}
                    title={item.activo ? 'Ocultar de la web' : 'Mostrar en la web'}
                  >
                    {item.activo ? <Eye size={15} /> : <EyeOff size={15} />}
                    {item.activo ? 'Público' : 'Oculto'}
                  </ToggleBtn>

                  <ActionGroup>
                    <IconBtn type="button" onClick={() => handleOpenEditar(item)}>
                      <Pencil size={13} />
                      Editar
                    </IconBtn>
                    <IconBtn
                      type="button"
                      $danger
                      onClick={() => setDeletingImage(item)}
                      title="Eliminar fotografía"
                    >
                      <Trash2 size={13} />
                    </IconBtn>
                  </ActionGroup>
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </GalleryGrid>
      )}

      {/* Modal Crear / Editar */}
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <span>{editingImage ? 'Editar Fotografía' : 'Nueva Fotografía de Galería'}</span>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setModalOpen(false)}
              >
                <X size={18} />
              </button>
            </ModalHeader>

            <ModalBody onSubmit={handleGuardar}>
              <FormGroup>
                <AdminImageUpload
                  label="Fotografía (JPG, PNG, WebP)"
                  helper="Puedes subir un archivo desde tu equipo o indicar una ruta existente"
                  value={formData.imagen}
                  onChange={(url) => setFormData((prev) => ({ ...prev, imagen: url }))}
                />
              </FormGroup>

              <FormGroup>
                <label>Descripción / Texto Alternativo (Alt)</label>
                <input
                  type="text"
                  required
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  placeholder="Ej: Mostrador y selección de vinos de la tienda física"
                />
              </FormGroup>

              <FormGroup>
                <label>Orden de Visualización</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={formData.orden}
                  onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value, 10) || 0 })}
                  placeholder="1, 2, 3..."
                />
              </FormGroup>

              <CheckboxRow>
                <input
                  type="checkbox"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                />
                Activo (mostrar en el carrusel público de la tienda)
              </CheckboxRow>

              <ModalFooter>
                <BtnSecondary type="button" onClick={() => setModalOpen(false)}>
                  Cancelar
                </BtnSecondary>
                <BtnPrimary type="submit" disabled={saving}>
                  {saving ? 'Guardando...' : editingImage ? 'Guardar Cambios' : 'Añadir Fotografía'}
                </BtnPrimary>
              </ModalFooter>
            </ModalBody>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* Modal Confirmar Eliminación */}
      {deletingImage && (
        <AdminConfirmModal
          isOpen={Boolean(deletingImage)}
          title="Eliminar Fotografía"
          message={`¿Estás seguro de que deseas eliminar la fotografía "${deletingImage.alt || '#' + deletingImage.orden}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          onConfirm={handleEliminar}
          onCancel={() => setDeletingImage(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminTiendaGaleriaList;
