import { useState, useMemo } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import useDisponibilidadMenu from '../../hooks/useDisponibilidadMenu';
import { CATAS_IDIOMAS, AVISO_IDIOMAS_ADICIONALES, MAX_PERSONAS_POR_RESERVA } from './catasData';

const Layout = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  font-size: clamp(2.3rem, 4vw, 4rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 22px;
`;

const Text = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.92rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 28px;
`;

const Notice = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.82rem;
  line-height: 1.7;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  border-left: 3px solid ${({ theme }) => theme.colors.secondary};
  padding-left: 16px;
  margin: 0 0 24px;
`;

const WhatsApp = styled.a`
  display: inline-block;
  margin-bottom: 28px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.68rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: 4px;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
`;

const InfoCell = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-top: 12px;

  p:first-child {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0 0 6px;
    font-weight: 700;
  }
  p:last-child {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
  }
`;

const Form = styled.form`
  background: #f4f2eb;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }
`;

const fieldStyles = `
  width: 100%;
  padding: 14px;
  border: 1px solid #e0ddd5;
  background: #f2ece4;
  box-sizing: border-box;
`;

const Select = styled.select`
  ${fieldStyles}
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
`;

const Input = styled.input`
  ${fieldStyles}
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
`;

const Textarea = styled.textarea`
  ${fieldStyles}
  grid-column: 1 / -1;
  resize: vertical;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
`;

const CalendarBox = styled.div`
  grid-column: 1 / -1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #f2ece4;
  padding: 1.25rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  p {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-size: 1.35rem;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: capitalize;
    margin: 0;
  }
`;

const NavButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

const WeekDay = styled.span`
  padding: 5px 0;
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

const DayButton = styled.button`
  aspect-ratio: 1 / 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.75rem;
  background: ${({ $selected, $disabled, theme }) =>
    $selected ? theme.colors.primary : $disabled ? 'rgba(80, 43, 58, 0.05)' : '#f4f2eb'};
  color: ${({ $selected, $disabled, theme }) =>
    $selected ? '#fff' : $disabled ? 'rgba(80, 43, 58, 0.33)' : theme.colors.primary};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  text-decoration: ${({ $disabled }) => ($disabled ? 'line-through' : 'none')};
`;

const SlotsBox = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 18px;
  padding-top: 18px;

  > p {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: 0.72rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 12px;
  }
  > p:first-child {
    font-size: 0.62rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Slots = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Slot = styled.button`
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ $selected, theme }) => ($selected ? theme.colors.primary : 'transparent')};
  color: ${({ $selected, theme }) => ($selected ? '#fff' : theme.colors.primary)};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const FullText = styled.p`
  grid-column: 1 / -1;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Submit = styled.button`
  grid-column: 1 / -1;
  padding: 15px;
  background: ${({ theme }) => theme.colors.primary};
  color: #f2ece4;
  border: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;

const Confirmacion = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  color: ${({ theme }) => theme.colors.primary};

  h3 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    font-size: 2rem;
    margin-bottom: 12px;
  }
  p { font-size: 0.85rem; line-height: 1.7; margin-bottom: 20px; }
`;

const ErrorNote = styled.p`
  grid-column: 1 / -1;
  background: #fdf2f2;
  border-left: 4px solid #c93b3b;
  color: #8c1d1d;
  padding: 10px 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0;
`;

const DIAS_SEMANA = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MESES_ADELANTE = 6;
const toIso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const toMes = (d) => toIso(d).slice(0, 7);

const CONTACTO_INICIAL = { nombre: '', telefono: '', email: '', comentarios: '' };

const GastronomiaBooking = ({ menus, menuInicial }) => {
  const hoy = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [mes, setMes] = useState(() => new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const [menuId, setMenuId] = useState(menuInicial || '');
  const [fecha, setFecha] = useState('');
  const [horario, setHorario] = useState('');
  const [personas, setPersonas] = useState(2);
  const [idioma, setIdioma] = useState('');
  const [contacto, setContacto] = useState(CONTACTO_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [reserva, setReserva] = useState(null);

  const { dias, cargando, error: errorDisp, recargar } = useDisponibilidadMenu(menuId, toMes(mes));

  const menu = menus.find((m) => String(m.id) === String(menuId));
  const slots = fecha ? dias[fecha] || [] : [];
  const slotElegido = slots.find((s) => s.hora === horario);
  const maxPersonas = Math.min(MAX_PERSONAS_POR_RESERVA, slotElegido?.disponibles || MAX_PERSONAS_POR_RESERVA);

  const diasDelMes = useMemo(() => {
    const total = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
    const offset = (new Date(mes.getFullYear(), mes.getMonth(), 1).getDay() + 6) % 7; // lunes = 0
    return { total, offset };
  }, [mes]);

  const esMesActual = mes.getFullYear() === hoy.getFullYear() && mes.getMonth() === hoy.getMonth();
  const limite = new Date(hoy.getFullYear(), hoy.getMonth() + MESES_ADELANTE, 1);
  const esMesLimite = mes >= limite;
  const tituloMes = mes.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const listo = menu && fecha && horario && idioma && Number(personas) >= 1 && Number(personas) <= maxPersonas;

  const cambiarMenu = (id) => {
    setMenuId(id);
    setFecha('');
    setHorario('');
    setError('');
  };

  const seleccionarDia = (iso) => {
    setFecha(iso);
    setHorario('');
    setError('');
  };

  const actualizarContacto = (campo) => (e) => setContacto((c) => ({ ...c, [campo]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listo || enviando) return;
    setEnviando(true);
    setError('');
    try {
      const data = await api.post('/reservas', {
        menuId: Number(menuId),
        fecha,
        hora: horario,
        personas: Number(personas),
        idioma,
        ...contacto,
      });
      setReserva(data);
    } catch (err) {
      setError(err.message || 'No se pudo completar la reserva. Inténtalo de nuevo.');
      setHorario('');
      recargar();
    } finally {
      setEnviando(false);
    }
  };

  const reiniciar = () => {
    setReserva(null);
    setFecha('');
    setHorario('');
    setContacto(CONTACTO_INICIAL);
    recargar();
  };

  return (
    <Layout>
      <div>
        <Eyebrow>RESERVA ONLINE</Eyebrow>
        <Title>Prepara tu comida en el viñedo</Title>
        <Text>
          Elige menú, fecha, horario y número de comensales. Disfruta de la mejor gastronomía
          mallorquina en medio del campo. Recibirás confirmación por email al instante.
        </Text>
        <Notice>La reserva online es gratuita. El importe del menú se abona en la bodega el día de la visita.</Notice>
        <WhatsApp href="https://wa.me/34618672773" target="_blank" rel="noopener noreferrer">
          WHATSAPP ENOTURISMO · +34 618 672 773
        </WhatsApp>
        <InfoGrid>
          <InfoCell><p>HORARIOS</p><p>Almuerzos de 13:30 a 17:00 h</p></InfoCell>
          <InfoCell><p>UBICACIÓN</p><p>Terraza exterior y salón de barricas</p></InfoCell>
          <InfoCell><p>CÓMO LLEGAR</p><p>30 min desde Palma · Finca Son Aloy</p></InfoCell>
          <InfoCell><p>PARKING</p><p>Gratuito en el recinto</p></InfoCell>
        </InfoGrid>
      </div>

      <Form onSubmit={handleSubmit}>
        {reserva ? (
          <Confirmacion role="status">
            <h3>¡Reserva confirmada!</h3>
            <p>
              Gracias <strong>{contacto.nombre}</strong>. Tu código de reserva es <strong>{reserva.codigo}</strong>.<br />
              <strong>{reserva.experiencia}</strong> · {reserva.fecha} a las {reserva.hora} h · {reserva.personas} comensal(es).<br />
              Hemos enviado todos los detalles a <strong>{reserva.email}</strong>.
            </p>
            <Submit type="button" onClick={reiniciar} style={{ maxWidth: 260 }}>NUEVA RESERVA</Submit>
          </Confirmacion>
        ) : (
          <>
            <Select
              $full
              required
              aria-label="Menú gastronómico"
              value={menuId}
              onChange={(e) => cambiarMenu(e.target.value)}
            >
              <option value="">Elige un menú gastronómico</option>
              {menus.map((m) => (
                <option key={m.id} value={m.id}>{m.titulo} · {Number(m.precio).toFixed(0)} €/pax</option>
              ))}
            </Select>

            <CalendarBox aria-busy={cargando}>
              <CalendarHeader>
                <NavButton
                  type="button"
                  aria-label="Mes anterior"
                  disabled={esMesActual}
                  onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))}
                >←</NavButton>
                <p>{tituloMes}</p>
                <NavButton
                  type="button"
                  aria-label="Mes siguiente"
                  disabled={esMesLimite}
                  onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))}
                >→</NavButton>
              </CalendarHeader>

              <DaysGrid>
                {DIAS_SEMANA.map((d) => <WeekDay key={d}>{d}</WeekDay>)}
                {Array.from({ length: diasDelMes.offset }).map((_, i) => <span key={`v${i}`} />)}
                {Array.from({ length: diasDelMes.total }).map((_, i) => {
                  const dia = i + 1;
                  const d = new Date(mes.getFullYear(), mes.getMonth(), dia);
                  const iso = toIso(d);
                  const libre = (dias[iso] || []).some((s) => s.disponibles > 0);
                  return (
                    <DayButton
                      key={dia}
                      type="button"
                      $disabled={!libre}
                      $selected={fecha === iso}
                      disabled={!libre}
                      aria-label={`${libre ? '' : 'No disponible: '}${d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`}
                      onClick={() => seleccionarDia(iso)}
                    >{dia}</DayButton>
                  );
                })}
              </DaysGrid>

              <SlotsBox>
                <p>HORARIOS DISPONIBLES</p>
                <p>{AVISO_IDIOMAS_ADICIONALES}</p>
                {errorDisp && <p style={{ color: '#8c1d1d' }}>{errorDisp}</p>}
                {!menuId ? (
                  <p style={{ fontSize: '0.82rem' }}>Elige primero un menú gastronómico.</p>
                ) : fecha ? (
                  <Slots>
                    {slots.map((s) => (
                      <Slot
                        key={s.hora}
                        type="button"
                        disabled={s.disponibles === 0}
                        $selected={horario === s.hora}
                        onClick={() => setHorario(s.hora)}
                        style={s.disponibles === 0 ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
                      >
                        {s.hora} · {s.disponibles === 0 ? 'completo' : `${s.disponibles} plazas`}
                      </Slot>
                    ))}
                  </Slots>
                ) : (
                  <p style={{ fontSize: '0.82rem' }}>Selecciona primero un día disponible en el calendario.</p>
                )}
              </SlotsBox>
            </CalendarBox>

            <Input required readOnly placeholder="Fecha seleccionada" aria-label="Fecha" value={fecha} />
            <Input required readOnly placeholder="Horario seleccionado" aria-label="Horario" value={horario} />
            <Input required maxLength={120} placeholder="Nombre" aria-label="Nombre" type="text" value={contacto.nombre} onChange={actualizarContacto('nombre')} />
            <Input required pattern="[0-9+() \-]{7,20}" placeholder="Teléfono" aria-label="Teléfono" type="tel" value={contacto.telefono} onChange={actualizarContacto('telefono')} />
            <Input required maxLength={190} placeholder="Email" aria-label="Email" type="email" value={contacto.email} onChange={actualizarContacto('email')} />
            <Input required min="1" max={maxPersonas} placeholder="Nº de comensales" aria-label="Número de comensales" type="number" value={personas} onChange={(e) => setPersonas(e.target.value)} />

            <Select $full required aria-label="Idioma de la experiencia" value={idioma} onChange={(e) => setIdioma(e.target.value)}>
              <option value="">Idioma de atención</option>
              {CATAS_IDIOMAS.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
            </Select>

            <Textarea maxLength={1000} placeholder="Peticiones especiales, intolerancias o alergias (opcional)" aria-label="Comentarios" rows={4} value={contacto.comentarios} onChange={actualizarContacto('comentarios')} />

            {error && <ErrorNote role="alert">{error}</ErrorNote>}
            <FullText>
              {listo
                ? `${menu.titulo} · ${fecha} · ${horario} h · ${personas} comensal(es)`
                : 'Selecciona un día y horario disponibles para continuar.'}
            </FullText>
            <Submit type="submit" disabled={!listo || enviando}>{enviando ? 'CONFIRMANDO…' : 'CONFIRMAR RESERVA'}</Submit>
          </>
        )}
      </Form>
    </Layout>
  );
};

export default GastronomiaBooking;
