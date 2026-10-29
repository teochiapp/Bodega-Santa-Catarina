import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Wine,
  Sparkles,
  UtensilsCrossed,
  CalendarCheck,
  Newspaper,
  Gift,
  Settings,
  Menu,
  X,
  Images,
  Layers,
} from 'lucide-react';

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
  padding: 0 14px;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 1099px) {
    padding: 0 8px;
    justify-content: center;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  max-width: 100%;

  @media (max-width: 1099px) {
    justify-content: center;
    width: 100%;
  }
`;

const FullLogoImg = styled.img`
  height: 45px;
  max-width: 205px;
  object-fit: contain;
  mix-blend-mode: multiply;
  display: block;

  @media (max-width: 1099px) {
    display: none;
  }
`;

const CompactLogoImg = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;
  mix-blend-mode: multiply;
  display: none;

  @media (max-width: 1099px) {
    display: block;
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
    group: 'General',
    items: [
      { icon: <LayoutDashboard size={17} strokeWidth={1.8} />, label: 'Dashboard & Métricas', path: '/admin', disabled: false },
    ],
  },
  {
    group: 'Reservas & Pedidos',
    items: [
      { icon: <CalendarCheck size={17} strokeWidth={1.8} />, label: 'Reservas', path: '/admin/reservas', disabled: false },
      { icon: <Gift size={17} strokeWidth={1.8} />, label: 'Tarjetas Regalo', path: '/admin/pedidos-tarjetas', disabled: false },
    ],
  },
  {
    group: 'Catálogo',
    items: [
      { icon: <Wine size={17} strokeWidth={1.8} />, label: 'Vinos', path: '/admin/vinos', disabled: false },
    ],
  },
  {
    group: 'Enoturismo & Visitas',
    items: [
      { icon: <Sparkles size={17} strokeWidth={1.8} />, label: 'Catas y Degustaciones', path: '/admin/catas', disabled: false },
      { icon: <UtensilsCrossed size={17} strokeWidth={1.8} />, label: 'Menús Gastronómicos', path: '/admin/menus', disabled: false },
      { icon: <Gift size={17} strokeWidth={1.8} />, label: 'Catálogo de Bonos', path: '/admin/tarjetas', disabled: false },
    ],
  },
  {
    group: 'Contenido & Tienda',
    items: [
      { icon: <Layers size={17} strokeWidth={1.8} />, label: 'Cabeceras de Páginas', path: '/admin/heroes', disabled: false },
      { icon: <Newspaper size={17} strokeWidth={1.8} />, label: 'Blog & Novedades', path: '/admin/blog', disabled: false },
      { icon: <Images size={17} strokeWidth={1.8} />, label: 'Galería Tienda Física', path: '/admin/tienda-galeria', disabled: false },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { icon: <Settings size={17} strokeWidth={1.8} />, label: 'Configuración General', path: '/admin/configuracion', disabled: false },
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

  // Cerrar drawer con Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* ── Sidebar desktop ── */}
      <SidebarRoot>
        <SidebarHeader>
          <LogoLink to="/admin" title="Bodega Santa Catarina - Administración">
            <FullLogoImg src="/logo-santacatarina.png" alt="Bodega Santa Catarina" />
            <CompactLogoImg src="/isologo.png" alt="Santa Catarina" />
          </LogoLink>
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
        <Menu size={20} strokeWidth={1.8} />
      </HamburgerBtn>

      {/* ── Drawer mobile ── */}
      {drawerOpen && (
        <>
          <Overlay onClick={() => setDrawerOpen(false)} />
          <Drawer>
            <DrawerHeader>
              <LogoLink to="/admin" title="Bodega Santa Catarina - Administración" onClick={() => setDrawerOpen(false)}>
                <img
                  src="/logo-santacatarina.png"
                  alt="Bodega Santa Catarina"
                  style={{ height: '45px', maxWidth: '205px', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block' }}
                />
              </LogoLink>
              <DrawerCloseBtn
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar menú"
              >
                <X size={18} strokeWidth={1.8} />
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
