import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Phone, Check, Ban, RotateCcw } from 'lucide-react';
import api from '../../services/api';
import AdminLayout from './AdminLayout';
import AdminConfirmModal from './AdminConfirmModal';

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

const Filters = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  margin-bottom: 18px;

  @media (max-width: 520px) { grid-template-columns: 1fr; }

  input, select {
    height: 38px;
    padding: 0 12px;
    border: 1px solid var(--tn-rule);
    background: #fff;
    font-family: inherit;
    font-size: 14px;
  }
`;

const TableScroll = styled.div`width: 100%; overflow-x: auto;`;
const Table = styled.table`width: 100%; border-collapse: collapse; font-size: 14px; min-width: 860px;`;

const Th = styled.th`
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tn-muted);
  border-bottom: 1px solid var(--tn-rule);
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid var(--tn-line);
  color: var(--tn-text);
  vertical-align: middle;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${({ $estado }) => ({
    PENDIENTE: '#f3e7d3', CONTACTADO: '#dbe8f5', COMPLETADO: '#e6efe3', CANCELADO: '#f6dcdc',
  }[$estado])};
  color: ${({ $estado }) => ({
    PENDIENTE: '#7d5b12', CONTACTADO: '#1d4a78', COMPLETADO: '#2f5a24', CANCELADO: '#8c1d1d',
  }[$estado])};
`;

const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid var(--tn-rule);
  padding: 5px 8px;
  margin: 2px 4px 2px 0;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ $danger }) => ($danger ? 'var(--tn-rojo-700)' : 'var(--tn-acc-700)')};
  &:hover { background: var(--tn-n-100); }
`;

const Err = styled.p`
  background: #fdf2f2;
  border-left: 4px solid #c93b3b;
  color: #8c1d1d;
  padding: 8px 12px;
  font-size: 13px;
  margin: 0 0 12px;
`;

const ESTADOS = [
  { value: '', label: 'Todos los estados' },
  { value: 'PENDIENTE', label: 'Pendientes' },
  { value: 'CONTACTADO', label: 'Contactados' },
  { value: 'COMPLETADO', label: 'Completados' },
  { value: 'CANCELADO', label: 'Cancelados' },
];
const ETIQUETA = { PENDIENTE: 'Pendiente', CONTACTADO: 'Contactado', COMPLETADO: 'Completado', CANCELADO: 'Cancelado' };

const fechaCorta = (iso) =>
  new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

const AdminPedidosTarjetasList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({ q: '', estado: '' });
  const [aCancelar, setACancelar] = useState(null);
  const [version, setVersion] = useState(0);
  const recargar = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    let activo = true;
    const params = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v));
    const timer = setTimeout(() => {
      api.get(`/pedidos-tarjetas?${params.toString()}`)
        .then((data) => { if (activo) { setPedidos(data); setError(''); } })
        .catch((err) => activo && setError(err.message))
        .finally(() => activo && setLoading(false));
    }, 250);
    return () => { activo = false; clearTimeout(timer); };
  }, [filtros, version]);

  const cambiarEstado = async (id, estado) => {
    try {
      await api.put(`/pedidos-tarjetas/${id}/estado`, { estado });
      recargar();
    } catch (err) {
      alert(err.message);
    }
  };

  const setFiltro = (campo) => (e) => setFiltros((f) => ({ ...f, [campo]: e.target.value }));

  return (
    <AdminLayout section="Tarjetas Regalo">
      <Kicker>Reservas &amp; Pedidos</Kicker>
      <PageH1>Tarjetas Regalo</PageH1>

      <Filters>
        <input type="search" placeholder="Buscar por nombre, email, teléfono, destinatario o código" aria-label="Buscar" value={filtros.q} onChange={setFiltro('q')} />
        <select aria-label="Estado" value={filtros.estado} onChange={setFiltro('estado')}>
          {ESTADOS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
        </select>
      </Filters>

      {error && <Err role="alert">{error}</Err>}

      <TableScroll>
        <Table>
          <thead>
            <tr>
              <Th>Solicitud</Th>
              <Th>Tarjeta</Th>
              <Th>Cliente</Th>
              <Th>Destinatario</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id}>
                <Td>
                  <strong>{fechaCorta(p.createdAt)}</strong>
                  <div style={{ fontSize: 12, color: 'var(--tn-muted)' }}>{p.codigo}</div>
                </Td>
                <Td>
                  {p.tarjetaTitulo}
                  <div style={{ fontSize: 12, color: 'var(--tn-muted)' }}>
                    {Number(p.importe) > 0 ? `${Number(p.importe).toFixed(2)} €` : 'A consultar'}
                  </div>
                </Td>
                <Td>
                  <strong>{p.nombre}</strong>
                  <div style={{ fontSize: 12, color: 'var(--tn-muted)' }}>{p.email} · {p.telefono}</div>
                </Td>
                <Td>
                  {p.destinatario || '—'}
                  {p.mensaje && <div style={{ fontSize: 12, fontStyle: 'italic' }}>“{p.mensaje}”</div>}
                </Td>
                <Td><Badge $estado={p.estado}>{ETIQUETA[p.estado]}</Badge></Td>
                <Td>
                  {p.estado === 'PENDIENTE' && (
                    <IconBtn onClick={() => cambiarEstado(p.id, 'CONTACTADO')}><Phone size={13} /> Contactado</IconBtn>
                  )}
                  {(p.estado === 'PENDIENTE' || p.estado === 'CONTACTADO') && (
                    <IconBtn onClick={() => cambiarEstado(p.id, 'COMPLETADO')}><Check size={13} /> Completar</IconBtn>
                  )}
                  {(p.estado === 'PENDIENTE' || p.estado === 'CONTACTADO') && (
                    <IconBtn $danger onClick={() => setACancelar(p)}><Ban size={13} /> Cancelar</IconBtn>
                  )}
                  {(p.estado === 'COMPLETADO' || p.estado === 'CANCELADO') && (
                    <IconBtn onClick={() => cambiarEstado(p.id, 'PENDIENTE')}><RotateCcw size={13} /> Reabrir</IconBtn>
                  )}
                </Td>
              </tr>
            ))}
            {!loading && pedidos.length === 0 && (
              <tr><Td colSpan={6} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: 30 }}>No hay solicitudes de tarjetas regalo con estos filtros.</Td></tr>
            )}
          </tbody>
        </Table>
      </TableScroll>

      {aCancelar && (
        <AdminConfirmModal
          isOpen
          title="Cancelar solicitud"
          message={`¿Cancelar la solicitud ${aCancelar.codigo} de ${aCancelar.nombre}? Se enviará un email al cliente.`}
          confirmText="Cancelar solicitud"
          onConfirm={() => { const p = aCancelar; setACancelar(null); cambiarEstado(p.id, 'CANCELADO'); }}
          onCancel={() => setACancelar(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminPedidosTarjetasList;
