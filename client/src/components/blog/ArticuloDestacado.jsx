import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const MainContent = styled.article`
  flex: 3;
`;

const ArticleImage = styled.div`
  width: 100%;
  height: 420px;
  background-color: #d9d9d9;
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background-image: ${(p) => (p.$bg ? `url(${p.$bg})` : 'none')};
  background-size: cover;
  background-position: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const MetaDate = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 32px;
  line-height: 1.25;
`;

const ContentText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  font-size: 15.5px;
  white-space: pre-line;
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const GalleryThumb = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 150ms ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

const ExternalLinkBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
`;

const Sidebar = styled.aside`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Widget = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ArticleListItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: color 150ms ease;

  &:last-child {
    border-bottom: none;
  }

  h5 {
    color: ${(p) => (p.$active ? 'var(--tn-acc, #6e1c24)' : '#333')};
    font-size: 14px;
    font-weight: ${(p) => (p.$active ? '700' : '600')};
    margin-bottom: 4px;
  }

  span {
    font-size: 11px;
    color: #888;
  }

  &:hover h5 {
    color: var(--tn-acc, #6e1c24);
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-decoration: none;
  font-size: 13.5px;
  
  &:hover {
    background-color: #b5952f;
  }
`;

const DEFAULT_ARTICLE = {
  id: 0,
  titulo: 'Vendimia 2024: la cosecha del renacimiento',
  fecha: new Date().toISOString(),
  portada: '/isologo.png',
  descripcion: `La temporada de vendimia siempre es un momento de celebración, pero este año la cosecha representa mucho más. Tras meses de cuidado intensivo bajo nuestra filosofía 100% ecológica, los viñedos han respondido con una calidad excepcional.\n\nEl esfuerzo y la dedicación de nuestro equipo en el campo se ven reflejados en cada racimo de Manto Negro y Prensal. La tierra de Mallorca nos ha regalado unas condiciones climáticas ideales que prometen añadas de guarda extraordinarias para nuestras gamas Surant y 'Nguany.\n\nInvitamos a todos nuestros amigos y clientes a brindar por este renacimiento, porque cada copa servida es el inicio de una nueva historia que compartimos juntos.`,
  galeria: [],
  enlace: '',
};

const ArticuloDestacado = () => {
  const [articulos, setArticulos] = useState([DEFAULT_ARTICLE]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    api.get('/blog')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activos = data.filter((a) => a.activo !== false);
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

  const articuloActual = articulos.find((a) => a.id === selectedId) || articulos[0] || DEFAULT_ARTICLE;

  const fechaFmt = articuloActual.fecha
    ? new Date(articuloActual.fecha).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const galeria = Array.isArray(articuloActual.galeria)
    ? articuloActual.galeria
    : (typeof articuloActual.galeria === 'string'
        ? JSON.parse(articuloActual.galeria || '[]')
        : []);

  return (
    <Section>
      <MainContent>
        {articuloActual.portada && <ArticleImage $bg={articuloActual.portada} />}
        {fechaFmt && <MetaDate>{fechaFmt}</MetaDate>}
        <Title>{articuloActual.titulo}</Title>
        <ContentText>
          {articuloActual.descripcion}
        </ContentText>

        {galeria.length > 0 && (
          <div>
            <h4 style={{ marginTop: '24px', marginBottom: '8px', fontSize: '15px' }}>Galería de imágenes</h4>
            <GalleryGrid>
              {galeria.map((imgUrl, i) => (
                <GalleryThumb
                  key={i}
                  src={imgUrl}
                  alt={`Imagen ${i + 1}`}
                  onClick={() => window.open(imgUrl, '_blank')}
                />
              ))}
            </GalleryGrid>
          </div>
        )}

        {articuloActual.enlace && (
          <ExternalLinkBox>
            🔗 <strong>Enlace de interés:</strong>{' '}
            <a href={articuloActual.enlace} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
              {articuloActual.enlace}
            </a>
          </ExternalLinkBox>
        )}
      </MainContent>
      
      <Sidebar>
        {articulos.length > 1 && (
          <Widget>
            <h4>Más publicaciones</h4>
            <div>
              {articulos.map((art) => (
                <ArticleListItem
                  key={art.id}
                  $active={art.id === articuloActual.id}
                  onClick={() => setSelectedId(art.id)}
                >
                  <h5>{art.titulo}</h5>
                  <span>
                    {new Date(art.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </ArticleListItem>
              ))}
            </div>
          </Widget>
        )}

        <Widget>
          <h4>Vive la Vendimia</h4>
          <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#555' }}>
            Conoce de cerca nuestro proceso de elaboración y cata directamente en bodega.
          </p>
          <StyledLink to="/enoturismo">Ver experiencias</StyledLink>
        </Widget>
        
        <Widget>
          <h4>Regala Vino</h4>
          <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#555' }}>
            Sorprende a los tuyos con nuestras tarjetas regalo y bonos personalizables.
          </p>
          <StyledLink to="/tienda">Tarjetas regalo</StyledLink>
        </Widget>
      </Sidebar>
    </Section>
  );
};

export default ArticuloDestacado;
