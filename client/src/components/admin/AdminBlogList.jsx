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
  max-width: 600px;
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

const AdminBlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [postEdit, setPostEdit] = useState(null);
  const [postDelete, setPostDelete] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    portada: '',
    galeria: '',
    descripcion: '',
    enlace: '',
  });

  const cargarPosts = async () => {
    try {
      setLoading(true);
      const data = await api.get('/blog');
      setPosts(data);
    } catch (err) {
      console.error('Error cargando blog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;
    api.get('/blog')
      .then((data) => {
        if (activo) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error cargando blog:', err);
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  const handleOpenCrear = () => {
    setPostEdit(null);
    setFormData({
      titulo: '',
      fecha: new Date().toISOString().split('T')[0],
      portada: '',
      galeria: '',
      descripcion: '',
      enlace: '',
    });
    setModalOpen(true);
  };

  const handleOpenEditar = (post) => {
    setPostEdit(post);
    setFormData({
      titulo: post.titulo || '',
      fecha: post.fecha ? new Date(post.fecha).toISOString().split('T')[0] : '',
      portada: post.portada || '',
      galeria: Array.isArray(post.galeria) ? post.galeria.join(', ') : '',
      descripcion: post.descripcion || '',
      enlace: post.enlace || '',
    });
    setModalOpen(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        galeria: formData.galeria ? formData.galeria.split(',').map((s) => s.trim()).filter(Boolean) : [],
      };
      if (postEdit) {
        await api.put(`/blog/${postEdit.id}`, payload);
      } else {
        await api.post('/blog', payload);
      }
      setModalOpen(false);
      cargarPosts();
    } catch (err) {
      alert(err.message || 'Error al guardar el artículo');
    }
  };

  const handleEliminar = async () => {
    if (!postDelete) return;
    try {
      await api.delete(`/blog/${postDelete.id}`);
      setPostDelete(null);
      cargarPosts();
    } catch (err) {
      console.error('Error al eliminar el artículo:', err);
      alert('Error al eliminar el artículo');
    }
  };

  return (
    <AdminLayout section="Blog">
      <Kicker>Noticias & Artículos</Kicker>
      <PageH1>Blog de la Bodega</PageH1>

      <PanelHead>
        <span style={{ fontSize: 14, color: 'var(--tn-muted)' }}>
          {posts.length} artículos publicados
        </span>
        <BtnPrimary onClick={handleOpenCrear}>
          <Plus size={15} strokeWidth={2} /> Nuevo Artículo
        </BtnPrimary>
      </PanelHead>

      {loading ? (
        <Spinner />
      ) : (
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th style={{ width: 120 }}>Fecha</Th>
                <Th>Título</Th>
                <Th>Contenido</Th>
                <Th style={{ textAlign: 'right' }}>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <Td>
                    <span style={{ fontSize: 12, color: 'var(--tn-muted)' }}>
                      {post.fecha ? new Date(post.fecha).toLocaleDateString('es-ES') : '—'}
                    </span>
                  </Td>
                  <Td>
                    <strong>{post.titulo}</strong>
                  </Td>
                  <Td>
                    <div style={{ fontSize: 13, color: 'var(--tn-muted)', maxWidth: 360, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {post.descripcion?.replace(/<[^>]+>/g, '')}
                    </div>
                  </Td>
                  <Td style={{ textAlign: 'right' }}>
                    <ActionBtn onClick={() => handleOpenEditar(post)}>
                      <Pencil size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Editar
                    </ActionBtn>
                    <ActionBtn $danger onClick={() => setPostDelete(post)}>
                      <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Eliminar
                    </ActionBtn>
                  </Td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <Td colSpan={4} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: 30 }}>
                    No hay publicaciones en el blog.
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
              <span>{postEdit ? 'Editar Artículo' : 'Nuevo Artículo'}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setModalOpen(false)}>
                <X size={18} strokeWidth={1.8} />
              </button>
            </ModalHeader>
            <ModalBody onSubmit={handleGuardar}>
              <FormGroup>
                <label>Título del Artículo</label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: La Vendimia 2024: Tradición y Respeto por la Tierra"
                />
              </FormGroup>

              <FormGroup>
                <label>Fecha de Publicación</label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <label>Imagen de Portada (URL)</label>
                <input
                  type="text"
                  value={formData.portada}
                  onChange={(e) => setFormData({ ...formData, portada: e.target.value })}
                  placeholder="/isologo.png"
                />
              </FormGroup>

              <FormGroup>
                <label>Galería de Imágenes (URLs separadas por coma)</label>
                <input
                  type="text"
                  value={formData.galeria}
                  onChange={(e) => setFormData({ ...formData, galeria: e.target.value })}
                  placeholder="/foto1.jpg, /foto2.jpg"
                />
              </FormGroup>

              <FormGroup>
                <label>Contenido del Artículo (HTML o Texto)</label>
                <textarea
                  rows={6}
                  required
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Escribe el contenido del post o código HTML..."
                />
              </FormGroup>

              <FormGroup>
                <label>Enlace Externo (Opcional)</label>
                <input
                  type="url"
                  value={formData.enlace}
                  onChange={(e) => setFormData({ ...formData, enlace: e.target.value })}
                  placeholder="https://..."
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
      {postDelete && (
        <AdminConfirmModal
          titulo="Eliminar Artículo"
          mensaje={`¿Estás seguro de que deseas eliminar "${postDelete.titulo}"?`}
          onConfirm={handleEliminar}
          onClose={() => setPostDelete(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminBlogList;
