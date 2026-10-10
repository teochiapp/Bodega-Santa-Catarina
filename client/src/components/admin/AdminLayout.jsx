import styled from 'styled-components';
import { AdminGlobalStyle } from './AdminGlobalStyle';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

// ── Estilos ───────────────────────────────────────────────────────────────────

const Root = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--tn-bg);
  font-family: var(--tn-font);
  font-size: 15.5px;
  line-height: 1.55;
  color: var(--tn-text);
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* evita overflow en flex */
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 26px 28px;
  min-width: 0;
  overflow-x: auto;
`;

// ── Componente ────────────────────────────────────────────────────────────────

/**
 * Layout de 3 columnas del admin:
 *   Sidebar (232px) | TopBar + MainContent (flex:1) | DetailAside (340px, opcional)
 *
 * @param {{ section: string, children: React.ReactNode, aside?: React.ReactNode }} props
 */
const AdminLayout = ({ section, children, aside }) => {
  return (
    <Root className="admin-scope">
      <AdminGlobalStyle />
      <AdminSidebar />

      <MainArea>
        <AdminTopBar section={section} />
        <ContentArea>
          <MainContent>{children}</MainContent>
          {aside}
        </ContentArea>
      </MainArea>
    </Root>
  );
};

export default AdminLayout;
