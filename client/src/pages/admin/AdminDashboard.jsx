import AdminVinosPage from '../../components/admin/AdminVinosList';

/**
 * Dashboard principal del admin.
 * La vista por defecto es la sección de vinos, que incluye
 * su propio layout (AdminLayout), sidebar, topbar y panel de detalle.
 */
const AdminDashboard = () => {
  return <AdminVinosPage />;
};

export default AdminDashboard;
