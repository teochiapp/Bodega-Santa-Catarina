import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api, { getResolvedImageUrl } from '../../services/api';
import GastronomiaBooking from './GastronomiaBooking';
import CatasFeatures from './CatasFeatures';

const SectionWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem 3rem;
  box-sizing: border-box;
  scroll-margin-top: 110px;

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
  align-items: flex-start;
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

const Meta = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  font-weight: 600;
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

const BookingToggle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 2rem auto 0;
  padding: 18px 24px;
  border: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.14em;
  cursor: pointer;
  scroll-margin-top: 110px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.95;
  }
`;

const DinnerNotice = styled.p`
  font-family: Manrope, Raleway, sans-serif;
  color: rgb(80, 43, 58);
  line-height: 1.6;
  margin: 1.75rem 0 0;
  font-size: 0.88rem;

  a {
    border-bottom: 1px solid rgb(194, 164, 120);
    padding: 0;
    background: transparent;
    color: rgb(80, 43, 58);
    font: inherit;
    cursor: pointer;
    text-decoration: none;
    font-weight: 400;
    transition: color 0.2s ease;

    &:hover {
      color: rgb(194, 164, 120);
    }
  }
`;

const DEFAULT_MENUS = [
  {
    id: 1,
    titulo: 'Menú Mallorquín',
    precio: 65,
    descripcion: 'Selección de tapas tradicionales mallorquinas maridadas con 3 de nuestros vinos de autor. Una experiencia gastronómica íntima en nuestra terraza con vistas a la Sierra de Tramuntana.',
    duracion: '2 horas',
    cupoPorSesion: 12,
    portada: '/assets/Santa_Catarina_526-yhzhdQ3t.jpg',
  },
  {
    id: 2,
    titulo: 'Menú Paella',
    precio: 75,
    descripcion: 'Auténtica paella ciega de marisco o mixta cocinada a la leña frente a los comensales. Incluye entrantes locales, postre casero y barra libre de vinos Santa Catarina durante la comida.',
    duracion: '2.5 horas',
    cupoPorSesion: 16,
    portada: '/assets/yellow-rice-with-chicken-vegetables-black-slate-background-CxOQ-5eS.jpg',
  },
  {
    id: 3,
    titulo: 'Menú Barbacoa',
    precio: 75,
    descripcion: 'Cortes selectos de carne a la brasa de sarmiento con guarniciones de la huerta, ensaladas mediterráneas y degustación de nuestros tintos de guarda. Ideal para grupos y celebraciones entre viñas.',
    duracion: '3 horas',
    cupoPorSesion: 20,
    portada: '/assets/grilled-meat-cutlet-with-eggplant-mushroom-tomatoes-rosemary-board-tiVwnjVv.jpg',
  },
];

const formatearDuracion = (menu) => {
  if (menu.duracion) return menu.duracion;
  if (!menu.duracionMin) return '2 horas';
  const h = Math.floor(menu.duracionMin / 60);
  const m = menu.duracionMin % 60;
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(' ');
};

const formatearPrecio = (menu) => {
  const num = Number(menu.precio);
  if (menu.titulo.toLowerCase().includes('paella') || menu.titulo.toLowerCase().includes('barbacoa')) {
    return `Desde ${num.toFixed(0)} €/pax`;
  }
  return `${num.toFixed(0)} €/pax`;
};

const ExperienciasGastronomicas = () => {
  const [menus, setMenus] = useState(DEFAULT_MENUS);
  const [infoAbierta, setInfoAbierta] = useState(null);
  const [bookingAbierto, setBookingAbierto] = useState(false);
  const [menuId, setMenuId] = useState('');
  const toggleRef = useRef(null);

  useEffect(() => {
    let activo = true;
    api.get('/menus')
      .then((data) => {
        if (activo && Array.isArray(data) && data.length > 0) {
          const activos = data.filter((m) => m.activo);
          if (activos.length > 0) {
            setMenus(activos);
          }
        }
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, []);

  const handleReservar = (id) => {
    setMenuId(String(id));
    setBookingAbierto(true);
    setTimeout(() => {
      toggleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <SectionWrapper id="experiencias-gastronomicas">
      <Section id="experiencias-enoturismo" className="enoturismo-experiences-section">
        <Heading className="enoturismo-section-heading">
          <div>
            <Eyebrow className="enoturismo-panel-eyebrow">NUESTRAS EXPERIENCIAS</Eyebrow>
            <Title>Descubre los sabores de Mallorca</Title>
          </div>
          <Intro className="enoturismo-intro-copy">
            <p>
              Les ofrecemos la posibilidad de disfrutar con sus familiares o amigos de una comida en medio del campo.
              De la mano de profesionales, vivirán una experiencia totalmente lúdica mientras disfrutan del sol y el aire mediterráneo.
            </p>
          </Intro>
        </Heading>

        <Grid className="enoturismo-card-grid is-three-columns">
          {menus.map((menu) => {
            const isInfoOpen = infoAbierta === menu.id;
            const imgSrc = getResolvedImageUrl(menu.portada || '/assets/Santa_Catarina_526-yhzhdQ3t.jpg');
            return (
              <Card key={menu.id} className="enoturismo-experience-card">
                <CardImage className="enoturismo-card-image">
                  <img src={imgSrc} alt={menu.titulo} loading="lazy" />
                </CardImage>

                <CardBody className="enoturismo-card-body">
                  <CardHeading className="enoturismo-card-heading">
                    <CardTitle>{menu.titulo}</CardTitle>
                    <CardPrice>{formatearPrecio(menu)}</CardPrice>
                  </CardHeading>

                  <Meta>
                    ⏱ {formatearDuracion(menu)} · MÁX. {menu.cupoPorSesion || 12} PERSONAS
                  </Meta>

                  {isInfoOpen && <InfoText>{menu.descripcion}</InfoText>}

                  <Actions className="enoturismo-card-actions">
                    <PrimaryButton
                      type="button"
                      className="is-primary"
                      id={`btn-reservar-menu-${menu.id}`}
                      onClick={() => handleReservar(menu.id)}
                    >
                      RESERVAR VISITA →
                    </PrimaryButton>
                    <SecondaryButton
                      type="button"
                      className="is-secondary"
                      aria-expanded={isInfoOpen}
                      onClick={() => setInfoAbierta((s) => (s === menu.id ? null : menu.id))}
                    >
                      + INFO {isInfoOpen ? '▲' : '▼'}
                    </SecondaryButton>
                  </Actions>
                </CardBody>
              </Card>
            );
          })}
        </Grid>

        <DinnerNotice>
          Para cenas, <Link to="/contacto">contacta con nosotros</Link> y solicita disponibilidad y presupuesto.
        </DinnerNotice>

        <BookingToggle
          ref={toggleRef}
          type="button"
          id="btn-reserva-gastronomia-online"
          aria-expanded={bookingAbierto}
          onClick={() => setBookingAbierto((s) => !s)}
        >
          <span>RESERVA ONLINE · CALENDARIO Y DISPONIBILIDAD</span>
          <span aria-hidden="true">{bookingAbierto ? '−' : '+'}</span>
        </BookingToggle>

        {bookingAbierto && <GastronomiaBooking key={menuId} menus={menus} menuInicial={menuId} />}
        <CatasFeatures />
      </Section>
    </SectionWrapper>
  );
};

export default ExperienciasGastronomicas;
