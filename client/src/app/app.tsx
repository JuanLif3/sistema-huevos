import { AppRoutes } from './routes/AppRoutes';
import { MobileNavbar } from './components/MobileNavbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Crear el cliente de React Query
const queryClient = new QueryClient();

export function App() {
  return (
    // 2. Proveedor de datos (React Query)
    <QueryClientProvider client={queryClient}>
      
      <div className="app-container">
        
        {/* 3. Aquí se cargan las páginas (Pedidos, Inventario, etc.) */}
        <AppRoutes />

        {/* 4. Aquí se carga el menú inferior fijo */}
        <MobileNavbar />
        
      </div>
      
    </QueryClientProvider>
  );
}

export default App;