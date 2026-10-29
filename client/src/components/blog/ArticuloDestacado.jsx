import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import defaultVendimiaImg from '../../imports/Santa_Catarina_Vendimia_284.jpg';

const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(3.5rem, 6vw, 5.5rem) 2rem;
  box-sizing: border-box;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
`;

const CategoryBadge = styled.span`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: rgb(242, 236, 228);
  background-color: rgb(80, 43, 58);
  padding: 5px 14px;
  border-radius: 100px;
  text-transform: uppercase;
  display: inline-block;
`;

const MetaDate = styled.span`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.75rem;
  color: rgb(80, 43, 58);
`;

const MainTitle = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  font-weight: 600;
  color: rgb(80, 43, 58);
  line-height: 1.15;
  margin-bottom: 32px;
  max-width: 820px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 520px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    height: 320px;
    margin-bottom: 28px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 5rem;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr 360px;
    gap: 3rem;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ArticleBody = styled.div`
  min-width: 0;
`;

const LeadParagraph = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 1.05rem;
  line-height: 1.85;
  color: rgb(80, 43, 58);
  margin-bottom: 24px;
  font-style: italic;
`;

const BodyParagraph = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.95rem;
  line-height: 1.9;
  color: rgb(80, 43, 58);
  margin-bottom: 20px;
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CardProxima = styled.div`
  background: rgb(244, 242, 235);
  border: 1px solid rgb(224, 221, 213);
  border-radius: 12px;
  padding: 2rem;
`;

const CardEyebrow = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: rgb(194, 164, 120);
  margin-bottom: 14px;
  text-transform: uppercase;
`;

const CardTitleProxima = styled.p`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(80, 43, 58);
  margin-bottom: 12px;
  line-height: 1.25;
`;

const CardTextProxima = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgb(80, 43, 58);
  margin-bottom: 20px;
`;

const OutlinedButtonWine = styled(Link)`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgb(80, 43, 58);
  background: transparent;
  border: 1px solid rgb(80, 43, 58);
  border-radius: 100px;
  padding: 10px 22px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(80, 43, 58);
    color: rgb(242, 236, 228);
  }
`;

const CardTarjetas = styled.div`
  background: rgb(80, 43, 58);
  border-radius: 12px;
  padding: 2rem;
`;

const CardTitleTarjetas = styled.p`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(242, 236, 228);
  margin-bottom: 12px;
  line-height: 1.25;
`;

const CardTextTarjetas = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgba(242, 236, 228, 0.565);
  margin-bottom: 20px;
`;

const OutlinedButtonLight = styled(Link)`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgb(242, 236, 228);
  background: transparent;
  border: 1px solid rgba(242, 236, 228, 0.376);
  border-radius: 100px;
  padding: 10px 22px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgb(242, 236, 228);
    background: rgba(242, 236, 228, 0.1);
  }
`;

const MoreArticlesCard = styled.div`
  background: rgb(244, 242, 235);
  border: 1px solid rgb(224, 221, 213);
  border-radius: 12px;
  padding: 1.5rem;
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ArticleListItem = styled.button`
  background: none;
  border: none;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid rgb(224, 221, 213);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: opacity 0.2s ease;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  h5 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: ${(p) => (p.$active ? '700' : '600')};
    color: rgb(80, 43, 58);
    margin: 0;
    line-height: 1.25;
    text-decoration: ${(p) => (p.$active ? 'underline' : 'none')};
  }

  span {
    font-family: 'Manrope', 'Raleway', sans-serif;
    font-size: 0.7rem;
    color: rgba(80, 43, 58, 0.65);
  }

  &:hover {
    opacity: 0.8;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(224, 221, 213);
`;

const GalleryThumb = styled.img`
  width: 100%;
  height: 96px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgb(224, 221, 213);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ExternalLinkBox = styled.div`
  margin-top: 1.75rem;
  padding: 14px 18px;
  background: rgb(244, 242, 235);
  border-radius: 8px;
  border-left: 3px solid rgb(194, 164, 120);
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.85rem;
  color: rgb(80, 43, 58);

  a {
    color: rgb(80, 43, 58);
    font-weight: 600;
    text-decoration: underline;
    margin-left: 4px;
  }
`;

const DEFAULT_ARTICLE = {
  id: 1,
  titulo: 'Vendimia 2024: la cosecha del renacimiento',
  categoria: 'NOTICIAS DE LA BODEGA',
  fecha: '2024-10-15',
  portada: defaultVendimiaImg,
  descripcion: `La cosecha de 2024 marca un antes y un después en Bodega Santa Catarina. Temperaturas ideales, maduración perfecta y un Manto Negro que promete ser histórico. Los viñedos de Son Aloy ofrecieron este año su mejor expresión en cuatro décadas de historia.

El otoño llegó tarde a Sencelles este año, pero llegó bien. Tras un verano de calor moderado y noches frescas que preservaron la acidez, la vendimia arrancó a mediados de septiembre con las variedades blancas. El Prensal y el Chardonnay dieron uvas de piel gruesa, aroma intenso y un perfecto equilibrio azúcar-acidez.

Las tintas, en cambio, esperaron hasta octubre. El Manto Negro y el Callet, las dos variedades autóctonas que dan carácter a la Colección Sta, alcanzaron una madurez fenólica excepcional. "Llevamos años esperando una cosecha así", reconoce Marta Alcover, nuestra enóloga jefa. "El frío de las noches de septiembre fue el factor clave."

En bodega, la decisión fue trabajar con levaduras autóctonas y reducir la intervención al mínimo. El objetivo: que el vino cuente la historia de este año sin filtros. Los primeros análisis son prometedores: el 2024 será, sin duda, una de las mejores añadas en la historia de Santa Catarina.`,
  galeria: [],
  enlace: '',
};

function parseParagraphs(text) {
  if (!text) return [];
  // If text contains HTML tags like <p>, extract them
  if (/<p[\s>]/i.test(text)) {
    const matches = text.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    if (matches && matches.length > 0) {
      return matches.map((m) => m.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    }
  }
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function formatFecha(fechaInput) {
  if (!fechaInput) return 'Octubre 2024';
  const d = new Date(fechaInput);
  if (!isNaN(d.getTime())) {
    const mes = d.toLocaleDateString('es-ES', { month: 'long' });
    const year = d.getFullYear();
    return `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${year}`;
  }
  return fechaInput;
}

const ArticuloDestacado = () => {
  const [articulos, setArticulos] = useState([DEFAULT_ARTICLE]);
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    api.get('/blog')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activos = data
            .filter((a) => a.activo !== false)
            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime() || b.id - a.id);
          if (activos.length > 0) {
            setArticulos(activos);
            setSelectedId(activos[0].id);
          }
        }
      })
      .catch((err) => {
        console.warn('[ArticuloDestacado] Error al cargar artículos del blog:', err);
      });
  }, []);

  const articuloActual =
    articulos.find((a) => a.id === selectedId) || articulos[0] || DEFAULT_ARTICLE;

  const fechaFmt = formatFecha(articuloActual.fecha);

  const galeria = (
    Array.isArray(articuloActual.galeria)
      ? articuloActual.galeria
      : typeof articuloActual.galeria === 'string'
        ? JSON.parse(articuloActual.galeria || '[]')
        : []
  ).filter(
    (url) =>
      url &&
      typeof url === 'string' &&
      !url.includes('isologo') &&
      !url.includes('placeholder')
  );

  const paragraphs = parseParagraphs(articuloActual.descripcion);

  // Determine image source
  let imgSrc = articuloActual.portada;
  if (!imgSrc || imgSrc === '/isologo.png' || imgSrc.includes('placeholder')) {
    imgSrc = defaultVendimiaImg;
  }

  return (
    <Section>
      <div data-reveal="up">
        <MetaRow>
          <CategoryBadge>
            {articuloActual.categoria || 'NOTICIAS DE LA BODEGA'}
          </CategoryBadge>
          <MetaDate>{fechaFmt}</MetaDate>
        </MetaRow>

        <MainTitle>{articuloActual.titulo}</MainTitle>
      </div>

      <ImageWrapper data-reveal="media" data-reveal-delay="85">
        <HeroImage
          src={imgSrc}
          alt={articuloActual.titulo}
          onError={(e) => {
            e.currentTarget.src = defaultVendimiaImg;
          }}
        />
      </ImageWrapper>

      <ContentGrid>
        <ArticleBody data-reveal="up">
          {paragraphs.length > 0 ? (
            <>
              <LeadParagraph>{paragraphs[0]}</LeadParagraph>
              {paragraphs.slice(1).map((para, i) => (
                <BodyParagraph key={i}>{para}</BodyParagraph>
              ))}
            </>
          ) : (
            <BodyParagraph>{articuloActual.descripcion}</BodyParagraph>
          )}

          {galeria.length > 0 && (
            <div>
              <p
                style={{
                  fontFamily: "'Manrope', 'Raleway', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'rgb(80, 43, 58)',
                  marginTop: '28px',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                }}
              >
                Galería de imágenes
              </p>
              <GalleryGrid>
                {galeria.map((url, i) => (
                  <GalleryThumb
                    key={i}
                    src={url}
                    alt={`Galería ${i + 1}`}
                    onClick={() => window.open(url, '_blank')}
                  />
                ))}
              </GalleryGrid>
            </div>
          )}

          {articuloActual.enlace && (
            <ExternalLinkBox>
              🔗 <strong>Enlace de interés:</strong>
              <a
                href={articuloActual.enlace}
                target="_blank"
                rel="noopener noreferrer"
              >
                {articuloActual.enlace}
              </a>
            </ExternalLinkBox>
          )}
        </ArticleBody>

        <Aside data-reveal-group="95" data-reveal-cols="2">
          <CardProxima>
            <CardEyebrow>PRÓXIMA COSECHA</CardEyebrow>
            <CardTitleProxima>Vive la vendimia desde adentro</CardTitleProxima>
            <CardTextProxima>
              Reserva tu experiencia de vendimia para otoño 2025 y sé parte de la cosecha desde el viñedo hasta la bodega.
            </CardTextProxima>
            <OutlinedButtonWine to="/enoturismo">
              VER EXPERIENCIAS
            </OutlinedButtonWine>
          </CardProxima>

          <CardTarjetas>
            <CardEyebrow>TARJETAS REGALO</CardEyebrow>
            <CardTitleTarjetas>Regala una experiencia única</CardTitleTarjetas>
            <CardTextTarjetas>
              Tarjetas canjeable por cualquiera de nuestras experiencias. Válidas 12 meses.
            </CardTextTarjetas>
            <OutlinedButtonLight to="/tienda">
              VER TARJETAS REGALO
            </OutlinedButtonLight>
          </CardTarjetas>

          {articulos.length > 1 && (
            <MoreArticlesCard>
              <CardEyebrow>MÁS PUBLICACIONES</CardEyebrow>
              <ArticleList>
                {articulos.map((art) => (
                  <ArticleListItem
                    key={art.id}
                    $active={art.id === articuloActual.id}
                    onClick={() => setSelectedId(art.id)}
                  >
                    <h5>{art.titulo}</h5>
                    <span>{formatFecha(art.fecha)}</span>
                  </ArticleListItem>
                ))}
              </ArticleList>
            </MoreArticlesCard>
          )}
        </Aside>
      </ContentGrid>
    </Section>
  );
};

export default ArticuloDestacado;
