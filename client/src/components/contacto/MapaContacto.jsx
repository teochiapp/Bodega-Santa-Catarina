import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ScrollLink } from '../common/ScrollToTop';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background || 'rgb(242, 236, 228)'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  width: 100%;
  height: clamp(420px, 50vh, 560px);
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(194, 164, 120, 0.28);
  border-bottom: 1px solid rgba(194, 164, 120, 0.28);
  background-color: #E8E4DA;
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: contrast(1.02);
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
  background: rgba(244, 242, 235, 0.94);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(194, 164, 120, 0.45);
  border-radius: 6px;
  padding: 16px 22px;
  max-width: 340px;
  box-shadow: 0 10px 30px rgba(80, 43, 58, 0.12);
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 576px) {
    top: 14px;
    left: 14px;
    right: 14px;
    max-width: none;
    padding: 14px 18px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PinIcon = styled.svg`
  width: 16px;
  height: 16px;
  stroke: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  fill: none;
  stroke-width: 2;
  flex-shrink: 0;
`;

const CardEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  margin: 0;
  text-transform: uppercase;
`;

const CardTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.15rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 2px 0 0 0;
  line-height: 1.25;
`;

const CardAddress = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.78rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0 0 4px 0;
`;

const CardButton = styled.a`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #FFFFFF;
  background-color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  padding: 8px 16px;
  border-radius: 2px;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  margin-top: 4px;
  transition: background-color 200ms ease;

  &:hover {
    background-color: #643547;
  }
`;

/* ─── CIERRE FINAL DE LA PÁGINA ─── */
const CierreSection = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(3.5rem, 6vw, 5.5rem) 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CierreEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 14px 0;
`;

const CierreTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.3rem, 4vw, 3.6rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 16px 0;
`;

const CierreSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.95rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  max-width: 600px;
  margin: 0 0 28px 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(ScrollLink)`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 28px;
  background-color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  color: rgb(242, 236, 228);
  border-radius: 2px;
  transition: background-color 200ms ease, transform 150ms ease;

  &:hover {
    background-color: #643547;
    transform: translateY(-2px);
  }
`;

const SecondaryBtn = styled(ScrollLink)`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 28px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  border: 1px solid rgba(80, 43, 58, 0.4);
  border-radius: 2px;
  transition: all 200ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    background-color: rgba(80, 43, 58, 0.05);
    transform: translateY(-2px);
  }
`;

const MapaContacto = () => {
  const mapEmbedUrl =
    'https://maps.google.com/maps?q=Bodega%20Santa%20Catarina%2C%20Carretera%20Inca-Sencelles%20Km%203%2C%2007140%20Sencelles%2C%20Illes%20Balears&t=&z=14&ie=UTF8&iwloc=&output=embed';
  const mapsExternalUrl =
    'https://maps.google.com/?q=Carretera+Inca+Sencelles+Km3+07140+Sencelles+Mallorca';

  return (
    <SectionWrapper>
      {/* ── MAPA INTERACTIVO ── */}
      <MapContainer>
        <FloatingCard
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader>
            <PinIcon viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </PinIcon>
            <CardEyebrow>BODEGA SANTA CATARINA</CardEyebrow>
          </CardHeader>
          <CardTitle>Finca Son Aloy</CardTitle>
          <CardAddress>
            Carretera Inca–Sencelles, Km 3<br />
            07140 Sencelles, Mallorca
          </CardAddress>
          <CardButton
            href={mapsExternalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir en Google Maps →
          </CardButton>
        </FloatingCard>

        <MapIframe
          title="Ubicación de Bodega Santa Catarina en Google Maps"
          src={mapEmbedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </MapContainer>

      {/* ── CIERRE INVITACIÓN ── */}
      <CierreSection>
        <CierreEyebrow>VISÍTANOS EN MALLORCA</CierreEyebrow>
        <CierreTitle
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Te esperamos en Son Aloy
        </CierreTitle>
        <CierreSubtitle>
          Descubre nuestros viñedos, degusta nuestros vinos y vive una experiencia única
          rodeado de la tranquilidad y autenticidad del interior de la isla.
        </CierreSubtitle>

        <ActionButtons>
          <PrimaryBtn to="/enoturismo">
            Reservar experiencia
          </PrimaryBtn>
          <SecondaryBtn to="/donde-comprar">
            Dónde comprar
          </SecondaryBtn>
        </ActionButtons>
      </CierreSection>
    </SectionWrapper>
  );
};

export default MapaContacto;
