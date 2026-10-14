import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import AdminLayout from './AdminLayout';
import AdminConfirmModal from './AdminConfirmModal';
import AdminImageUpload from './AdminImageUpload';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid var(--tn-n-300);
  border-top-color: var(--tn-acc);
  border-radius: 50%;
  animation: _spin 0.8s linear infinite;
  margin: 30px auto;
  @keyframes _spin { to { transform: rotate(360deg); } }
`;

const Kicker = styled.p`
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
  margin-bottom: 4px;
`;

const PageH1 = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--tn-text);
  margin-bottom: 24px;
`;

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--tn-rule);
  padding-bottom: 12px;
  margin-bottom: 20px;
`;

const BtnPrimary = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 16px;
  background: var(--tn-acc-700);
  color: #fff;
  border: none;
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease;
  &:hover { background: var(--tn-acc-800); }
`;

const TableScroll = styled.div`width: 100%; overflow-x: auto;`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Th = styled.th`
  padding: 10px 14px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tn-muted);
  border-bottom: 1px solid var(--tn-rule);
`;

const Td = styled.td`
  padding: 14px;
  border-bottom: 1px solid var(--tn-line);
  color: var(--tn-text);
  vertical-align: middle;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  color: ${(p) => (p.$danger ? 'var(--tn-rojo-700)' : 'var(--tn-acc-700)')};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 12px;
  &:hover { text-decoration: underline; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(42, 28, 33, 0.55);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: var(--tn-bg);
  width: 100%;
  max-width: 520px;
  border: 1px solid var(--tn-rule);
  box-shadow: var(--tn-shadow-lg);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  height: 52px;
  border-bottom: 2px solid var(--tn-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--tn-surface);
  font-weight: 700;
`;

const ModalBody = styled.form`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--tn-muted);
  }
  input, textarea {
    padding: 8px 12px;
    border: 1px solid var(--tn-rule);
    font-family: inherit;
    font-size: 14px;
    background: #fff;
    &:focus { outline: none; border-color: var(--tn-acc-700); }
  }
`;

const ModalFooter = styled.div`
  padding: 14px 20px;
  border-top: 1px solid var(--tn-rule);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background: var(--tn-surface);
`;

const BtnSecondary = styled.button`
  height: 36px;
  padding: 0 14px;
  background: transparent;
  border: 1px solid var(--tn-rule);
  color: var(--tn-text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: var(--tn-n-100); }
`;

const AdminEventosList = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventoEdit, setEventoEdit] = useState(null);
  const [eventoDelete, setEventoDelete] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    descripcion: '',
    posicion: 0,
    portada: '',
  });

  const cargarEventos = async () => {
    try {
      setLoading(true);
      const data = await api.get('/eventos');
      setEventos(data);
    } catch (err) {
      console.error('Error cargando eventos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;
    api.get('/eventos')
      .then((data) => {
        if (activo) {
          setEventos(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error cargando eventos:', err);
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  const handleOpenCrear = () => {
    setEventoEdit(null);
    setFormData({
      titulo: '',
      subtitulo: '',
      descripcion: '',
      posicion: eventos.length + 1,
      portada: '',
    });
    setModalOpen(true);
  };

  const handleOpenEditar = (evento) => {
    setEventoEdit(evento);
    setFormData({
      titulo: evento.titulo || '',
      subtitulo: evento.subtitulo || '',
      descripcion: evento.descripcion || '',
      posicion: evento.posicion || 0,
      portada: evento.portada || '',
    });
    setModalOpen(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (eventoEdit) {
        await api.put(`/eventos/${eventoEdit.id}`, formData);
      } else {
        await api.post('/eventos', formData);
      }
      setModalOpen(false);
      cargarEventos();
    } catch (err) {
      alert(err.message || 'Error al guardar el evento');
    }
  };

  const handleEliminar = async () => {
    if (!eventoDelete) return;
    try {
      await api.delete(`/eventos/${eventoDelete.id}`);
      setEventoDelete(null);
      cargarEventos();
    } catch (err) {
      console.error('Error al eliminar evento:', err);
      alert('Error al eliminar el evento');
    }
  };

  return (
    <AdminLayout section="Eventos">
      <Kicker>Celebraciones & Bodas</Kicker>
      <PageH1>Eventos y Espacios</PageH1>

      <PanelHead>
        <span style={{ fontSize: 14, color: 'var(--tn-muted)' }}>
          {eventos.length} tipos de eventos configurados
        </span>
        <BtnPrimary onClick={handleOpenCrear}>
          <Plus size={15} strokeWidth={2} /> Nuevo Evento
        </BtnPrimary>
      </PanelHead>

      {loading ? (
        <Spinner />
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th style={{ width: 60 }}>Pos.</Th>
                <Th>Título / Subtítulo</Th>
                <Th>Descripción</Th>
                <Th style={{ textAlign: 'right' }}>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <Td>
                    <span style={{ fontWeight: 700, color: 'var(--tn-gold-700)' }}>#{evento.posicion}</span>
                  </Td>
                  <Td>
                    <strong>{evento.titulo}</strong>
                    {evento.subtitulo && (
                      <div style={{ fontSize: 12, color: 'var(--tn-muted)' }}>{evento.subtitulo}</div>
                    )}
                  </Td>
                  <Td>
                    <div style={{ fontSize: 13, color: 'var(--tn-text)', maxWidth: 350, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {evento.descripcion}
                    </div>
                  </Td>
                  <Td style={{ textAlign: 'right' }}>
                    <ActionBtn onClick={() => handleOpenEditar(evento)}>
                      <Pencil size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Editar
                    </ActionBtn>
                    <ActionBtn $danger onClick={() => setEventoDelete(evento)}>
                      <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Eliminar
                    </ActionBtn>
                  </Td>
                </tr>
              ))}
              {eventos.length === 0 && (
                <tr>
                  <Td colSpan={4} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: 30 }}>
                    No hay eventos configurados.
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableScroll>
      )}

      {/* Modal Formulario */}
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <span>{eventoEdit ? 'Editar Evento' : 'Nuevo Evento'}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setModalOpen(false)}>
                <X size={18} strokeWidth={1.8} />
              </button>
            </ModalHeader>
            <ModalBody onSubmit={handleGuardar}>
              <FormGroup>
                <label>Título del Evento o Espacio</label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: Bodas en el Viñedo"
                />
              </FormGroup>

              <FormGroup>
                <label>Subtítulo</label>
                <input
                  type="text"
                  value={formData.subtitulo}
                  onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
                  placeholder="Ej: Un enlace de ensueño en el corazón de Mallorca"
                />
              </FormGroup>

              <FormGroup>
                <label>Posición / Orden</label>
                <input
                  type="number"
                  value={formData.posicion}
                  onChange={(e) => setFormData({ ...formData, posicion: e.target.value })}
                  placeholder="1"
                />
              </FormGroup>

              <FormGroup>
                <label>Descripción</label>
                <textarea
                  rows={4}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Capacidades, detalles de catering, jardines y servicios..."
                />
              </FormGroup>

              <FormGroup>
                <AdminImageUpload
                  label="Imagen de Portada / Espacio"
                  helper="Selecciona una imagen del espacio o evento desde tu PC (JPG, PNG, WebP)"
                  value={formData.portada}
                  onChange={(url) => setFormData((prev) => ({ ...prev, portada: url }))}
                />
              </FormGroup>

              <ModalFooter>
                <BtnSecondary type="button" onClick={() => setModalOpen(false)}>Cancelar</BtnSecondary>
                <BtnPrimary type="submit">Guardar</BtnPrimary>
              </ModalFooter>
            </ModalBody>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* Confirmar eliminación */}
      {eventoDelete && (
        <AdminConfirmModal
          isOpen={Boolean(eventoDelete)}
          title="Eliminar Evento"
          message={`¿Estás seguro de que deseas eliminar "${eventoDelete.titulo}"?`}
          confirmText="Eliminar"
          onConfirm={handleEliminar}
          onCancel={() => setEventoDelete(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminEventosList;
