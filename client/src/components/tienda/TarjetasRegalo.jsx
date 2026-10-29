import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api, { getResolvedImageUrl } from '../../services/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const SectionWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem 3rem;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3rem 1.25rem 2rem;
  }
`;

const Section = styled.section`
  width: 100%;
`;

const Heading = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: end;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 16px 0;
  font-weight: 700;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  font-size: clamp(2.4rem, 4.5vw, 4.2rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Intro = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.84rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.9;

  p {
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: #f4f2eb;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(80, 43, 58, 0.08);
  }
`;

const CardImage = styled.div`
  height: 220px;
  overflow: hidden;
  background-color: #e6dfd5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
`;

const CardHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: 1.65rem;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const CardPrice = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  margin: 0;
`;

const InfoText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.82rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 11px 20px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const SecondaryButton = styled.button`
  padding: 11px 18px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 999px;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(80, 43, 58, 0.05);
  }
`;

// ─── Features Practical Bar (regalaTuExperiencia.md) ────────────────────────
const PracticalWrap = styled.div`
  width: 100%;
  margin: 3.5rem 0 0;
`;

const PracticalBar = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: #f4f2eb;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 1.5rem;
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    color: ${({ theme }) => theme.colors.primary};

    & + div {
      border-left: 1px solid ${({ theme }) => theme.colors.border};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      & + div {
        border-left: 0;
        border-top: 1px solid ${({ theme }) => theme.colors.border};
      }
    }

    strong {
      display: block;
      font-size: 0.85rem;
      margin-bottom: 4px;
    }

    small {
      font-size: 0.72rem;
      line-height: 1.5;
    }
  }
`;

const PracticalIcon = styled.span`
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e9dfd2;
  display: grid;
  place-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;


// ─── Modal para solicitar tarjeta de regalo ─────────────────────────────────
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(40, 20, 28, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: #f4f2eb;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
  padding: 2.25rem;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);

  h3 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 8px 0;
  }

  p {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: 0.85rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.85;
    margin: 0 0 1.5rem 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  input, textarea {
    width: 100%;
    padding: 13px 15px;
    border: 1px solid #e0ddd5;
    background: #f2ece4;
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.primary};
    box-sizing: border-box;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const DEFAULT_TARJETAS = [
  {
    id: 1,
    titulo: 'Bono regalo 1',
    precio: '150 € / 2 pax',
    portada: '/images/catas-menus-experiencias/experiencia-3-vinos.webp',
    descripcion: 'Incluye recorrido guiado por la bodega y viñedos, cata de 3 vinos y maridaje de aperitivos típicos mallorquines para dos personas.',
  },
  {
    id: 2,
    titulo: 'Bono regalo 2',
    precio: '250 € / 2 pax',
    portada: '/images/catas-menus-experiencias/cata-5-vinos.webp',
    descripcion: 'Experiencia enológica y gastronómica completa para dos personas: visita a viñedos, cata de autor y almuerzo maridado en nuestra terraza con vistas a la Sierra de Tramuntana.',
  },
  {
    id: 3,
    titulo: 'Bono personalizado',
    precio: 'Consultar',
    portada: '/images/catas-menus-experiencias/experiencia-5-vinos.webp',
    descripcion: 'Diseña una experiencia a tu medida: catas privadas, almuerzos entre viñas, celebraciones especiales o regalos corporativos. Solicita presupuesto sin compromiso.',
  },
];

const resolveBonoImage = (t) => {
  const title = (t.titulo || '').toLowerCase();
  if (!t.portada || t.portada.startsWith('/assets/') || t.portada === '/isologo.png') {
    if (title.includes('personalizado')) return '/images/catas-menus-experiencias/experiencia-5-vinos.webp';
    if (title.includes('2')) return '/images/catas-menus-experiencias/cata-5-vinos.webp';
    return '/images/catas-menus-experiencias/experiencia-3-vinos.webp';
  }
  return t.portada;
};

const formatearPrecio = (t) => {
  if (typeof t.precio === 'string' && (t.precio.includes('€') || t.precio.toLowerCase().includes('consultar'))) {
    return t.precio;
  }
  const num = Number(t.precio);
  if (!num || num === 0 || t.titulo.toLowerCase().includes('personalizado')) {
    return 'Consultar';
  }
  return `${num.toFixed(0)} € / 2 pax`;
};

const TarjetasRegalo = () => {
  const [tarjetas, setTarjetas] = useState(DEFAULT_TARJETAS);
  const [infoAbierta, setInfoAbierta] = useState(null);
  const [modalBono, setModalBono] = useState(null);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorSolicitud, setErrorSolicitud] = useState('');
  const [codigoSolicitud, setCodigoSolicitud] = useState('');
  const [datosContacto, setDatosContacto] = useState({
    nombre: '',
    email: '',
    telefono: '',
    destinatario: '',
    mensaje: '',
  });

  useEffect(() => {
    let activo = true;
    api.get('/tarjetas')
      .then((data) => {
        if (activo && Array.isArray(data) && data.length > 0) {
          const activas = data.filter((t) => t.activo !== false);
          activas.sort((a, b) => {
            const orden = { 'bono regalo 1': 1, 'bono regalo 2': 2, 'bono personalizado': 3 };
            const ordA = orden[a.titulo.toLowerCase()] || a.id;
            const ordB = orden[b.titulo.toLowerCase()] || b.id;
            return ordA - ordB;
          });
          if (activas.length > 0) {
            setTarjetas(
              activas.map((t) => ({
                id: t.id,
                titulo: t.titulo,
                precio: formatearPrecio(t),
                portada: t.portada || '/assets/bono-regalo-1.jpg',
                descripcion: t.descripcion,
              }))
            );
          }
        }
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, []);

  const handleRegalar = (bono) => {
    setModalBono(bono);
    setSolicitudEnviada(false);
    setErrorSolicitud('');
    setCodigoSolicitud('');
  };

  const cerrarModal = () => {
    setModalBono(null);
    if (solicitudEnviada) {
      setDatosContacto({ nombre: '', email: '', telefono: '', destinatario: '', mensaje: '' });
      setSolicitudEnviada(false);
      setCodigoSolicitud('');
    }
  };

  const handleSubmitSolicitud = async (e) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setErrorSolicitud('');
    try {
      const res = await api.post('/pedidos-tarjetas', { ...datosContacto, tarjetaId: modalBono.id });
      setCodigoSolicitud(res?.codigo || '');
      setSolicitudEnviada(true);
    } catch (err) {
      setErrorSolicitud(err.message || 'No se pudo enviar la solicitud. Inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <SectionWrapper id="regala-tu-experiencia" style={{ scrollMarginTop: '110px' }}>
      <Section className="enoturismo-experiences-section">
        <Heading className="enoturismo-section-heading" data-reveal="up">
          <div>
            <Eyebrow className="enoturismo-panel-eyebrow">NUESTRAS EXPERIENCIAS</Eyebrow>
            <Title>Regala una experiencia inolvidable</Title>
          </div>
          <Intro className="enoturismo-intro-copy">
            <p>
              Regala una cata, una visita o una experiencia gastronómica en Son Aloy.
              Los bonos se envían por email, son personalizables y tienen una validez de 12 meses.
            </p>
          </Intro>
        </Heading>

        <Grid
          className="enoturismo-card-grid is-three-columns"
          data-reveal-group="85"
          data-reveal-group-type="media"
          data-reveal-cols="3"
        >
          {tarjetas.map((t) => {
            const isInfoOpen = infoAbierta === t.id;
            const imgSrc = getResolvedImageUrl(resolveBonoImage(t));
            return (
              <Card key={t.id} className="enoturismo-experience-card">
                <CardImage className="enoturismo-card-image">
                  <img src={imgSrc} alt={t.titulo} loading="lazy" />
                </CardImage>

                <CardBody className="enoturismo-card-body">
                  <CardHeading className="enoturismo-card-heading">
                    <CardTitle>{t.titulo}</CardTitle>
                    <CardPrice>{t.precio}</CardPrice>
                  </CardHeading>

                  {isInfoOpen && <InfoText>{t.descripcion}</InfoText>}

                  <Actions className="enoturismo-card-actions">
                    <PrimaryButton
                      type="button"
                      className="is-primary"
                      id={`btn-regalar-${t.id}`}
                      onClick={() => handleRegalar(t)}
                    >
                      REGALAR →
                    </PrimaryButton>
                    <SecondaryButton
                      type="button"
                      className="is-secondary"
                      aria-expanded={isInfoOpen}
                      onClick={() => setInfoAbierta((s) => (s === t.id ? null : t.id))}
                    >
                      + INFO {isInfoOpen ? '▲' : '▼'}
                    </SecondaryButton>
                  </Actions>
                </CardBody>
              </Card>
            );
          })}
        </Grid>

        {/* Features Practical Bar (regalaTuExperiencia.md) */}
        <PracticalWrap className="enoturismo-practical-wrap">
          <PracticalBar className="enoturismo-practical-bar" aria-label="Información práctica">
            <div>
              <PracticalIcon className="enoturismo-practical-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 7.5V12l3 2" />
                </svg>
              </PracticalIcon>
              <span>
                <strong>Horarios</strong>
                <small>Lunes a viernes · 10:00 – 17:00<br />Sábados y domingos · Cerrado</small>
              </span>
            </div>

            <div>
              <PracticalIcon className="enoturismo-practical-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="9" r="3" />
                  <circle cx="16.5" cy="10" r="2.5" />
                  <path d="M3.5 19c.7-3.4 2.6-5.2 5.5-5.2s4.8 1.8 5.5 5.2M14 14.5c3.4-.4 5.5 1.1 6.5 4.5" />
                </svg>
              </PracticalIcon>
              <span>
                <strong>Aforo limitado</strong>
                <small>Máximo 10 personas.<br />Para grupos mayores, consulta disponibilidad</small>
              </span>
            </div>

            <div>
              <PracticalIcon className="enoturismo-practical-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
                  <path d="m4.5 7 7.5 6 7.5-6" />
                </svg>
              </PracticalIcon>
              <span>
                <strong>Reservas</strong>
                <small>enoturismo@bodegasantacatarina.com</small>
              </span>
            </div>
          </PracticalBar>
        </PracticalWrap>


      </Section>

      {/* Modal para solicitar bono regalo */}
      {modalBono && (
        <ModalOverlay onClick={cerrarModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton type="button" onClick={cerrarModal} aria-label="Cerrar">×</CloseButton>
            {solicitudEnviada ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h3>¡Solicitud recibida!</h3>
                <p>
                  Gracias <strong>{datosContacto.nombre}</strong>. Hemos enviado a <strong>{datosContacto.email}</strong> tu <strong>{modalBono.titulo}</strong> personalizado con todos los datos indicados y nos pondremos en contacto contigo en breve para completar su activación.
                  {codigoSolicitud && (
                    <>
                      <br />
                      N° de Bono: <strong>{codigoSolicitud}</strong>
                    </>
                  )}
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                  {codigoSolicitud && (
                    <PrimaryButton
                      as="a"
                      href={`${API_BASE_URL}/pedidos-tarjetas/bono/${encodeURIComponent(codigoSolicitud)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      Ver / Imprimir Bono Regalo →
                    </PrimaryButton>
                  )}
                  <SecondaryButton type="button" onClick={cerrarModal}>
                    Cerrar
                  </SecondaryButton>
                </div>
              </div>
            ) : (
              <>
                <h3>Solicitar {modalBono.titulo}</h3>
                <p>
                  Completa tus datos y los de la persona destinataria. Recibirás por email el Bono Regalo personalizado (anverso y reverso).
                </p>
                <form onSubmit={handleSubmitSolicitud}>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo *"
                    value={datosContacto.nombre}
                    onChange={(e) => setDatosContacto({ ...datosContacto, nombre: e.target.value })}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Tu email de contacto *"
                    value={datosContacto.email}
                    onChange={(e) => setDatosContacto({ ...datosContacto, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono de contacto *"
                    value={datosContacto.telefono}
                    onChange={(e) => setDatosContacto({ ...datosContacto, telefono: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="PARA: Nombre de la persona destinataria"
                    value={datosContacto.destinatario}
                    onChange={(e) => setDatosContacto({ ...datosContacto, destinatario: e.target.value })}
                  />
                  <textarea
                    rows={3}
                    placeholder="Dedicatoria para el bono regalo (opcional)"
                    value={datosContacto.mensaje}
                    onChange={(e) => setDatosContacto({ ...datosContacto, mensaje: e.target.value })}
                  />
                  {errorSolicitud && (
                    <p role="alert" style={{ color: '#8c1d1d', margin: 0 }}>{errorSolicitud}</p>
                  )}
                  <div className="modal-actions">
                    <SecondaryButton type="button" onClick={cerrarModal}>
                      Cancelar
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={enviando}>
                      {enviando ? 'Enviando…' : 'Enviar solicitud'}
                    </PrimaryButton>
                  </div>
                </form>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </SectionWrapper>
  );
};

export default TarjetasRegalo;
