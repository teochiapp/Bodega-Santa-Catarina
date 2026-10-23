import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { CalendarClock, Ban, Check, UserX, RotateCcw, X, Wine, UtensilsCrossed } from 'lucide-react';
import api from '../../services/api';
import useDisponibilidadCata from '../../hooks/useDisponibilidadCata';
import useDisponibilidadMenu from '../../hooks/useDisponibilidadMenu';
import AdminLayout from './AdminLayout';
import AdminConfirmModal from './AdminConfirmModal';
import AdminReservasCalendario from './AdminReservasCalendario';

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
  grid-template-columns: 2fr 1.4fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;

  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
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
    CONFIRMADA: '#e6efe3', ASISTIO: '#dbe8f5', NO_ASISTIO: '#f3e7d3', CANCELADA: '#f6dcdc',
  }[$estado])};
  color: ${({ $estado }) => ({
    CONFIRMADA: '#2f5a24', ASISTIO: '#1d4a78', NO_ASISTIO: '#7d5b12', CANCELADA: '#8c1d1d',
  }[$estado])};
`;

const TipoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  margin-bottom: 6px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: ${({ $tipo }) => ($tipo === 'menu' ? '#fff4ed' : 'var(--tn-acc-100, #f5eef1)')};
  color: ${({ $tipo }) => ($tipo === 'menu' ? '#c2410c' : 'var(--tn-acc-700, #502B3A)')};
  border: 1px solid ${({ $tipo }) => ($tipo === 'menu' ? '#fed7aa' : 'var(--tn-acc-200, #dfc8cf)')};
  border-left: 3px solid ${({ $tipo }) => ($tipo === 'menu' ? '#ea580c' : 'var(--tn-acc-700, #502B3A)')};
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(42, 28, 33, 0.55);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Box = styled.div`
  background: var(--tn-bg);
  width: 100%;
  max-width: 460px;
  border: 1px solid var(--tn-rule);
  box-shadow: var(--tn-shadow-lg);
`;

const BoxHead = styled.div`
  height: 52px;
  border-bottom: 2px solid var(--tn-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--tn-surface);
  font-weight: 700;
`;

const BoxBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--tn-muted); }
  input, select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--tn-rule);
    background: #fff;
    font-family: inherit;
    font-size: 14px;
    box-sizing: border-box;
  }
`;

const BoxFoot = styled.div`
  padding: 14px 20px;
  border-top: 1px solid var(--tn-rule);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background: var(--tn-surface);
`;

const Btn = styled.button`
  height: 36px;
  padding: 0 16px;
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--tn-acc-700)' : 'var(--tn-rule)')};
  background: ${({ $primary }) => ($primary ? 'var(--tn-acc-700)' : 'transparent')};
  color: ${({ $primary }) => ($primary ? '#fff' : 'var(--tn-text)')};
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const Err = styled.p`
  background: #fdf2f2;
  border-left: 4px solid #c93b3b;
  color: #8c1d1d;
  padding: 8px 12px;
  font-size: 13px;
  margin: 0;
`;

const ESTADOS = [
  { value: '', label: 'Todos los estados' },
  { value: 'CONFIRMADA', label: 'Confirmadas' },
  { value: 'ASISTIO', label: 'Asistió' },
  { value: 'NO_ASISTIO', label: 'No asistió' },
  { value: 'CANCELADA', label: 'Canceladas' },
];
const ETIQUETA = { CONFIRMADA: 'Confirmada', ASISTIO: 'Asistió', NO_ASISTIO: 'No asistió', CANCELADA: 'Cancelada' };

const fechaCorta = (iso) => new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });

// ── Modal de reprogramación ────────────────────────────────────────────────
const ReprogramarModal = ({ reserva, onClose, onDone }) => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  const cataId = reserva.sesion?.cata?.id;
  const menuId = reserva.sesion?.menu?.id;
  const mesActual = (fecha || new Date().toISOString().slice(0, 10)).slice(0, 7);

  const dispCata = useDisponibilidadCata(cataId, mesActual);
  const dispMenu = useDisponibilidadMenu(menuId, mesActual);

  const { dias, cargando } = cataId ? dispCata : dispMenu;
  const slots = fecha ? dias[fecha] || [] : [];
  const expTitulo = reserva.sesion?.cata?.titulo || reserva.sesion?.menu?.titulo || 'Experiencia';

  const guardar = async () => {
    setGuardando(true);
    setError('');
    try {
      await api.put(`/reservas/${reserva.id}/reprogramar`, { fecha, hora });
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <BoxHead>
          <span>Reprogramar reserva {reserva.codigo}</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={onClose} aria-label="Cerrar"><X size={18} /></button>
        </BoxHead>
        <BoxBody>
          <div style={{ fontSize: 13, color: 'var(--tn-muted)' }}>
            {expTitulo} · actual: {fechaCorta(reserva.sesion.fecha)} {reserva.sesion.hora} · {reserva.personas} pers.
          </div>
          <div>
            <label htmlFor="rep-fecha">Nueva fecha</label>
            <input id="rep-fecha" type="date" value={fecha} onChange={(e) => { setFecha(e.target.value); setHora(''); }} />
          </div>
          <div>
            <label htmlFor="rep-hora">Horario disponible</label>
            <select id="rep-hora" value={hora} onChange={(e) => setHora(e.target.value)} disabled={!fecha || cargando}>
              <option value="">{!fecha ? 'Elige una fecha' : slots.length ? 'Elige un horario' : 'Sin sesiones ese día'}</option>
              {slots.map((s) => (
                <option key={s.hora} value={s.hora} disabled={s.disponibles < reserva.personas}>
                  {s.hora} · {s.disponibles} plazas libres
                </option>
              ))}
            </select>
          </div>
          {error && <Err role="alert">{error}</Err>}
        </BoxBody>
        <BoxFoot>
          <Btn onClick={onClose}>Cancelar</Btn>
          <Btn $primary disabled={!fecha || !hora || guardando} onClick={guardar}>Reprogramar</Btn>
        </BoxFoot>
      </Box>
    </Overlay>
  );
};

// ── Listado principal ──────────────────────────────────────────────────────
const AdminReservasList = () => {
  const [reservas, setReservas] = useState([]);
  const [todasReservas, setTodasReservas] = useState([]);
  const [catas, setCatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({ q: '', cataId: '', menuId: '', estado: '', fecha: '' });
  const [aCancelar, setACancelar] = useState(null);
  const [aReprogramar, setAReprogramar] = useState(null);
  const [version, setVersion] = useState(0);
  const recargar = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    Promise.all([
      api.get('/catas').catch(() => []),
      api.get('/menus').catch(() => []),
    ]).then(([catasData, menusData]) => {
      setCatas([
        ...(Array.isArray(catasData) ? catasData.map((c) => ({ id: `cata-${c.id}`, titulo: `[Cata] ${c.titulo}` })) : []),
        ...(Array.isArray(menusData) ? menusData.map((m) => ({ id: `menu-${m.id}`, titulo: `[Menú] ${m.titulo}` })) : []),
      ]);
    });
  }, []);

  useEffect(() => {
    let activo = true;
    api.get('/reservas')
      .then((data) => {
        if (activo) setTodasReservas(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Error cargando calendario de reservas:', err));
    return () => { activo = false; };
  }, [version]);

  useEffect(() => {
    let activo = true;
    const params = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v));
    const timer = setTimeout(() => {
      api.get(`/reservas?${params.toString()}`)
        .then((data) => { if (activo) { setReservas(data); setError(''); } })
        .catch((err) => activo && setError(err.message))
        .finally(() => activo && setLoading(false));
    }, 250);
    return () => { activo = false; clearTimeout(timer); };
  }, [filtros, version]);

  const accion = async (fn) => {
    try {
      await fn();
      recargar();
    } catch (err) {
      alert(err.message);
    }
  };

  const setFiltro = (campo) => (e) => setFiltros((f) => ({ ...f, [campo]: e.target.value }));

  const handleFiltroExp = (e) => {
    const val = e.target.value;
    if (!val) {
      setFiltros((f) => ({ ...f, cataId: '', menuId: '' }));
    } else if (val.startsWith('cata-')) {
      setFiltros((f) => ({ ...f, cataId: val.replace('cata-', ''), menuId: '' }));
    } else if (val.startsWith('menu-')) {
      setFiltros((f) => ({ ...f, menuId: val.replace('menu-', ''), cataId: '' }));
    }
  };

  const valorExpActual = filtros.cataId ? `cata-${filtros.cataId}` : filtros.menuId ? `menu-${filtros.menuId}` : '';

  return (
    <AdminLayout section="Reservas">
      <Kicker>Reservas &amp; Pedidos</Kicker>
      <PageH1>Reservas</PageH1>

      <Filters>
        <input type="search" placeholder="Buscar por nombre, email, teléfono o código" aria-label="Buscar" value={filtros.q} onChange={setFiltro('q')} />
        <select aria-label="Experiencia" value={valorExpActual} onChange={handleFiltroExp}>
          <option value="">Todas las experiencias</option>
          {catas.map((c) => <option key={c.id} value={c.id}>{c.titulo}</option>)}
        </select>
        <select aria-label="Estado" value={filtros.estado} onChange={setFiltro('estado')}>
          {ESTADOS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
        </select>
        <input type="date" aria-label="Fecha" value={filtros.fecha} onChange={setFiltro('fecha')} />
      </Filters>

      {error && <Err role="alert">{error}</Err>}

      <TableScroll>
        <Table>
          <thead>
            <tr>
              <Th>Fecha y hora</Th>
              <Th>Experiencia</Th>
              <Th>Cliente</Th>
              <Th>Pers.</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => {
              const activa = r.estado !== 'CANCELADA';
              const expNombre = r.sesion?.cata?.titulo || r.sesion?.menu?.titulo || 'Experiencia';
              return (
                <tr key={`${r.tipo || 'res'}-${r.id}`}>
                  <Td>
                    <strong>{fechaCorta(r.sesion.fecha)}</strong> · {r.sesion.hora}
                    <div style={{ fontSize: 12, color: 'var(--tn-muted)' }}>{r.codigo}</div>
                  </Td>
                  <Td>
                    <TipoBadge $tipo={r.tipo === 'menu' ? 'menu' : 'cata'}>
                      {r.tipo === 'menu' ? (
                        <>
                          <UtensilsCrossed size={12} /> Menú
                        </>
                      ) : (
                        <>
                          <Wine size={12} /> Cata
                        </>
                      )}
                    </TipoBadge>
                    <div style={{ fontWeight: 600 }}>{expNombre}</div>
                    <div style={{ fontSize: 12, color: 'var(--tn-muted)' }}>
                      {(r.idioma || '').replace(/Espa[\uFFFD]ol/i, 'Español')}
                    </div>
                  </Td>
                  <Td>
                    <strong>{r.nombre}</strong>
                    <div style={{ fontSize: 12, color: 'var(--tn-muted)' }}>{r.email} · {r.telefono}</div>
                    {r.comentarios && <div style={{ fontSize: 12, fontStyle: 'italic' }}>“{r.comentarios}”</div>}
                  </Td>
                  <Td>{r.personas}</Td>
                  <Td><Badge $estado={r.estado}>{ETIQUETA[r.estado]}</Badge></Td>
                  <Td>
                    {activa && (
                      <>
                        {r.estado !== 'ASISTIO' && (
                          <IconBtn onClick={() => accion(() => api.put(`/reservas/${r.id}/asistencia`, { estado: 'ASISTIO' }))}><Check size={13} /> Asistió</IconBtn>
                        )}
                        {r.estado !== 'NO_ASISTIO' && (
                          <IconBtn onClick={() => accion(() => api.put(`/reservas/${r.id}/asistencia`, { estado: 'NO_ASISTIO' }))}><UserX size={13} /> No vino</IconBtn>
                        )}
                        {r.estado !== 'CONFIRMADA' && (
                          <IconBtn onClick={() => accion(() => api.put(`/reservas/${r.id}/asistencia`, { estado: 'CONFIRMADA' }))}><RotateCcw size={13} /> Revertir</IconBtn>
                        )}
                      </>
                    )}
                    {r.estado === 'CONFIRMADA' && (
                      <>
                        <IconBtn onClick={() => setAReprogramar(r)}><CalendarClock size={13} /> Reprogramar</IconBtn>
                        <IconBtn $danger onClick={() => setACancelar(r)}><Ban size={13} /> Cancelar</IconBtn>
                      </>
                    )}
                  </Td>
                </tr>
              );
            })}
            {!loading && reservas.length === 0 && (
              <tr><Td colSpan={6} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: 30 }}>No hay reservas con estos filtros.</Td></tr>
            )}
          </tbody>
        </Table>
      </TableScroll>

      <AdminReservasCalendario
        reservas={todasReservas.length > 0 ? todasReservas : reservas}
        onReprogramar={setAReprogramar}
        onCancelar={setACancelar}
        onCambiarAsistencia={(r, est) =>
          accion(() => api.put(`/reservas/${r.id}/asistencia`, { estado: est }))
        }
      />

      {aReprogramar && (
        <ReprogramarModal
          reserva={aReprogramar}
          onClose={() => setAReprogramar(null)}
          onDone={() => { setAReprogramar(null); recargar(); }}
        />
      )}

      {aCancelar && (
        <AdminConfirmModal
          isOpen
          title="Cancelar reserva"
          message={`¿Cancelar la reserva ${aCancelar.codigo} de ${aCancelar.nombre}? Se liberarán ${aCancelar.personas} plaza(s) y se enviará un email al cliente.`}
          confirmText="Cancelar reserva"
          onConfirm={() => { const r = aCancelar; setACancelar(null); accion(() => api.put(`/reservas/${r.id}/cancelar`)); }}
          onCancel={() => setACancelar(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminReservasList;
