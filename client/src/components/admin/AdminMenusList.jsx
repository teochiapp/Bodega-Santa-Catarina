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

const AdminMenusList = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuEdit, setMenuEdit] = useState(null);
  const [menuDelete, setMenuDelete] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    diaSemana: '',
    horario: '',
    duracion: '',
    portada: '',
  });

  const cargarMenus = async () => {
    try {
      setLoading(true);
      const data = await api.get('/menus');
      setMenus(data);
    } catch (err) {
      console.error('Error cargando menús:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;
    api.get('/menus')
      .then((data) => {
        if (activo) {
          setMenus(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error cargando menús:', err);
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  const handleOpenCrear = () => {
    setMenuEdit(null);
    setFormData({
      titulo: '',
      precio: '',
      descripcion: '',
      diaSemana: 'Jueves a Domingo',
      horario: '13:00 a 16:00',
      duracion: '2 horas',
      portada: '',
    });
    setModalOpen(true);
  };

  const handleOpenEditar = (menu) => {
    setMenuEdit(menu);
    setFormData({
      titulo: menu.titulo || '',
      precio: menu.precio || '',
      descripcion: menu.descripcion || '',
      diaSemana: menu.diaSemana || '',
      horario: menu.horario || '',
      duracion: menu.duracion || '',
      portada: menu.portada || '',
    });
    setModalOpen(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (menuEdit) {
        await api.put(`/menus/${menuEdit.id}`, formData);
      } else {
        await api.post('/menus', formData);
      }
      setModalOpen(false);
      cargarMenus();
    } catch (err) {
      alert(err.message || 'Error al guardar el menú');
    }
  };

  const handleEliminar = async () => {
    if (!menuDelete) return;
    try {
      await api.delete(`/menus/${menuDelete.id}`);
      setMenuDelete(null);
      cargarMenus();
    } catch (err) {
      console.error('Error al eliminar menú:', err);
      alert('Error al eliminar el menú');
    }
  };

  return (
    <AdminLayout section="Menús">
      <Kicker>Gastronomía & Maridajes</Kicker>
      <PageH1>Menús Gastronómicos</PageH1>

      <PanelHead>
        <span style={{ fontSize: 14, color: 'var(--tn-muted)' }}>
          {menus.length} menús disponibles
        </span>
        <BtnPrimary onClick={handleOpenCrear}>
          <Plus size={15} strokeWidth={2} /> Nuevo Menú
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
              {menus.map((menu) => (
                <tr key={menu.id}>
                  <Td>
                    <strong>{menu.titulo}</strong>
                    <div style={{ fontSize: 12, color: 'var(--tn-muted)', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {menu.descripcion}
                    </div>
                  </Td>
                  <Td>
                    <strong style={{ color: 'var(--tn-acc-700)' }}>{Number(menu.precio).toFixed(2)} €</strong>
                  </Td>
                  <Td>{menu.diaSemana || '—'}</Td>
                  <Td>{menu.horario || '—'}</Td>
                  <Td>{menu.duracion || '—'}</Td>
                  <Td style={{ textAlign: 'right' }}>
                    <ActionBtn onClick={() => handleOpenEditar(menu)}>
                      <Pencil size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Editar
                    </ActionBtn>
                    <ActionBtn $danger onClick={() => setMenuDelete(menu)}>
                      <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Eliminar
                    </ActionBtn>
                  </Td>
                </tr>
              ))}
              {menus.length === 0 && (
                <tr>
                  <Td colSpan={6} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: 30 }}>
                    No hay menús gastronómicos registrados.
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
              <span>{menuEdit ? 'Editar Menú' : 'Nuevo Menú'}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setModalOpen(false)}>
                <X size={18} strokeWidth={1.8} />
              </button>
            </ModalHeader>
            <ModalBody onSubmit={handleGuardar}>
              <FormGroup>
                <label>Nombre del Menú</label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: Menú Degustación Maridado"
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
                    placeholder="65.00"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Duración Estimada</label>
                  <input
                    type="text"
                    value={formData.duracion}
                    onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                    placeholder="2 horas"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>Días Disponibles</label>
                  <input
                    type="text"
                    value={formData.diaSemana}
                    onChange={(e) => setFormData({ ...formData, diaSemana: e.target.value })}
                    placeholder="Jueves a Domingo"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Horario</label>
                  <input
                    type="text"
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    placeholder="13:00 a 16:00"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label>Descripción / Platos del Menú</label>
                <textarea
                  rows={3}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Descripción de los tiempos, maridajes y opciones..."
                />
              </FormGroup>

              <FormGroup>
                <AdminImageUpload
                  label="Imagen de Portada / Menú"
                  helper="Selecciona una imagen gastronómica desde tu PC (JPG, PNG, WebP)"
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
      {menuDelete && (
        <AdminConfirmModal
          titulo="Eliminar Menú"
          mensaje={`¿Estás seguro de que deseas eliminar "${menuDelete.titulo}"?`}
          onConfirm={handleEliminar}
          onClose={() => setMenuDelete(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminMenusList;
