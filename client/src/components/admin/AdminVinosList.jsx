import { useState } from 'react';
import styled from 'styled-components';
import useVinos from '../../hooks/useVinos';
import AdminVinoDetail from './AdminVinoDetail';
import AdminVinoForm from './AdminVinoForm';
import AdminConfirmModal from './AdminConfirmModal';
import AdminLayout from './AdminLayout';

// ── Íconos ────────────────────────────────────────────────────────────────────

const IconAdd = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid var(--tn-n-300);
  border-top-color: var(--tn-acc);
  border-radius: 50%;
  animation: _spin 0.8s linear infinite;
  margin: 0 auto;

  @keyframes _spin { to { transform: rotate(360deg); } }
`;

// ── Estilos ───────────────────────────────────────────────────────────────────

const Kicker = styled.p`
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
  margin-bottom: 4px;
`;

const PageH1 = styled.h1`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--tn-text);
  font-family: var(--tn-font);
  margin-bottom: 24px;
`;

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--tn-rule);
`;

const TabsRow = styled.div`display: flex;`;

const Tab = styled.button`
  height: 44px;
  padding: 0 18px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${(p) => (p.$active ? 'var(--tn-acc)' : 'transparent')};
  font-family: var(--tn-font);
  font-size: 14px;
  font-weight: ${(p) => (p.$active ? '700' : '400')};
  color: ${(p) => (p.$active ? 'var(--tn-acc-700)' : 'var(--tn-muted)')};
  cursor: pointer;
  transition: color 150ms ease, border-color 150ms ease;
  margin-bottom: -2px;
  &:hover { color: var(--tn-acc-700); }
`;

const BtnPrimary = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
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
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tn-muted);
  border-bottom: 2px solid var(--tn-rule);
  white-space: nowrap;
  background: var(--tn-bg);
`;

const Tr = styled.tr`
  border-bottom: 1px solid var(--tn-line);
  cursor: pointer;
  transition: background 150ms ease;
  background: ${(p) => (p.$active ? 'var(--tn-acc-100)' : 'transparent')};

  ${(p) => p.$active && `
    td:first-child { box-shadow: inset 3px 0 0 var(--tn-acc); }
  `}

  &:hover {
    background: ${(p) => (p.$active ? 'var(--tn-acc-100)' : 'var(--tn-n-100)')};
  }
  &:last-child { border-bottom: none; }
`;

const Td = styled.td`
  padding: 13px 14px;
  color: var(--tn-text);
  vertical-align: middle;
`;

const ColeccionBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  background: var(--tn-gold-100);
  color: var(--tn-gold-700);
  border: 1px solid #e8d5a0;
`;

const TipoBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  background: var(--tn-acc-100);
  color: var(--tn-acc-700);
  border: 1px solid var(--tn-acc-200);
`;

const AnioNum = styled.span`
  font-variant-numeric: lining-nums tabular-nums;
  font-weight: 600;
`;

const ErrorAlert = styled.div`
  border: 1px solid var(--tn-line);
  border-left: 3px solid var(--tn-rojo-700);
  background: var(--tn-rojo-100);
  color: var(--tn-rojo-700);
  padding: 12px 16px;
  font-size: 14px;
  margin-bottom: 16px;
`;

const ResultsBar = styled.div`
  padding: 10px 14px;
  font-size: 12.5px;
  color: var(--tn-muted);
  border-top: 1px solid var(--tn-line);
`;

// ── Página completa de Vinos ──────────────────────────────────────────────────

const AdminVinosPage = () => {
  const { vinos, cargando, error, agregarVino, actualizarVino, borrarVino } = useVinos();
  const [selectedId, setSelectedId] = useState(null);
  
  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVino, setEditingVino] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedVino = vinos.find((v) => v.id === selectedId) ?? null;

  const toggleSelect = (id) =>
    setSelectedId((prev) => (prev === id ? null : id));

  const handleSaveVino = async (vinoData) => {
    if (editingVino) {
      const vinoActualizado = await actualizarVino(editingVino.id, vinoData);
      setSelectedId(vinoActualizado.id);
    } else {
      const nuevoVino = await agregarVino(vinoData);
      setSelectedId(nuevoVino.id);
    }
    setIsFormOpen(false);
    setEditingVino(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await borrarVino(deletingId);
      if (selectedId === deletingId) {
        setSelectedId(null);
      }
      setIsConfirmOpen(false);
      setDeletingId(null);
    } catch (error) {
      alert('Error al eliminar: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const aside = (
    <AdminVinoDetail
      vino={selectedVino}
      onClose={() => setSelectedId(null)}
      onEdit={() => {
        setEditingVino(selectedVino);
        setIsFormOpen(true);
      }}
      onDelete={() => {
        setDeletingId(selectedVino.id);
        setIsConfirmOpen(true);
      }}
    />
  );

  return (
    <>
      <AdminLayout section="Vinos" aside={selectedVino ? aside : null}>
        <Kicker>Catálogo</Kicker>
        <PageH1>Vinos</PageH1>

        {error && <ErrorAlert>Error al cargar vinos: {error}</ErrorAlert>}

        <PanelHead>
          <TabsRow>
            <Tab $active>Todos</Tab>
          </TabsRow>
          <div style={{ padding: '3px 0' }}>
            <BtnPrimary
              id="btn-agregar-vino"
              onClick={() => {
                setEditingVino(null);
                setIsFormOpen(true);
              }}
            >
              <IconAdd /> Agregar vino
            </BtnPrimary>
          </div>
        </PanelHead>

        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Colección</Th>
                <Th>Variedad</Th>
                <Th>Año</Th>
                <Th>Tipo</Th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={4} style={{ padding: '32px 14px', textAlign: 'center' }}>
                    <Spinner />
                  </td>
                </tr>
              ) : vinos.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '32px 14px', textAlign: 'center', color: 'var(--tn-muted)', fontSize: '14px' }}>
                    No hay vinos cargados todavía.
                  </td>
                </tr>
              ) : (
                vinos.map((vino) => (
                  <Tr
                    key={vino.id}
                    $active={selectedId === vino.id}
                    onClick={() => toggleSelect(vino.id)}
                    id={`fila-vino-${vino.id}`}
                  >
                    <Td><ColeccionBadge>{vino.coleccion}</ColeccionBadge></Td>
                    <Td>{vino.variedad}</Td>
                    <Td><AnioNum>{vino.anio}</AnioNum></Td>
                    <Td><TipoBadge>{vino.tipo}</TipoBadge></Td>
                  </Tr>
                ))
              )}
            </tbody>
          </Table>
        </TableScroll>

        {!cargando && !error && vinos.length > 0 && (
          <ResultsBar>
            {vinos.length} {vinos.length === 1 ? 'vino' : 'vinos'}
            {selectedVino ? ` · ${selectedVino.variedad} ${selectedVino.anio} seleccionado` : ''}
          </ResultsBar>
        )}
      </AdminLayout>

      {isFormOpen && (
        <AdminVinoForm
          vinoAEditar={editingVino}
          onClose={() => {
            setIsFormOpen(false);
            setEditingVino(null);
          }}
          onSave={handleSaveVino}
        />
      )}

      <AdminConfirmModal
        isOpen={isConfirmOpen}
        title="Eliminar Vino"
        message="¿Estás seguro que querés eliminar este vino? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setDeletingId(null);
        }}
        cargando={isDeleting}
      />
    </>
  );
};

export default AdminVinosPage;
