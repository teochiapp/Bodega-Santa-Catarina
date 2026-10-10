import { createGlobalStyle, keyframes } from 'styled-components';

// ── Animaciones del sistema admin ─────────────────────────────────────────────

export const slideIn = keyframes`
  from { opacity: 0; transform: translateX(18px); }
  to   { opacity: 1; transform: translateX(0); }
`;

export const rise = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const fade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const cajon = keyframes`
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ── Tokens CSS globales del admin ─────────────────────────────────────────────
//
// Prefijo --tn- para evitar colisiones con las variables globales del sitio.
// Paleta de acento derivada del branding de Bodega Santa Catarina:
//   Primary: #502B3A (borgoña)   Secondary: #CBA052 (dorado)
//
// Escala de acento (--tn-acc-*) basada en #502B3A:
//   100 → muy claro (fondos de hover/activo)
//   200 → borde de estado activo
//   700 → texto de acento / color principal
//   800 → hover oscuro

export const AdminGlobalStyle = createGlobalStyle`
  .admin-scope {
    /* ── Fondo y superficies ── */
    --tn-bg:      #f9f7f8;
    --tn-surface: #f2eef0;

    /* ── Acento (borgoña de la bodega) ── */
    --tn-acc:     #502B3A;
    --tn-acc-100: #f5eef1;
    --tn-acc-200: #dfc8cf;
    --tn-acc-700: #502B3A;
    --tn-acc-800: #401A2E;

    /* ── Dorado secundario ── */
    --tn-gold:     #CBA052;
    --tn-gold-100: #fdf5e6;
    --tn-gold-700: #a07a35;

    /* ── Escala de neutros ── */
    --tn-n-100: #f0ecee;
    --tn-n-200: #e4dde0;
    --tn-n-300: #cec5c9;
    --tn-n-400: #b0a3a8;
    --tn-n-500: #8a7a80;
    --tn-n-600: #6b5c63;

    /* ── Texto ── */
    --tn-text:  #2a1c21;
    --tn-muted: #7a6870;

    /* ── Reglas / líneas ── */
    --tn-rule: #d8cfd3;   /* 2px — divisiones estructurales */
    --tn-line: #ede6e9;   /* 1px — elementos internos */

    /* ── Estados semánticos ── */
    --tn-verde-100:   #e8f5ec;
    --tn-verde-700:   #1e6b3a;
    --tn-amarillo-100:#fef9e7;
    --tn-amarillo-200:#fde68a;
    --tn-amarillo-700:#92620d;
    --tn-rojo-100:    #fdecea;
    --tn-rojo-700:    #9b2335;
    --tn-gris-100:    #f0ecee;
    --tn-gris-700:    #6b5c63;

    /* ── Sombras (solo para modales/overlays) ── */
    --tn-shadow-md: 0 4px 20px rgba(42, 28, 33, 0.14);
    --tn-shadow-lg: 0 12px 40px rgba(42, 28, 33, 0.22);

    /* ── Tipografía ── */
    --tn-font: 'Manrope', sans-serif;

    /* ── Dimensiones de layout ── */
    --tn-sidebar-w:        232px;
    --tn-sidebar-collapsed: 60px;
    --tn-topbar-h:         56px;
    --tn-detail-w:         340px;
  }

  /* Reseteo base para el scope admin */
  .admin-scope * {
    box-sizing: border-box;
  }

  .admin-scope,
  .admin-scope input,
  .admin-scope button,
  .admin-scope select,
  .admin-scope textarea {
    font-family: var(--tn-font);
  }

  /* Números tabulares en toda la interfaz admin */
  .admin-scope {
    font-variant-numeric: lining-nums tabular-nums;
  }
`;
