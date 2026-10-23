import { useState, useMemo } from 'react';
import styled from 'styled-components';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Wine,
  UtensilsCrossed,
  Check,
  Ban,
  CalendarClock,
  Phone,
  Mail,
  Calendar as CalendarIcon,
} from 'lucide-react';

// ── Contenedor y cabeceras ──────────────────────────────────────────────────
const CalendarioWrapper = styled.section`
  margin-top: 48px;
  background: var(--tn-bg, #faf8f5);
  border: 1px solid var(--tn-rule, #e5e0d8);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(80, 43, 58, 0.05);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
`;

const TitleBox = styled.div`
  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 22px;
    font-weight: 700;
    color: var(--tn-text, #502b3a);
    margin: 0 0 6px 0;
  }
  p {
    font-size: 13px;
    color: var(--tn-muted, #7a7267);
    margin: 0;
  }
`;

const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterPills = styled.div`
  display: flex;
  gap: 6px;
  background: #ede8df;
  padding: 3px;
  border-radius: 6px;
`;

const FilterPill = styled.button`
  border: none;
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#502B3A' : '#7a7267')};
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: ${({ $active }) => ($active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none')};
  transition: all 0.15s ease;
`;

const MonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid var(--tn-rule, #e5e0d8);
  border-radius: 6px;
  padding: 4px 8px;

  span {
    font-size: 14px;
    font-weight: 700;
    color: #502b3a;
    min-width: 140px;
    text-align: center;
    text-transform: capitalize;
  }
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: #502b3a;
  cursor: pointer;
  &:hover {
    background: #f4efe6;
  }
`;

const TodayBtn = styled.button`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border: 1px solid var(--tn-rule, #e5e0d8);
  border-radius: 6px;
  background: #fff;
  color: #502b3a;
  cursor: pointer;
  &:hover {
    background: #f4efe6;
  }
`;

// ── Grilla del Calendario ───────────────────────────────────────────────────
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1px;
  background: var(--tn-rule, #e5e0d8);
  border: 1px solid var(--tn-rule, #e5e0d8);
  border-radius: 6px;
  overflow: hidden;
`;

const WeekHeaderCell = styled.div`
  background: #502b3a;
  color: #f2ece4;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  padding: 10px 4px;
`;

const DayCell = styled.div`
  background: ${({ $isCurrentMonth, $isSelected }) =>
    $isSelected ? '#fffdf7' : $isCurrentMonth ? '#ffffff' : '#f7f4ee'};
  min-height: 115px;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  position: relative;
  outline: ${({ $isSelected }) => ($isSelected ? '2px solid #C2A478' : 'none')};
  outline-offset: -2px;
  transition: background-color 0.15s ease;

  &:hover {
    background: #fffbf2;
  }

  @media (max-width: 768px) {
    min-height: 85px;
    padding: 4px 2px;
  }
`;

const DayNumberRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  padding: 0 4px;
`;

const DayNumber = styled.span`
  font-size: 12px;
  font-weight: ${({ $isToday }) => ($isToday ? '800' : '600')};
  color: ${({ $isToday, $isCurrentMonth }) =>
    $isToday ? '#ffffff' : $isCurrentMonth ? '#502b3a' : '#a89f91'};
  background: ${({ $isToday }) => ($isToday ? '#502b3a' : 'transparent')};
  width: ${({ $isToday }) => ($isToday ? '22px' : 'auto')};
  height: ${({ $isToday }) => ($isToday ? '22px' : 'auto')};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const TurnosCountBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 10px;
  background: #ede8df;
  color: #502b3a;
`;

// ── Fichas de turnos dentro del día ──────────────────────────────────────────
const ShiftsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden;
`;

const ShiftPill = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  background: ${({ $tipo, $cancelada }) =>
    $cancelada ? '#fee2e2' : $tipo === 'menu' ? '#ffedd5' : '#f5e8ee'};
  color: ${({ $tipo, $cancelada }) =>
    $cancelada ? '#991b1b' : $tipo === 'menu' ? '#9a3412' : '#502b3a'};
  border-left: 3px solid
    ${({ $tipo, $cancelada }) =>
      $cancelada ? '#ef4444' : $tipo === 'menu' ? '#ea580c' : '#502b3a'};
  opacity: ${({ $cancelada }) => ($cancelada ? 0.65 : 1)};
  text-decoration: ${({ $cancelada }) => ($cancelada ? 'line-through' : 'none')};

  &:hover {
    filter: brightness(0.96);
  }

  span.hora {
    font-family: monospace;
    font-size: 10px;
    font-weight: 800;
  }
  span.titulo {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const MoreShifts = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #7a7267;
  padding: 1px 4px;
`;

// ── Panel de detalle del día seleccionado ───────────────────────────────────
const DetailPanel = styled.div`
  margin-top: 24px;
  background: #ffffff;
  border: 1px solid var(--tn-rule, #e5e0d8);
  border-left: 4px solid #c2a478;
  border-radius: 6px;
  padding: 20px;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid #f0ebe1;
  padding-bottom: 12px;

  h3 {
    margin: 0;
    font-size: 17px;
    color: #502b3a;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const TotalPaxTag = styled.span`
  background: #f5f0e6;
  color: #502b3a;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
`;

const DetailCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 14px;
`;

const BookingCard = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e2d8;
  border-radius: 6px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BookingCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const ExpTypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${({ $tipo }) => ($tipo === 'menu' ? '#c2410c' : '#502b3a')};
  color: #fff;
`;

const StatusPill = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${({ $estado }) =>
    ({
      CONFIRMADA: '#e6efe3',
      ASISTIO: '#dbe8f5',
      NO_ASISTIO: '#f3e7d3',
      CANCELADA: '#f6dcdc',
    }[$estado] || '#ede8df')};
  color: ${({ $estado }) =>
    ({
      CONFIRMADA: '#2f5a24',
      ASISTIO: '#1d4a78',
      NO_ASISTIO: '#7d5b12',
      CANCELADA: '#8c1d1d',
    }[$estado] || '#502b3a')};
`;

const ClientInfo = styled.div`
  font-size: 13px;
  color: #2a1c21;

  .name {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 4px;
  }
  .contact {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    color: #665e53;
    font-size: 12px;
    margin-top: 4px;

    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  }
  .comentario {
    margin-top: 6px;
    font-style: italic;
    font-size: 12px;
    background: #fff;
    padding: 6px 8px;
    border-radius: 4px;
    border-left: 2px solid #c2a478;
    color: #554e44;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px dashed #e5dfd5;
`;

const SmallActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #fff;
  border: 1px solid var(--tn-rule, #e5e0d8);
  padding: 4px 8px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  color: ${({ $danger }) => ($danger ? '#b91c1c' : '#502b3a')};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#fee2e2' : '#f5f0e6')};
  }
`;

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const getFechaKey = (fechaRaw) => {
  if (!fechaRaw) return '';
  if (typeof fechaRaw === 'string') return fechaRaw.slice(0, 10);
  const d = new Date(fechaRaw);
  return d.toISOString().slice(0, 10);
};

const AdminReservasCalendario = ({
  reservas = [],
  onReprogramar,
  onCancelar,
  onCambiarAsistencia,
}) => {
  const hoyIso = new Date().toISOString().slice(0, 10);

  // Fecha de referencia para el mes que estamos visualizando
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(hoyIso);
  const [filtroTipo, setFiltroTipo] = useState('todos'); // 'todos' | 'cata' | 'menu'

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Nombre del mes y año en español
  const mesNombre = useMemo(() => {
    return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(currentDate);
  }, [currentDate]);

  // Agrupar reservas por fecha YYYY-MM-DD
  const reservasPorFecha = useMemo(() => {
    const mapa = {};
    reservas.forEach((r) => {
      if (filtroTipo !== 'todos' && r.tipo !== filtroTipo) return;
      const key = getFechaKey(r.sesion?.fecha);
      if (!key) return;
      if (!mapa[key]) mapa[key] = [];
      mapa[key].push(r);
    });

    // Ordenar turnos de cada día cronológicamente por hora
    Object.keys(mapa).forEach((k) => {
      mapa[k].sort((a, b) => (a.sesion?.hora || '').localeCompare(b.sesion?.hora || ''));
    });

    return mapa;
  }, [reservas, filtroTipo]);

  // Construcción de la matriz mensual (días del mes + relleno previo y posterior)
  const daysInGrid = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Ajustar primer día de semana a Lunes (0 = domingo en JS, queremos 0 = lunes)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days = [];

    // Días del mes anterior para rellenar la primera semana
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const f = new Date(year, month - 1, d);
      days.push({
        dateObj: f,
        dateKey: f.toISOString().slice(0, 10),
        dayNum: d,
        isCurrentMonth: false,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const f = new Date(year, month, i);
      days.push({
        dateObj: f,
        dateKey: f.toISOString().slice(0, 10),
        dayNum: i,
        isCurrentMonth: true,
      });
    }

    // Días del mes siguiente para completar la última semana (múltiplo de 7)
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        const f = new Date(year, month + 1, i);
        days.push({
          dateObj: f,
          dateKey: f.toISOString().slice(0, 10),
          dayNum: i,
          isCurrentMonth: false,
        });
      }
    }

    return days;
  }, [year, month]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleGoToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now.toISOString().slice(0, 10));
  };

  // Reservas del día seleccionado
  const reservasDiaSeleccionado = useMemo(() => {
    return reservasPorFecha[selectedDate] || [];
  }, [reservasPorFecha, selectedDate]);

  const totalPaxDia = useMemo(() => {
    return reservasDiaSeleccionado
      .filter((r) => r.estado !== 'CANCELADA')
      .reduce((acc, cur) => acc + (cur.personas || 0), 0);
  }, [reservasDiaSeleccionado]);

  // Formato legible para el encabezado del detalle
  const fechaDetalleLegible = useMemo(() => {
    if (!selectedDate) return '';
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const str = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(dateObj);
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }, [selectedDate]);

  return (
    <CalendarioWrapper>
      <HeaderTop>
        <TitleBox>
          <h2>
            <CalendarIcon size={22} color="#C2A478" />
            Calendario de Turnos Agendados
          </h2>
          <p>Visualización mensual de visitas, catas y comidas reservadas por clientes</p>
        </TitleBox>

        <ControlsBar>
          <FilterPills>
            <FilterPill
              $active={filtroTipo === 'todos'}
              onClick={() => setFiltroTipo('todos')}
            >
              Todos
            </FilterPill>
            <FilterPill
              $active={filtroTipo === 'cata'}
              onClick={() => setFiltroTipo('cata')}
            >
              <Wine size={13} color="#502B3A" /> Catas
            </FilterPill>
            <FilterPill
              $active={filtroTipo === 'menu'}
              onClick={() => setFiltroTipo('menu')}
            >
              <UtensilsCrossed size={13} color="#c2410c" /> Menús
            </FilterPill>
          </FilterPills>

          <TodayBtn onClick={handleGoToday}>Hoy</TodayBtn>

          <MonthNav>
            <NavBtn onClick={handlePrevMonth} aria-label="Mes anterior">
              <ChevronLeft size={16} />
            </NavBtn>
            <span>{mesNombre}</span>
            <NavBtn onClick={handleNextMonth} aria-label="Mes siguiente">
              <ChevronRight size={16} />
            </NavBtn>
          </MonthNav>
        </ControlsBar>
      </HeaderTop>

      {/* Grilla de días */}
      <CalendarGrid>
        {DIAS_SEMANA.map((dia) => (
          <WeekHeaderCell key={dia}>{dia}</WeekHeaderCell>
        ))}

        {daysInGrid.map((item) => {
          const dayShifts = reservasPorFecha[item.dateKey] || [];
          const isSelected = selectedDate === item.dateKey;
          const isToday = item.dateKey === hoyIso;

          return (
            <DayCell
              key={item.dateKey}
              $isCurrentMonth={item.isCurrentMonth}
              $isSelected={isSelected}
              onClick={() => setSelectedDate(item.dateKey)}
            >
              <DayNumberRow>
                <DayNumber $isToday={isToday} $isCurrentMonth={item.isCurrentMonth}>
                  {item.dayNum}
                </DayNumber>
                {dayShifts.length > 0 && (
                  <TurnosCountBadge>{dayShifts.length}</TurnosCountBadge>
                )}
              </DayNumberRow>

              <ShiftsContainer>
                {dayShifts.slice(0, 3).map((r) => {
                  const expTitulo =
                    r.sesion?.cata?.titulo || r.sesion?.menu?.titulo || 'Experiencia';
                  const isCancelada = r.estado === 'CANCELADA';

                  return (
                    <ShiftPill
                      key={`${r.tipo}-${r.id}`}
                      $tipo={r.tipo}
                      $cancelada={isCancelada}
                      title={`${r.sesion?.hora} · ${expTitulo} (${r.personas} pax) - ${r.nombre}`}
                    >
                      <span className="hora">{r.sesion?.hora}</span>
                      <span className="titulo">{expTitulo}</span>
                    </ShiftPill>
                  );
                })}

                {dayShifts.length > 3 && (
                  <MoreShifts>+{dayShifts.length - 3} más...</MoreShifts>
                )}
              </ShiftsContainer>
            </DayCell>
          );
        })}
      </CalendarGrid>

      {/* Detalle interactivo del día seleccionado */}
      <DetailPanel>
        <DetailHeader>
          <h3>
            <CalendarClock size={18} color="#C2A478" />
            Turnos agendados: {fechaDetalleLegible}
          </h3>
          <TotalPaxTag>
            {reservasDiaSeleccionado.length}{' '}
            {reservasDiaSeleccionado.length === 1 ? 'turno' : 'turnos'} · {totalPaxDia}{' '}
            asistentes confirmados
          </TotalPaxTag>
        </DetailHeader>

        {reservasDiaSeleccionado.length === 0 ? (
          <p style={{ color: '#8c8273', fontSize: 13, margin: '8px 0' }}>
            No hay turnos ni reservas programadas para este día.
          </p>
        ) : (
          <DetailCardsGrid>
            {reservasDiaSeleccionado.map((r) => {
              const expTitulo =
                r.sesion?.cata?.titulo || r.sesion?.menu?.titulo || 'Experiencia';
              const isCancelada = r.estado === 'CANCELADA';

              return (
                <BookingCard key={`${r.tipo}-${r.id}`}>
                  <BookingCardHeader>
                    <div>
                      <ExpTypeBadge $tipo={r.tipo}>
                        {r.tipo === 'menu' ? (
                          <UtensilsCrossed size={12} />
                        ) : (
                          <Wine size={12} />
                        )}
                        {r.tipo === 'menu' ? 'Menú' : 'Cata'}
                      </ExpTypeBadge>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          marginTop: 4,
                          color: '#502b3a',
                        }}
                      >
                        {expTitulo}
                      </div>
                    </div>
                    <StatusPill $estado={r.estado}>{r.estado}</StatusPill>
                  </BookingCardHeader>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#502b3a',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Clock size={13} color="#C2A478" /> {r.sesion?.hora} h
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Users size={13} color="#C2A478" /> {r.personas}{' '}
                      {r.personas === 1 ? 'persona' : 'personas'}
                    </span>
                    <span style={{ color: '#8c8273' }}>({r.codigo})</span>
                  </div>

                  <ClientInfo>
                    <div className="name">{r.nombre}</div>
                    <div className="contact">
                      <span>
                        <Phone size={12} /> {r.telefono}
                      </span>
                      <span>
                        <Mail size={12} /> {r.email}
                      </span>
                    </div>
                    {r.comentarios && (
                      <div className="comentario">"{r.comentarios}"</div>
                    )}
                  </ClientInfo>

                  <CardActions>
                    {!isCancelada && (
                      <>
                        {r.estado !== 'ASISTIO' && onCambiarAsistencia && (
                          <SmallActionBtn
                            onClick={() => onCambiarAsistencia(r, 'ASISTIO')}
                          >
                            <Check size={12} /> Asistió
                          </SmallActionBtn>
                        )}
                        {r.estado === 'CONFIRMADA' && onReprogramar && (
                          <SmallActionBtn onClick={() => onReprogramar(r)}>
                            <CalendarClock size={12} /> Reprogramar
                          </SmallActionBtn>
                        )}
                        {r.estado === 'CONFIRMADA' && onCancelar && (
                          <SmallActionBtn
                            $danger
                            onClick={() => onCancelar(r)}
                          >
                            <Ban size={12} /> Cancelar
                          </SmallActionBtn>
                        )}
                      </>
                    )}
                  </CardActions>
                </BookingCard>
              );
            })}
          </DetailCardsGrid>
        )}
      </DetailPanel>
    </CalendarioWrapper>
  );
};

export default AdminReservasCalendario;
