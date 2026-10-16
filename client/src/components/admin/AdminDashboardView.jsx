import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AdminLayout from './AdminLayout';
import {
  Wine,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  UtensilsCrossed,
  CalendarHeart,
  Newspaper,
  Gift,
  Settings,
  ArrowRight,
  Megaphone,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const Spinner = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid var(--tn-n-300);
  border-top-color: var(--tn-acc);
  border-radius: 50%;
  animation: _spin 0.8s linear infinite;
  margin: 60px auto;
  @keyframes _spin { to { transform: rotate(360deg); } }
`;

// ── Estilos ───────────────────────────────────────────────────────────────────

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
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
  font-family: var(--tn-font);
  margin: 0;
`;

const DateBadge = styled.div`
  font-size: 13px;
  color: var(--tn-muted);
  background: var(--tn-surface);
  border: 1px solid var(--tn-rule);
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Status Banner
const SystemStatusBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding: 14px 18px;
  background: var(--tn-surface);
  border: 1px solid var(--tn-rule);
  margin-bottom: 24px;
  font-size: 13px;
`;

const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: ${(p) => (p.$warning ? '#fff9e6' : '#eaf7ee')};
  color: ${(p) => (p.$warning ? '#946600' : '#1e7338')};
  border: 1px solid ${(p) => (p.$warning ? '#fae29c' : '#c3e8cd')};
  font-weight: 600;
  font-size: 12px;
`;

const StatusInfo = styled.span`
  color: var(--tn-text);
  display: flex;
  align-items: center;
  gap: 6px;
`;

// Metrics Grid (6 tarjetas de datos reales)
const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
`;

const MetricCard = styled.div`
  background: var(--tn-surface);
  border: 1px solid var(--tn-rule);
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--tn-acc-700);
    box-shadow: var(--tn-shadow-sm, 0 2px 8px rgba(0,0,0,0.06));
  }
`;

const MetricHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  color: var(--tn-muted);
`;

const MetricIconWrapper = styled.div`
  width: 34px;
  height: 34px;
  background: var(--tn-bg);
  border: 1px solid var(--tn-rule);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--tn-acc-700);
`;

const MetricLabel = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--tn-muted);
`;

const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: var(--tn-text);
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
  margin-bottom: 4px;
`;

const MetricSub = styled.div`
  font-size: 12px;
  color: var(--tn-muted);
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Quick Actions
const QuickActionsBar = styled.div`
  margin-bottom: 28px;
`;

const SectionHeading = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--tn-muted);
  margin-bottom: 12px;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`;

const ActionButton = styled.button`
  background: var(--tn-surface);
  border: 1px solid var(--tn-rule);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: var(--tn-font);
  font-size: 13px;
  font-weight: 600;
  color: var(--tn-text);
  text-align: left;
  transition: all 150ms ease;

  .action-icon {
    color: var(--tn-acc-700);
    display: flex;
    align-items: center;
  }

  &:hover {
    background: var(--tn-acc-100);
    border-color: var(--tn-acc-300, var(--tn-acc));
    color: var(--tn-acc-700);
    transform: translateY(-1px);
  }
`;

// Two Columns Section for lists
const GridTwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: var(--tn-surface);
  border: 1px solid var(--tn-rule);
  padding: 20px;
`;

const PanelTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: var(--tn-text);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span.badge {
    font-size: 11px;
    font-weight: 600;
    color: var(--tn-muted);
    text-transform: uppercase;
  }
`;

const CompactTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px 10px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--tn-muted);
  border-bottom: 1px solid var(--tn-rule);
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid var(--tn-line);
  color: var(--tn-text);
  vertical-align: middle;
`;

const Tag = styled.span`
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 6px;
  background: var(--tn-gold-100);
  color: var(--tn-gold-700);
  border: 1px solid #e8d5a0;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--tn-text);

  .c-icon {
    color: var(--tn-acc-700);
    display: flex;
    align-items: center;
  }

  strong {
    font-weight: 600;
  }
`;

const ViewAllBtn = styled.button`
  background: none;
  border: none;
  color: var(--tn-acc-700);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

// ── Componente Principal ──────────────────────────────────────────────────────

const AdminDashboardView = () => {
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/dashboard/stats')
      .then((data) => {
        setStats(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('[AdminDashboardView] Error al cargar stats:', err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <AdminLayout section="Dashboard">
        <Spinner />
      </AdminLayout>
    );
  }

  const { totales, estadoBodega, banner, configuracion, ultimosVinos, ultimosBlogs, vacaciones } = stats || {};

  const fechaHoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <AdminLayout section="Dashboard">
      <HeaderRow>
        <div>
          <Kicker>Panel de Control · Bodega Santa Catarina</Kicker>
          <PageH1>Dashboard Ejecutivo</PageH1>
        </div>
        <DateBadge>
          <Calendar size={14} strokeWidth={1.8} />
          {fechaHoy.charAt(0).toUpperCase() + fechaHoy.slice(1)}
        </DateBadge>
      </HeaderRow>

      {/* ── Barra de Estado en Tiempo Real (100% Base de Datos) ── */}
      <SystemStatusBar>
        {estadoBodega?.enVacaciones ? (
          <StatusPill $warning>
            <AlertCircle size={14} strokeWidth={2} /> Bodega en período de cierre vacacional
          </StatusPill>
        ) : (
          <StatusPill>
            <CheckCircle2 size={14} strokeWidth={2} /> Bodega Abierta & Calendario Operativo
          </StatusPill>
        )}

        {banner?.activo ? (
          <StatusInfo>
            <Megaphone size={14} strokeWidth={1.8} />
            <strong>Banner Activo:</strong> <em>"{banner.texto}"</em>
          </StatusInfo>
        ) : (
          <StatusInfo style={{ color: 'var(--tn-muted)' }}>
            <Megaphone size={14} strokeWidth={1.8} />
            Banner promocional web desactivado
          </StatusInfo>
        )}

        {estadoBodega?.proximaVacacion && (
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--tn-muted)' }}>
            Próximo cierre programado:{' '}
            <strong>
              {new Date(estadoBodega.proximaVacacion.fechaInicio).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })} al{' '}
              {new Date(estadoBodega.proximaVacacion.fechaFin).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </strong>
          </div>
        )}
      </SystemStatusBar>

      {/* ── Métricas Reales de la Base de Datos ── */}
      <MetricsGrid>
        <MetricCard onClick={() => navigate('/admin/vinos')}>
          <MetricHead>
            <MetricLabel>Vinos</MetricLabel>
            <MetricIconWrapper><Wine size={18} strokeWidth={1.8} /></MetricIconWrapper>
          </MetricHead>
          <MetricValue>{totales?.vinos ?? 0}</MetricValue>
          <MetricSub>En catálogo público</MetricSub>
        </MetricCard>

        <MetricCard onClick={() => navigate('/admin/catas')}>
          <MetricHead>
            <MetricLabel>Catas</MetricLabel>
            <MetricIconWrapper><Sparkles size={18} strokeWidth={1.8} /></MetricIconWrapper>
          </MetricHead>
          <MetricValue>{totales?.catas ?? 0}</MetricValue>
          <MetricSub>Degustaciones activas</MetricSub>
        </MetricCard>

        <MetricCard onClick={() => navigate('/admin/menus')}>
          <MetricHead>
            <MetricLabel>Menús</MetricLabel>
            <MetricIconWrapper><UtensilsCrossed size={18} strokeWidth={1.8} /></MetricIconWrapper>
          </MetricHead>
          <MetricValue>{totales?.menus ?? 0}</MetricValue>
          <MetricSub>Gastronomía & maridaje</MetricSub>
        </MetricCard>

        <MetricCard onClick={() => navigate('/admin/blog')}>
          <MetricHead>
            <MetricLabel>Blog</MetricLabel>
            <MetricIconWrapper><Newspaper size={18} strokeWidth={1.8} /></MetricIconWrapper>
          </MetricHead>
          <MetricValue>{totales?.blog ?? 0}</MetricValue>
          <MetricSub>Publicaciones cargadas</MetricSub>
        </MetricCard>

        <MetricCard onClick={() => navigate('/admin/tarjetas')}>
          <MetricHead>
            <MetricLabel>Tarjetas</MetricLabel>
            <MetricIconWrapper><Gift size={18} strokeWidth={1.8} /></MetricIconWrapper>
          </MetricHead>
          <MetricValue>{totales?.tarjetas ?? 0}</MetricValue>
          <MetricSub>Bonos de regalo</MetricSub>
        </MetricCard>
      </MetricsGrid>

      {/* ── Acciones Rápidas ── */}
      <QuickActionsBar>
        <SectionHeading>Acciones Rápidas</SectionHeading>
        <ActionsGrid>
          <ActionButton onClick={() => navigate('/admin/vinos')} id="dash-btn-vinos">
            <span className="action-icon"><Wine size={16} strokeWidth={1.8} /></span>
            <span>Gestionar Vinos</span>
          </ActionButton>
          <ActionButton onClick={() => navigate('/admin/catas')} id="dash-btn-catas">
            <span className="action-icon"><Sparkles size={16} strokeWidth={1.8} /></span>
            <span>Catas & Degustación</span>
          </ActionButton>
          <ActionButton onClick={() => navigate('/admin/menus')} id="dash-btn-menus">
            <span className="action-icon"><UtensilsCrossed size={16} strokeWidth={1.8} /></span>
            <span>Menús Gastronómicos</span>
          </ActionButton>
          <ActionButton onClick={() => navigate('/admin/blog')} id="dash-btn-blog">
            <span className="action-icon"><Newspaper size={16} strokeWidth={1.8} /></span>
            <span>Publicar en Blog</span>
          </ActionButton>
          <ActionButton onClick={() => navigate('/admin/tarjetas')} id="dash-btn-tarjetas">
            <span className="action-icon"><Gift size={16} strokeWidth={1.8} /></span>
            <span>Tarjetas Regalo</span>
          </ActionButton>
          <ActionButton onClick={() => navigate('/admin/configuracion')} id="dash-btn-config">
            <span className="action-icon"><Settings size={16} strokeWidth={1.8} /></span>
            <span>Ajustes & Cierres</span>
          </ActionButton>
        </ActionsGrid>
      </QuickActionsBar>

      {/* ── Paneles Operativos con Datos 100% Reales ── */}
      <GridTwoCols>
        {/* Catálogo Reciente */}
        <Panel>
          <PanelTitle>
            <span>Últimos Vinos en Catálogo</span>
            <span className="badge">{totales?.vinos || 0} registrados</span>
          </PanelTitle>
          <CompactTable>
            <thead>
              <tr>
                <Th>Vino</Th>
                <Th>Colección</Th>
                <Th>Año</Th>
                <Th>Tipo</Th>
              </tr>
            </thead>
            <tbody>
              {ultimosVinos?.map((v) => (
                <tr key={v.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/vinos')}>
                  <Td style={{ fontWeight: 600 }}>{v.titulo || v.variedad}</Td>
                  <Td><Tag>{v.coleccion || '—'}</Tag></Td>
                  <Td>{v.anio || '—'}</Td>
                  <Td>{v.tipo || '—'}</Td>
                </tr>
              ))}
              {(!ultimosVinos || ultimosVinos.length === 0) && (
                <tr>
                  <Td colSpan={4} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: '20px' }}>
                    No hay vinos registrados.
                  </Td>
                </tr>
              )}
            </tbody>
          </CompactTable>
          
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <ViewAllBtn onClick={() => navigate('/admin/vinos')}>
              <span>Ver catálogo completo</span>
              <ArrowRight size={13} strokeWidth={2} />
            </ViewAllBtn>
          </div>
        </Panel>

        {/* Últimas Publicaciones del Blog */}
        <Panel>
          <PanelTitle>
            <span>Publicaciones del Blog</span>
            <span className="badge">{totales?.blog || 0} publicadas</span>
          </PanelTitle>
          <CompactTable>
            <thead>
              <tr>
                <Th>Título</Th>
                <Th style={{ textAlign: 'right' }}>Fecha</Th>
              </tr>
            </thead>
            <tbody>
              {ultimosBlogs?.map((b) => (
                <tr key={b.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/blog')}>
                  <Td style={{ fontWeight: 600 }}>{b.titulo}</Td>
                  <Td style={{ textAlign: 'right', color: 'var(--tn-muted)' }}>
                    {b.fecha ? new Date(b.fecha).toLocaleDateString('es-ES') : '—'}
                  </Td>
                </tr>
              ))}
              {(!ultimosBlogs || ultimosBlogs.length === 0) && (
                <tr>
                  <Td colSpan={2} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: '20px' }}>
                    No hay artículos en el blog todavía.
                  </Td>
                </tr>
              )}
            </tbody>
          </CompactTable>

          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <ViewAllBtn onClick={() => navigate('/admin/blog')}>
              <span>Administrar blog</span>
              <ArrowRight size={13} strokeWidth={2} />
            </ViewAllBtn>
          </div>
        </Panel>
      </GridTwoCols>

      {/* ── Segunda Fila: Calendario de Cierres y Contacto ── */}
      <GridTwoCols>
        {/* Períodos de Cierre Programados */}
        <Panel>
          <PanelTitle>
            <span>Fechas de Bloqueo / Vacaciones (Catas)</span>
            <span className="badge">{vacaciones?.length || 0} períodos</span>
          </PanelTitle>
          <CompactTable>
            <thead>
              <tr>
                <Th>Desde</Th>
                <Th>Hasta</Th>
                <Th>Motivo</Th>
              </tr>
            </thead>
            <tbody>
              {vacaciones?.map((vac) => (
                <tr key={vac.id}>
                  <Td><strong>{new Date(vac.fechaInicio).toLocaleDateString('es-ES')}</strong></Td>
                  <Td><strong>{new Date(vac.fechaFin).toLocaleDateString('es-ES')}</strong></Td>
                  <Td style={{ color: 'var(--tn-muted)' }}>{vac.motivo || 'Cierre programado'}</Td>
                </tr>
              ))}
              {(!vacaciones || vacaciones.length === 0) && (
                <tr>
                  <Td colSpan={3} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: '20px' }}>
                    No hay fechas de cierre bloqueadas.
                  </Td>
                </tr>
              )}
            </tbody>
          </CompactTable>

          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <ViewAllBtn onClick={() => navigate('/admin/configuracion')}>
              <span>Gestionar calendario de vacaciones</span>
              <ArrowRight size={13} strokeWidth={2} />
            </ViewAllBtn>
          </div>
        </Panel>

        {/* Canales de Contacto Configurados */}
        <Panel>
          <PanelTitle>
            <span>Canales de Contacto de la Bodega</span>
            <span className="badge">Configuración</span>
          </PanelTitle>
          
          <ContactList>
            <ContactItem>
              <span className="c-icon"><Phone size={15} strokeWidth={1.8} /></span>
              <span><strong>Teléfono:</strong> {configuracion?.telefono || 'No configurado'}</span>
            </ContactItem>
            <ContactItem>
              <span className="c-icon"><Phone size={15} strokeWidth={1.8} /></span>
              <span><strong>WhatsApp:</strong> {configuracion?.whatsapp || 'No configurado'}</span>
            </ContactItem>
            <ContactItem>
              <span className="c-icon"><Mail size={15} strokeWidth={1.8} /></span>
              <span><strong>Email Reservas:</strong> {configuracion?.emailReservas || 'No configurado'}</span>
            </ContactItem>
            <ContactItem>
              <span className="c-icon"><Mail size={15} strokeWidth={1.8} /></span>
              <span><strong>Email Contacto:</strong> {configuracion?.emailContacto || 'No configurado'}</span>
            </ContactItem>
            {configuracion?.direccion && (
              <ContactItem>
                <span className="c-icon"><MapPin size={15} strokeWidth={1.8} /></span>
                <span><strong>Finca:</strong> {configuracion.direccion}</span>
              </ContactItem>
            )}
          </ContactList>

          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <ViewAllBtn onClick={() => navigate('/admin/configuracion')}>
              <span>Editar datos en Configuración</span>
              <ArrowRight size={13} strokeWidth={2} />
            </ViewAllBtn>
          </div>
        </Panel>
      </GridTwoCols>
    </AdminLayout>
  );
};

export default AdminDashboardView;
