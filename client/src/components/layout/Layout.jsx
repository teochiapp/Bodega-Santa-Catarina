import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import api from '../../services/api';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const AnnouncementBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary || '#CBA052'};
  color: #ffffff;
  padding: 8px 16px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 100;

  a {
    color: #ffffff;
    text-decoration: underline;
    font-weight: 700;
    margin-left: 6px;
  }
`;

const Layout = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.get('/configuracion')
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  return (
    <LayoutContainer>
      {config?.bannerActivo && config?.bannerTexto && (
        <AnnouncementBanner>
          <span>{config.bannerTexto}</span>
          {config.bannerEnlace && (
            <Link to={config.bannerEnlace}>Ver más →</Link>
          )}
        </AnnouncementBanner>
      )}
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
