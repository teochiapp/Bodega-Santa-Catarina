import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import AdminLayout from './AdminLayout';
import AdminConfirmModal from './AdminConfirmModal';
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
  max-width: 500px;
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

const AdminTarjetasList = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [tarjetaEdit, setTarjetaEdit] = useState(null);
  const [tarjetaDelete, setTarjetaDelete] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
  });

  const cargarTarjetas = async () => {
    try {
      setLoading(true);
      const data = await api.get('/tarjetas');
      setTarjetas(data);
    } catch (err) {
      console.error('Error cargando tarjetas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;
    api.get('/tarjetas')
      .then((data) => {
        if (activo) {
          setTarjetas(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error cargando tarjetas:', err);
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  const handleOpenCrear = () => {
    setTarjetaEdit(null);
    setFormData({
      titulo: '',
      precio: '',
      descripcion: '',
    });
    setModalOpen(true);
  };

  const handleOpenEditar = (tarjeta) => {
    setTarjetaEdit(tarjeta);
    setFormData({
      titulo: tarjeta.titulo || '',
      precio: tarjeta.precio || '',
      descripcion: tarjeta.descripcion || '',
    });
    setModalOpen(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (tarjetaEdit) {
        await api.put(`/tarjetas/${tarjetaEdit.id}`, formData);
      } else {
        await api.post('/tarjetas', formData);
      }
      setModalOpen(false);
      cargarTarjetas();
    } catch (err) {
      alert(err.message || 'Error al guardar la tarjeta');
    }
  };

  const handleEliminar = async () => {
    if (!tarjetaDelete) return;
    try {
      await api.delete(`/tarjetas/${tarjetaDelete.id}`);
      setTarjetaDelete(null);
      cargarTarjetas();
    } catch (err) {
      console.error('Error al eliminar tarjeta:', err);
      alert('Error al eliminar la tarjeta');
    }
  };

  return (
    <AdminLayout section="Tarjetas">
      <Kicker>Tienda & Experiencias para regalar</Kicker>
      <PageH1>Tarjetas de Regalo</PageH1>

      <PanelHead>
        <span style={{ fontSize: 14, color: 'var(--tn-muted)' }}>
          {tarjetas.length} tarjetas de regalo disponibles
        </span>
        <BtnPrimary onClick={handleOpenCrear}>
          <Plus size={15} strokeWidth={2} /> Nueva Tarjeta
        </BtnPrimary>
      </PanelHead>

      {loading ? (
        <Spinner />
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Título del Bono / Experiencia</Th>
                <Th>Valor / Precio</Th>
                <Th>Descripción</Th>
                <Th style={{ textAlign: 'right' }}>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {tarjetas.map((tarjeta) => (
                <tr key={tarjeta.id}>
                  <Td>
                    <strong>{tarjeta.titulo}</strong>
                  </Td>
                  <Td>
                    <strong style={{ color: 'var(--tn-acc-700)', fontSize: 15 }}>
                      {Number(tarjeta.precio).toFixed(2)} €
                    </strong>
                  </Td>
                  <Td>
                    <div style={{ fontSize: 13, color: 'var(--tn-muted)', maxWidth: 360, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {tarjeta.descripcion}
                    </div>
                  </Td>
                  <Td style={{ textAlign: 'right' }}>
                    <ActionBtn onClick={() => handleOpenEditar(tarjeta)}>
                      <Pencil size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Editar
                    </ActionBtn>
                    <ActionBtn $danger onClick={() => setTarjetaDelete(tarjeta)}>
                      <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Eliminar
                    </ActionBtn>
                  </Td>
                </tr>
              ))}
              {tarjetas.length === 0 && (
                <tr>
                  <Td colSpan={4} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: 30 }}>
                    No hay tarjetas de regalo configuradas.
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
              <span>{tarjetaEdit ? 'Editar Tarjeta de Regalo' : 'Nueva Tarjeta de Regalo'}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setModalOpen(false)}>
                <X size={18} strokeWidth={1.8} />
              </button>
            </ModalHeader>
            <ModalBody onSubmit={handleGuardar}>
              <FormGroup>
                <label>Nombre de la Tarjeta o Experiencia</label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: Tarjeta Regalo - Menú & Maridaje"
                />
              </FormGroup>

              <FormGroup>
                <label>Precio / Valor (€)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  placeholder="50.00"
                />
              </FormGroup>

              <FormGroup>
                <label>Descripción y Condiciones de Canje</label>
                <textarea
                  rows={4}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Qué incluye, vigencia, cómo canjear..."
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
      {tarjetaDelete && (
        <AdminConfirmModal
          isOpen={Boolean(tarjetaDelete)}
          title="Eliminar Tarjeta"
          message={`¿Estás seguro de que deseas eliminar "${tarjetaDelete.titulo}"?`}
          confirmText="Eliminar"
          onConfirm={handleEliminar}
          onCancel={() => setTarjetaDelete(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminTarjetasList;
