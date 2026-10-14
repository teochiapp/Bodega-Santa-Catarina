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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
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

const AdminCatasList = () => {
  const [catas, setCatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [cataEdit, setCataEdit] = useState(null);
  const [cataDelete, setCataDelete] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    diaSemana: '',
    horario: '',
    duracion: '',
    portada: '',
  });

  const cargarCatas = async () => {
    try {
      setLoading(true);
      const data = await api.get('/catas');
      setCatas(data);
    } catch (err) {
      console.error('Error cargando catas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;
    api.get('/catas')
      .then((data) => {
        if (activo) {
          setCatas(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error cargando catas:', err);
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  const handleOpenCrear = () => {
    setCataEdit(null);
    setFormData({
      titulo: '',
      precio: '',
      descripcion: '',
      diaSemana: 'Lunes a Sábado',
      horario: '11:30 y 16:30',
      duracion: '1h 30min',
      portada: '',
    });
    setModalOpen(true);
  };

  const handleOpenEditar = (cata) => {
    setCataEdit(cata);
    setFormData({
      titulo: cata.titulo || '',
      precio: cata.precio || '',
      descripcion: cata.descripcion || '',
      diaSemana: cata.diaSemana || '',
      horario: cata.horario || '',
      duracion: cata.duracion || '',
      portada: cata.portada || '',
    });
    setModalOpen(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (cataEdit) {
        await api.put(`/catas/${cataEdit.id}`, formData);
      } else {
        await api.post('/catas', formData);
      }
      setModalOpen(false);
      cargarCatas();
    } catch (err) {
      alert(err.message || 'Error al guardar la cata');
    }
  };

  const handleEliminar = async () => {
    if (!cataDelete) return;
    try {
      await api.delete(`/catas/${cataDelete.id}`);
      setCataDelete(null);
      cargarCatas();
    } catch (err) {
      console.error('Error al eliminar cata:', err);
      alert('Error al eliminar la cata');
    }
  };

  return (
    <AdminLayout section="Catas">
      <Kicker>Enoturismo & Degustaciones</Kicker>
      <PageH1>Catas y Visitas</PageH1>

      <PanelHead>
        <span style={{ fontSize: 14, color: 'var(--tn-muted)' }}>
          {catas.length} experiencias de cata registradas
        </span>
        <BtnPrimary onClick={handleOpenCrear}>
          <Plus size={15} strokeWidth={2} /> Nueva Cata
        </BtnPrimary>
      </PanelHead>

      {loading ? (
        <Spinner />
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Título</Th>
                <Th>Precio</Th>
                <Th>Días</Th>
                <Th>Horario</Th>
                <Th>Duración</Th>
                <Th style={{ textAlign: 'right' }}>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {catas.map((cata) => (
                <tr key={cata.id}>
                  <Td>
                    <strong>{cata.titulo}</strong>
                    <div style={{ fontSize: 12, color: 'var(--tn-muted)', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cata.descripcion}
                    </div>
                  </Td>
                  <Td>
                    <strong style={{ color: 'var(--tn-acc-700)' }}>{Number(cata.precio).toFixed(2)} €</strong>
                  </Td>
                  <Td>{cata.diaSemana || '—'}</Td>
                  <Td>{cata.horario || '—'}</Td>
                  <Td>{cata.duracion || '—'}</Td>
                  <Td style={{ textAlign: 'right' }}>
                    <ActionBtn onClick={() => handleOpenEditar(cata)}>
                      <Pencil size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Editar
                    </ActionBtn>
                    <ActionBtn $danger onClick={() => setCataDelete(cata)}>
                      <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Eliminar
                    </ActionBtn>
                  </Td>
                </tr>
              ))}
              {catas.length === 0 && (
                <tr>
                  <Td colSpan={6} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: 30 }}>
                    No hay catas registradas. ¡Crea la primera!
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
              <span>{cataEdit ? 'Editar Cata' : 'Nueva Cata'}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setModalOpen(false)}>
                <X size={18} strokeWidth={1.8} />
              </button>
            </ModalHeader>
            <ModalBody onSubmit={handleGuardar}>
              <FormGroup>
                <label>Título de la Experiencia</label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: Cata Descubrimiento Santa Catarina"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <label>Precio (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    placeholder="25.00"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Duración</label>
                  <input
                    type="text"
                    value={formData.duracion}
                    onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                    placeholder="1 hora 30 min"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>Días de la Semana</label>
                  <input
                    type="text"
                    value={formData.diaSemana}
                    onChange={(e) => setFormData({ ...formData, diaSemana: e.target.value })}
                    placeholder="Lunes a Sábado"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Horario</label>
                  <input
                    type="text"
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    placeholder="11:30 y 16:30"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label>Descripción</label>
                <textarea
                  rows={3}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Detalles del recorrido, cata guiada y maridaje..."
                />
              </FormGroup>

              <FormGroup>
                <AdminImageUpload
                  label="Imagen de Portada / Experiencia"
                  helper="Selecciona una imagen desde tu PC (JPG, PNG, WebP)"
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
      {cataDelete && (
        <AdminConfirmModal
          titulo="Eliminar Cata"
          mensaje={`¿Estás seguro de que deseas eliminar "${cataDelete.titulo}"? Esta acción no se puede deshacer.`}
          onConfirm={handleEliminar}
          onClose={() => setCataDelete(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminCatasList;
