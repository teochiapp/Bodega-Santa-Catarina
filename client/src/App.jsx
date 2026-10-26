import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import BodegaHistoriaPage from './pages/bodega/BodegaHistoriaPage';
import BodegaInstalacionesPage from './pages/bodega/BodegaInstalacionesPage';
import BodegaVinedosPage from './pages/bodega/BodegaVinedosPage';
import BodegaFilosofiaPage from './pages/bodega/BodegaFilosofiaPage';
import BodegaSostenibilidadPage from './pages/bodega/BodegaSostenibilidadPage';
import VinosPage from './pages/VinosPage';
import VinosStaPage from './pages/vinos/VinosStaPage';
import VinosSurantPage from './pages/vinos/VinosSurantPage';
import VinosNguanyPage from './pages/vinos/VinosNguanyPage';
import EnoturismoPage from './pages/EnoturismoPage';
import CatasYVisitasPage from './pages/CatasYVisitasPage';
import ExperienciasGastronomicasPage from './pages/ExperienciasGastronomicasPage';
import RegalaTuExperienciaPage from './pages/RegalaTuExperienciaPage';
import EventosNuestrosEspaciosPage from './pages/eventos/EventosNuestrosEspaciosPage';
import EventosMicePage from './pages/eventos/EventosMicePage';
import EventosCelebracionesPage from './pages/eventos/EventosCelebracionesPage';
import EventosBodasPage from './pages/eventos/EventosBodasPage';
import DondeComprarPage from './pages/DondeComprarPage';
import TiendaPage from './pages/TiendaPage';
import BlogPage from './pages/BlogPage';
import ContactoPage from './pages/ContactoPage';

// Pages — admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVinosPage from './pages/admin/AdminVinosPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminCatasPage from './pages/admin/AdminCatasPage';
import AdminReservasPage from './pages/admin/AdminReservasPage';
import AdminMenusPage from './pages/admin/AdminMenusPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminTarjetasPage from './pages/admin/AdminTarjetasPage';
import AdminPedidosTarjetasPage from './pages/admin/AdminPedidosTarjetasPage';
import AdminTiendaGaleriaPage from './pages/admin/AdminTiendaGaleriaPage';
import AdminConfiguracionPage from './pages/admin/AdminConfiguracionPage';
import AdminHeroesPage from './pages/admin/AdminHeroesPage';
import { HeroesProvider } from './context/HeroesContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <HeroesProvider>
          <Router>
            <ScrollToTop />
          <Routes>
            {/* ── Sitio público ── */}
            <Route element={<Layout />}>
              <Route path="/" element={<InicioPage />} />

              {/* Elaboración (La Bodega) y sus 5 vistas controladas por activeSection */}
              <Route path="/elaboracion" element={<LaBodegaPage />} />
              <Route path="/elaboracion/:section" element={<LaBodegaPage />} />
              <Route path="/la-bodega" element={<Navigate to="/elaboracion" replace />} />
              <Route path="/la-bodega/:section" element={<LaBodegaPage />} />

              {/* Vinos y sus colecciones (secciones separadas e independientes) */}
              <Route path="/vinos" element={<VinosPage />} />
              <Route path="/vinos/coleccion-sta" element={<VinosStaPage />} />
              <Route path="/vinos/sta" element={<Navigate to="/vinos/coleccion-sta" replace />} />
              <Route path="/vinos/coleccion-surant" element={<VinosSurantPage />} />
              <Route path="/vinos/surant" element={<Navigate to="/vinos/coleccion-surant" replace />} />
              <Route path="/vinos/coleccion-nguany" element={<VinosNguanyPage />} />
              <Route path="/vinos/nguany" element={<Navigate to="/vinos/coleccion-nguany" replace />} />

              {/* ── Enoturismo (secciones separadas e independientes) ── */}
              <Route path="/enoturismo" element={<EnoturismoPage />} />
              <Route path="/enoturismo/catas-y-visitas" element={<CatasYVisitasPage />} />
              <Route path="/enoturismo/catas" element={<Navigate to="/enoturismo/catas-y-visitas" replace />} />
              <Route path="/enoturismo/experiencias-gastronomicas" element={<ExperienciasGastronomicasPage />} />
              <Route path="/enoturismo/gastronomia" element={<Navigate to="/enoturismo/experiencias-gastronomicas" replace />} />
              <Route path="/enoturismo/regala-tu-experiencia" element={<RegalaTuExperienciaPage />} />
              <Route path="/enoturismo/regala" element={<Navigate to="/enoturismo/regala-tu-experiencia" replace />} />

              {/* ── Eventos y Bodas (4 páginas independientes) ── */}
              <Route path="/eventos" element={<Navigate to="/eventos/nuestros-espacios" replace />} />
              <Route path="/eventos/nuestros-espacios" element={<EventosNuestrosEspaciosPage />} />
              <Route path="/eventos/espacios" element={<Navigate to="/eventos/nuestros-espacios" replace />} />
              <Route path="/eventos/mice-y-eventos-corporativos" element={<EventosMicePage />} />
              <Route path="/eventos/mice" element={<Navigate to="/eventos/mice-y-eventos-corporativos" replace />} />
              <Route path="/eventos/celebraciones-privadas" element={<EventosCelebracionesPage />} />
              <Route path="/eventos/celebraciones" element={<Navigate to="/eventos/celebraciones-privadas" replace />} />
              <Route path="/eventos/bodas" element={<EventosBodasPage />} />
              <Route path="/eventos-y-bodas" element={<Navigate to="/eventos/nuestros-espacios" replace />} />
              <Route path="/bodas" element={<Navigate to="/eventos/bodas" replace />} />
              <Route path="/eventos/:slug" element={<Navigate to="/eventos/nuestros-espacios" replace />} />
              <Route path="/donde-comprar" element={<DondeComprarPage />} />
              <Route path="/tienda" element={<TiendaPage />} />
              <Route path="/tienda-fisica" element={<TiendaPage />} />
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
              path="/admin/reservas"
              element={
                <ProtectedRoute>
                  <AdminReservasPage />
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
              path="/admin/pedidos-tarjetas"
              element={
                <ProtectedRoute>
                  <AdminPedidosTarjetasPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tienda-galeria"
              element={
                <ProtectedRoute>
                  <AdminTiendaGaleriaPage />
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
            <Route
              path="/admin/heroes"
              element={
                <ProtectedRoute>
                  <AdminHeroesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        </HeroesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
