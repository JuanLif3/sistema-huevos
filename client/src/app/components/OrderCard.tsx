import { MapPin, Calendar, Egg } from 'lucide-react';
import styles from './OrderCard.module.css';
import { Order } from '../types';

interface Props {
  order: Order;
  onDeliver: (id: string) => void;
}

export const OrderCard = ({ order, onDeliver }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.customer}>{order.customerName}</h3>
        <span className={styles.price}>${order.price}</span>
      </div>
      
      <div className={styles.details}>
        <div className={styles.row}>
          <MapPin size={16} />
          <span>{order.address}</span>
        </div>
        <div className={styles.row}>
          <Egg size={16} />
          <span>{order.quantityTrays} Bandejas</span>
        </div>
        <div className={styles.row}>
          <Calendar size={16} />
          {/* Formateamos la fecha para que se vea amigable */}
          <span>{new Date(order.deliveryDate).toLocaleDateString()}</span>
        </div>
      </div>

      {order.status === 'PENDING' ? (
        <button 
          className={styles.deliverBtn}
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            if(confirm('¿Marcar como entregado?')) onDeliver(order.id);
          }}
        >
          Marcar como Entregado
        </button>
      ) : (
        <div className={styles.deliveredBadge}>¡Entregado!</div>
      )}
    </div>
  );
};