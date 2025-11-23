import { Routes, Route, Navigate } from 'react-router-dom';
import { OrdersPage } from '../pages/OrdersPage';
import { SuppliesPage } from '../pages/SuppliesPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { CreateOrderPage } from '../pages/CreateOrderPage'; // <--- Importar esto

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/new" element={<CreateOrderPage />} /> {/* <--- Nueva Ruta */}
      
      <Route path="/supplies" element={<SuppliesPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />

      <Route path="/" element={<Navigate to="/orders" replace />} />
    </Routes>
  );
};