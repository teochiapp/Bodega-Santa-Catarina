import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyles } from './theme/GlobalStyles';

// Layout
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

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

// Pages — admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVinosPage from './pages/admin/AdminVinosPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminCatasPage from './pages/admin/AdminCatasPage';
import AdminMenusPage from './pages/admin/AdminMenusPage';
import AdminEventosPage from './pages/admin/AdminEventosPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminTarjetasPage from './pages/admin/AdminTarjetasPage';
import AdminConfiguracionPage from './pages/admin/AdminConfiguracionPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <ScrollToTop />
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

            {/* ── Panel admin ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vinos"
              element={
                <ProtectedRoute>
                  <AdminVinosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/catas"
              element={
                <ProtectedRoute>
                  <AdminCatasPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/menus"
              element={
                <ProtectedRoute>
                  <AdminMenusPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/eventos"
              element={
                <ProtectedRoute>
                  <AdminEventosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog"
              element={
                <ProtectedRoute>
                  <AdminBlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tarjetas"
              element={
                <ProtectedRoute>
                  <AdminTarjetasPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/configuracion"
              element={
                <ProtectedRoute>
                  <AdminConfiguracionPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
