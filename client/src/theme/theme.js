export const theme = {
  colors: {
    primary: '#502B3A', // Burgundy / Wine color
    secondary: '#C2A478', // Gold
    background: '#F2ECE4', // Light warm gray / off-white
    surface: '#FFFFFF',
    text: '#502B3A',
    textLight: '#FFFFFF',
    border: '#E0DCD3',
    error: '#D32F2F',
    success: '#388E3C',
  },
  typography: {
    fontFamily: {
      heading: "'Cormorant Garamond', 'Playfair Display', serif",
      body: "'Manrope', sans-serif",
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      hero: '3rem',
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: '5rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 8px rgba(0,0,0,0.1)',
    lg: '0 8px 16px rgba(0,0,0,0.15)',
  }
};

export const HERO_OVERLAY_STYLE = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(to top right, rgba(35, 15, 25, 0.36) 0%, rgba(35, 15, 25, 0.16) 46%, rgba(35, 15, 25, 0.04) 78%, rgba(35, 15, 25, 0) 100%)',
  pointerEvents: 'none',
};

export const HERO_IMAGE_FILTER = 'brightness(1) contrast(1.02)';

