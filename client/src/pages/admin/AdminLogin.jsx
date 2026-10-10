import styled from 'styled-components';
import LoginForm from '../../components/admin/LoginForm';
import { AdminGlobalStyle } from '../../components/admin/AdminGlobalStyle';

// ── Estilos ───────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tn-surface);
  padding: 2rem;
`;

const Card = styled.div`
  background: var(--tn-bg);
  border: 2px solid var(--tn-rule);
  padding: 40px 36px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--tn-shadow-md);
`;

const CardTop = styled.div`
  margin-bottom: 32px;
`;

const Kicker = styled.p`
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
  margin-bottom: 6px;
`;

const CardH1 = styled.h1`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--tn-text);
  font-family: var(--tn-font);
  margin-bottom: 2px;
`;

const CardSub = styled.p`
  font-size: 13px;
  color: var(--tn-muted);
`;

const Rule = styled.div`
  width: 100%;
  height: 2px;
  background: var(--tn-rule);
  margin: 24px 0;
`;

// ── Page ──────────────────────────────────────────────────────────────────────

const AdminLogin = () => {
  return (
    <div className="admin-scope">
      <AdminGlobalStyle />
      <PageWrapper>
        <Card>
          <CardTop>
            <Kicker>Bodega Santa Catarina</Kicker>
            <CardH1>Panel de administración</CardH1>
            <CardSub>Accedé con tus credenciales de administrador</CardSub>
          </CardTop>
          <Rule />
          <LoginForm />
        </Card>
      </PageWrapper>
    </div>
  );
};

export default AdminLogin;
