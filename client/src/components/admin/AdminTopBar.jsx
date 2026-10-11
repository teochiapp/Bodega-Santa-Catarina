import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ExternalLink, LogOut } from 'lucide-react';

// ── Estilos ───────────────────────────────────────────────────────────────────

const Bar = styled.header`
  height: var(--tn-topbar-h);
  background: var(--tn-bg);
  border-bottom: 2px solid var(--tn-rule);
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  flex-shrink: 0;

  /* En mobile dejamos espacio al hamburguesa (52px) */
  @media (max-width: 819px) {
    padding-left: 64px;
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--tn-muted);

  strong {
    color: var(--tn-text);
    font-weight: 700;
    font-size: 14px;
  }

  span.sep {
    opacity: 0.5;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WebBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 14px;
  background: var(--tn-bg);
  border: 1px solid var(--tn-rule);
  color: var(--tn-text);
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease;
  border-radius: 0;

  &:hover {
    background: var(--tn-n-100);
    border-color: var(--tn-n-400);
  }

  &:active {
    background: var(--tn-n-200);
  }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 14px;
  background: var(--tn-bg);
  border: 1px solid var(--tn-rule);
  color: var(--tn-text);
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease;
  border-radius: 0;

  &:hover {
    background: var(--tn-rojo-100);
    border-color: var(--tn-rojo-700);
    color: var(--tn-rojo-700);
  }

  &:active {
    background: var(--tn-rojo-200);
  }
`;

// ── Componente ────────────────────────────────────────────────────────────────

/**
 * @param {{ section: string }} props
 */
const AdminTopBar = ({ section }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <Bar>
      <Breadcrumb>
        <span>Admin</span>
        <span className="sep">›</span>
        <strong>{section}</strong>
      </Breadcrumb>

      <Actions>
        <WebBtn onClick={() => window.open('/', '_blank')} id="btn-ver-web" title="Ver web pública en nueva pestaña">
          <ExternalLink size={15} strokeWidth={1.8} />
          Ver Web
        </WebBtn>
        <LogoutBtn onClick={handleLogout} id="btn-cerrar-sesion">
          <LogOut size={15} strokeWidth={1.8} />
          Cerrar sesión
        </LogoutBtn>
      </Actions>
    </Bar>
  );
};

export default AdminTopBar;
