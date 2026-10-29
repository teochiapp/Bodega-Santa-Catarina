import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset and base styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  ul, ol {
    list-style: none;
  }

  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* ─── Scroll Appear Editorial (transición GPU fiable en navegación SPA) ─── */
  @media (prefers-reduced-motion: no-preference) {
    [data-sc-reveal="pending"] {
      opacity: 0;
      translate: 0 var(--sc-reveal-y, 18px);
      will-change: opacity, translate;
    }

    [data-sc-reveal="pending"][data-reveal="media"] {
      scale: 0.985;
      will-change: opacity, translate, scale;
    }

    [data-sc-reveal="visible"] {
      opacity: 1;
      translate: 0 0;
      scale: 1;
      transition:
        opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1) var(--sc-reveal-delay, 0ms),
        translate 0.72s cubic-bezier(0.16, 1, 0.3, 1) var(--sc-reveal-delay, 0ms),
        scale 0.78s cubic-bezier(0.16, 1, 0.3, 1) var(--sc-reveal-delay, 0ms);
    }
  }
`;
