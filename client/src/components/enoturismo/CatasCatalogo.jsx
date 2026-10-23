import { useState } from 'react';
import styled from 'styled-components';
import { getResolvedImageUrl } from '../../services/api';

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0 2rem;
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
  font-size: clamp(2.4rem, 4.5vw, 4.2rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Intro = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.82rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.primary};

  p + p {
    margin-top: 12px;
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
`;

const CardImage = styled.div`
  height: 200px;
  background-image: url(${(p) => p.$src});
  background-size: cover;
  background-position: center;
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
  font-weight: ${({ theme }) => theme.typography.weights.regular};
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
`;

const Empty = styled.p`
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  color: ${({ theme }) => theme.colors.primary};
  padding: 3rem 0;
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

  &:hover { background: ${({ theme }) => theme.colors.primary}; }
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
`;

const InfoText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.8rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const formatearDuracion = (cata) => {
  if (cata.duracion) return cata.duracion;
  const h = Math.floor(cata.duracionMin / 60);
  const m = cata.duracionMin % 60;
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(' ');
};

const CatasCatalogo = ({ catas, cargando, onReservar }) => {
  const [infoAbierta, setInfoAbierta] = useState(null);

  return (
    <Section id="experiencias-enoturismo">
      <Heading>
        <div>
          <Eyebrow>NUESTRAS EXPERIENCIAS</Eyebrow>
          <Title>Descubre el vino desde su origen</Title>
        </div>
        <Intro>
          <p>Descubre el origen de nuestros vinos recorriendo la historia, los viñedos, la bodega y las salas de elaboración y crianza de Bodega Santa Catarina.</p>
          <p>Una experiencia guiada que combina tradición, innovación, sostenibilidad y pasión por Mallorca y sus variedades autóctonas.</p>
        </Intro>
      </Heading>

      {!cargando && catas.length === 0 && <Empty>Próximamente publicaremos nuevas experiencias.</Empty>}

      <Grid>
        {catas.map((cata) => (
          <Card key={cata.id}>
            <CardImage $src={getResolvedImageUrl(cata.portada)} role="img" aria-label={cata.titulo} />
            <CardBody>
              <CardHeading>
                <CardTitle>{cata.titulo}</CardTitle>
                <CardPrice>{Number(cata.precio).toFixed(0)} €/pax</CardPrice>
              </CardHeading>

              <Meta>⏱ {formatearDuracion(cata)} · MÁX. {cata.cupoPorSesion} PERSONAS</Meta>

              {infoAbierta === cata.id && <InfoText>{cata.descripcion}</InfoText>}

              <Actions>
                <PrimaryButton type="button" id={`btn-reservar-${cata.id}`} onClick={() => onReservar(cata.id)}>
                  RESERVAR VISITA →
                </PrimaryButton>
                <SecondaryButton
                  type="button"
                  aria-expanded={infoAbierta === cata.id}
                  onClick={() => setInfoAbierta((s) => (s === cata.id ? null : cata.id))}
                >
                  + INFO {infoAbierta === cata.id ? '▲' : '▼'}
                </SecondaryButton>
              </Actions>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default CatasCatalogo;
