import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import apiClient from '../api/apiClient'
import { OrderCard } from '../components/OrderCard';
import styles from './OrdersPage.module.css';
import { Order } from '../types';

// Función para traer pedidos
const fetchOrders = async () => {
  const { data } = await apiClient.get<Order[]>('/sales');
  return data;
};

// Función para marcar como entregado
const markDelivered = async (id: string) => {
  await apiClient.patch(`/sales/${id}/deliver`);
};

export const OrdersPage = () => {
  const queryClient = useQueryClient();
  
  // 1. Obtener Pedidos
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders
  });

  // 2. Mutación para Entregar
  const deliverMutation = useMutation({
    mutationFn: markDelivered,
    onSuccess: () => {
      // Recargar la lista automáticamente al entregar
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });

  if (isLoading) return <div style={{padding: 20}}>Cargando pedidos...</div>;
  if (isError) return <div style={{padding: 20}}>Error al cargar datos.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Pedidos Pendientes</h2>
      </header>

      <div className={styles.list}>
        {orders?.length === 0 ? (
          <p style={{textAlign: 'center', color: '#666'}}>No hay pedidos pendientes.</p>
        ) : (
          orders?.map(order => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onDeliver={(id) => deliverMutation.mutate(id)}
            />
          ))
        )}
      </div>

      {/* Botón para crear nuevo pedido (nos llevará a otra página) */}
      <Link to="/orders/new" className={styles.fab}>
        <Plus size={32} />
      </Link>
    </div>
  );
};