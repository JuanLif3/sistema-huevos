import { Order } from '../types';
import styles from './OrderCard.module.css';
import { Check, Clock } from 'lucide-react';

interface Props {
  order: Order;
  onDeliver: (id: string) => void;
}

export const OrderCard = ({ order, onDeliver }: Props) => {
  // Lógica para elegir el color del borde
  const statusClass = order.status === 'ENTREGADO' ? styles.delivered : styles.pending;

  return (
    <div className={`${styles.card} ${statusClass}`}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.customer}>{order.customerName}</h3>
          <p style={{color: '#666', fontSize: '0.9rem', margin: '4px 0'}}>{order.address}</p>
        </div>
        <span className={styles.date}>
           {new Date(order.deliveryDate).toLocaleDateString()}
        </span>
      </div>

      <div className={styles.details}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Cantidad</span>
          <span className={styles.value}>{order.quantityTrays} bandejas</span>
        </div>
        <div className={styles.infoItem} style={{alignItems: 'flex-end'}}>
          <span className={styles.label}>Total</span>
          <span className={styles.value}>${order.price}</span>
        </div>
      </div>

      <div className={styles.actions}>
        {order.status === 'PENDIENTE' ? (
          <button 
            onClick={() => onDeliver(order.id)} 
            className={styles.deliverBtn}
          >
            <Check size={20} /> Marcar Entregado
          </button>
        ) : (
          <div style={{
            flex: 1, 
            textAlign: 'center', 
            padding: '10px', 
            color: '#10b981', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Check size={20} /> ¡Entregado!
          </div>
        )}
      </div>
    </div>
  );
};