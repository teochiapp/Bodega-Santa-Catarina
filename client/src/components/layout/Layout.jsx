import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
