import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyles } from './theme/GlobalStyles';

// Layout
import Layout from './components/Layout/Layout';

// Pages — sitio público
import InicioPage from './pages/InicioPage';
import LaBodegaPage from './pages/LaBodegaPage';
import VinosPage from './pages/VinosPage';
import EnoturismoPage from './pages/EnoturismoPage';
import EventosPage from './pages/EventosPage';
import DondeComprarPage from './pages/DondeComprarPage';
import TiendaPage from './pages/TiendaPage';
import BlogPage from './pages/BlogPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* ── Sitio público ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<InicioPage />} />
            <Route path="/la-bodega" element={<LaBodegaPage />} />
            <Route path="/vinos" element={<VinosPage />} />
            <Route path="/enoturismo" element={<EnoturismoPage />} />
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/donde-comprar" element={<DondeComprarPage />} />
            <Route path="/tienda" element={<TiendaPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
          </Route>

          {/* ── Panel admin (Por implementar) ── */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
