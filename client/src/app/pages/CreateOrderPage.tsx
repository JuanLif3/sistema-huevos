import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react'; // Íconos
import apiClient from '../api/apiClient';
import styles from './CreateOrderPage.module.css';

export const CreateOrderPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    quantityTrays: 1,
    price: 0,
    deliveryDate: new Date().toISOString().split('T')[0] // Fecha de hoy por defecto
  });

  // Función que envía los datos al backend
  const createOrder = async (newOrder: typeof formData) => {
    await apiClient.post('/sales', newOrder);
  };

  // Mutación de React Query para manejar la carga y errores
  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // Al terminar, recargamos la lista de pedidos y volvemos atrás
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate('/orders');
    },
    onError: (error) => {
      alert('Error al crear el pedido: ' + error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convertimos a número antes de enviar
    mutation.mutate({
      ...formData,
      quantityTrays: Number(formData.quantityTrays),
      price: Number(formData.price)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate('/orders')} className={styles.backBtn}>
          <ArrowLeft /> Volver
        </button>
        <h2>Nuevo Pedido</h2>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Cliente</label>
          <input 
            type="text" 
            name="customerName" 
            value={formData.customerName} 
            onChange={handleChange} 
            required 
            placeholder="Nombre del cliente"
          />
        </div>

        <div className={styles.field}>
          <label>Dirección</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
            placeholder="Dirección de entrega"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Bandejas</label>
            <input 
              type="number" 
              name="quantityTrays" 
              value={formData.quantityTrays} 
              onChange={handleChange} 
              min="1" 
              required 
            />
          </div>

          <div className={styles.field}>
            <label>Precio Total ($)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              min="0" 
              required 
            />
          </div>
        </div>

        <div className={styles.field}>
          <label>Fecha de Entrega</label>
          <input 
            type="date" 
            name="deliveryDate" 
            value={formData.deliveryDate} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={mutation.isPending}>
          <Save size={20} />
          {mutation.isPending ? 'Guardando...' : 'Guardar Pedido'}
        </button>
      </form>
    </div>
  );
};