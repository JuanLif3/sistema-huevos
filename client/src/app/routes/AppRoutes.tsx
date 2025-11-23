import { Routes, Route, Navigate } from 'react-router-dom';
// Importamos las páginas nuevas
import { OrdersPage } from '../pages/OrdersPage';
import { SuppliesPage } from '../pages/SuppliesPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Principales del Negocio */}
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/supplies" element={<SuppliesPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />

      {/* Ruta por defecto: Al abrir la app, ir directo a Pedidos */}
      <Route path="/" element={<Navigate to="/orders" replace />} />
    </Routes>
  );
};