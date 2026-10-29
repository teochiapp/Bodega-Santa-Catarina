import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ScrollLink, BackToTopButton } from '../common/ScrollToTop';
import ScrollRevealObserver from '../common/ScrollRevealObserver';
import CookieManager from '../cookies/CookieManager';
import api from '../../services/api';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const RouteStage = styled.div`
  width: 100%;
`;

const AnnouncementBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.primary || '#502B3A'};
  color: #ffffff;
  padding: 9px 18px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 1001;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);

  a {
    color: ${({ theme }) => theme.colors.secondary || '#C2A478'};
    text-decoration: none;
    font-weight: 700;
    margin-left: 6px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    transition: all 150ms ease;

    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }
`;

const Layout = () => {
  const [config, setConfig] = useState(null);
  const layoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    api.get('/configuracion')
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  const bannerTexto = config?.bannerTexto?.trim() || '';

  return (
    <LayoutContainer ref={layoutRef}>
      {Boolean(config?.bannerActivo && bannerTexto) && (
        <AnnouncementBanner>
          <span>{bannerTexto}</span>
          {config?.bannerEnlace && (
            <ScrollLink to={config.bannerEnlace}>Ver más →</ScrollLink>
          )}
        </AnnouncementBanner>
      )}
      <Header />
      <MainContent>
        <RouteStage key={location.pathname}>
          <Outlet />
        </RouteStage>
      </MainContent>
      <Footer />
      <ScrollRevealObserver containerRef={layoutRef} />
      <BackToTopButton />
      <CookieManager />
    </LayoutContainer>
  );
};

export default Layout;
