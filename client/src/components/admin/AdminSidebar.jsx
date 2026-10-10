import styled, { keyframes } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// ── Iconos SVG inline (línea, 17×17, strokeWidth 1.7) ────────────────────────

const IconVinos = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2h8l2 6a6 6 0 0 1-12 0L8 2z"/>
    <path d="M12 14v8"/>
    <path d="M9 22h6"/>
  </svg>
);

const IconReservas = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="0"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconTarjetas = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="0"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

const IconEmails = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconLogout = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

// ── Animaciones ───────────────────────────────────────────────────────────────

const cajon = keyframes`
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
`;

const fadeOverlay = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ── Estilos del Sidebar ───────────────────────────────────────────────────────

const SidebarRoot = styled.aside`
  width: var(--tn-sidebar-w);
  min-height: 100vh;
  background: var(--tn-bg);
  border-right: 2px solid var(--tn-rule);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: width 220ms ease;
  z-index: 10;

  @media (max-width: 1099px) {
    width: var(--tn-sidebar-collapsed);
  }

  @media (max-width: 819px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  height: var(--tn-topbar-h);
  border-bottom: 2px solid var(--tn-rule);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  flex-shrink: 0;
  overflow: hidden;
`;

const SidebarLogo = styled.div`
  width: 30px;
  height: 30px;
  background: var(--tn-acc);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  span {
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
`;

const SidebarLogoName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--tn-text);
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 1099px) {
    display: none;
  }
`;

const NavArea = styled.nav`
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const SectionLabel = styled.div`
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-muted);
  padding: 12px 12px 4px;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 1099px) {
    /* En modo colapsado: línea en lugar de texto */
    font-size: 0;
    padding: 6px 8px;
    &::after {
      content: '';
      display: block;
      height: 1px;
      background: var(--tn-line);
      width: 100%;
    }
  }
`;

const SideLinkEl = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 10px;
  cursor: ${(p) => (p.$disabled ? 'default' : 'pointer')};
  text-decoration: none;
  color: ${(p) => (p.$disabled ? 'var(--tn-muted)' : 'var(--tn-text)')};
  font-size: 14px;
  font-weight: ${(p) => (p.$active ? '700' : '400')};
  position: relative;
  transition: background 150ms ease, color 150ms ease;
  background: ${(p) => (p.$active ? 'var(--tn-acc-100)' : 'transparent')};
  opacity: ${(p) => (p.$disabled ? '0.5' : '1')};
  white-space: nowrap;
  overflow: hidden;

  ${(p) =>
    p.$active &&
    `
    color: var(--tn-acc-700);
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--tn-acc);
    }
  `}

  &:hover {
    background: ${(p) => (p.$disabled || p.$active ? undefined : 'var(--tn-n-100)')};
    color: ${(p) => (p.$disabled ? undefined : 'var(--tn-acc-700)')};
  }
`;

const SideLinkLabel = styled.span`
  overflow: hidden;
  @media (max-width: 1099px) {
    display: none;
  }
`;

const SoonBadge = styled.span`
  font-size: 9px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--tn-n-200);
  color: var(--tn-muted);
  padding: 1px 5px;
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: 1099px) {
    display: none;
  }
`;

const SidebarFooter = styled.div`
  border-top: 2px solid var(--tn-rule);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  flex-shrink: 0;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  background: var(--tn-acc-200);
  color: var(--tn-acc-700);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  flex-shrink: 0;
`;

const AvatarInfo = styled.div`
  overflow: hidden;
  @media (max-width: 1099px) {
    display: none;
  }

  strong {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--tn-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: block;
    font-size: 11px;
    color: var(--tn-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`;

// ── Drawer mobile ─────────────────────────────────────────────────────────────

const HamburgerBtn = styled.button`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 52px;
  height: var(--tn-topbar-h);
  background: var(--tn-bg);
  border: none;
  border-right: 1px solid var(--tn-line);
  border-bottom: 2px solid var(--tn-rule);
  color: var(--tn-text);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  z-index: 30;

  @media (max-width: 819px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(42, 28, 33, 0.55);
  z-index: 40;
  animation: ${fadeOverlay} 220ms ease;

  @media (max-width: 819px) {
    display: block;
  }
`;

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 268px;
  height: 100vh;
  background: var(--tn-bg);
  border-right: 2px solid var(--tn-rule);
  z-index: 50;
  display: flex;
  flex-direction: column;
  animation: ${cajon} 220ms ease;
  overflow-y: auto;
`;

const DrawerHeader = styled.div`
  height: var(--tn-topbar-h);
  border-bottom: 2px solid var(--tn-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  flex-shrink: 0;
`;

const DrawerCloseBtn = styled.button`
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--tn-rule);
  color: var(--tn-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--tn-n-100);
  }
`;

const DrawerSideLinkEl = styled(SideLinkEl)`
  height: 40px;

  @media (max-width: 819px) {
    /* En drawer siempre mostrar label */
  }
`;

// ── Nav data ──────────────────────────────────────────────────────────────────

const NAV = [
  {
    group: 'Catálogo',
    items: [
      { icon: <IconVinos />, label: 'Vinos', path: '/admin', disabled: false },
    ],
  },
  {
    group: 'Operaciones',
    items: [
      { icon: <IconReservas />, label: 'Reservas', path: '/admin/reservas', disabled: true },
      { icon: <IconTarjetas />, label: 'Tarjetas de regalo', path: '/admin/tarjetas', disabled: true },
      { icon: <IconEmails />,   label: 'Emails',   path: '/admin/emails',   disabled: true },
    ],
  },
];

// ── Componente SideLink ───────────────────────────────────────────────────────

const SideLink = ({ icon, label, path, disabled, isActive, onNav, isDrawer }) => {
  const El = isDrawer ? DrawerSideLinkEl : SideLinkEl;
  return (
    <El
      $active={isActive}
      $disabled={disabled}
      onClick={() => !disabled && onNav(path)}
      title={label}
    >
      {icon}
      <SideLinkLabel>{label}</SideLinkLabel>
      {disabled && <SoonBadge>Próximamente</SoonBadge>}
    </El>
  );
};

// ── Nav content (compartido entre sidebar y drawer) ───────────────────────────

const NavContent = ({ location, navigate, onClose }) => (
  <NavArea>
    {NAV.map((group) => (
      <div key={group.group}>
        <SectionLabel>{group.group}</SectionLabel>
        {group.items.map((item) => (
          <SideLink
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            disabled={item.disabled}
            isActive={location.pathname === item.path}
            onNav={(p) => { navigate(p); onClose?.(); }}
            isDrawer={Boolean(onClose)}
          />
        ))}
      </div>
    ))}
  </NavArea>
);

// ── Componente principal ──────────────────────────────────────────────────────

const AdminSidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Cerrar drawer con Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Cerrar drawer al navegar
  const handleNav = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* ── Sidebar desktop ── */}
      <SidebarRoot>
        <SidebarHeader>
          <SidebarLogo><span>SC</span></SidebarLogo>
          <SidebarLogoName>Santa Catarina</SidebarLogoName>
        </SidebarHeader>

        <NavContent
          location={location}
          navigate={navigate}
          onClose={null}
        />

        <SidebarFooter>
          <Avatar>AD</Avatar>
          <AvatarInfo>
            <strong>Administrador</strong>
            <span>Admin</span>
          </AvatarInfo>
        </SidebarFooter>
      </SidebarRoot>

      {/* ── Botón hamburguesa mobile ── */}
      <HamburgerBtn
        onClick={() => setDrawerOpen(true)}
        aria-label="Abrir menú"
        id="btn-hamburguesa-admin"
      >
        <IconMenu />
      </HamburgerBtn>

      {/* ── Drawer mobile ── */}
      {drawerOpen && (
        <>
          <Overlay onClick={() => setDrawerOpen(false)} />
          <Drawer>
            <DrawerHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <SidebarLogo><span>SC</span></SidebarLogo>
                <SidebarLogoName style={{ display: 'block' }}>Santa Catarina</SidebarLogoName>
              </div>
              <DrawerCloseBtn
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar menú"
              >
                <IconClose />
              </DrawerCloseBtn>
            </DrawerHeader>

            <NavContent
              location={location}
              navigate={navigate}
              onClose={() => setDrawerOpen(false)}
            />

            <SidebarFooter>
              <Avatar>AD</Avatar>
              <AvatarInfo style={{ display: 'block' }}>
                <strong>Administrador</strong>
                <span>Admin</span>
              </AvatarInfo>
            </SidebarFooter>
          </Drawer>
        </>
      )}
    </>
  );
};

export default AdminSidebar;
