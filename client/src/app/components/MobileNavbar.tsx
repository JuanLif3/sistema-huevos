import { Link, useLocation } from 'react-router-dom';
import { ClipboardList, Package, BarChart3 } from 'lucide-react';
import styles from './MobileNavbar.module.css';

export const MobileNavbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <Link to="/orders" className={`${styles.navItem} ${isActive('/orders') ? styles.active : ''}`}>
        <ClipboardList />
        <span>Pedidos</span>
      </Link>
      
      <Link to="/supplies" className={`${styles.navItem} ${isActive('/supplies') ? styles.active : ''}`}>
        <Package />
        <span>Inventario</span>
      </Link>
      
      <Link to="/analytics" className={`${styles.navItem} ${isActive('/analytics') ? styles.active : ''}`}>
        <BarChart3 />
        <span>Stats</span>
      </Link>
    </nav>
  );
};