export interface Order {
  id: string;
  customerName: string;
  address: string;
  quantityTrays: number;
  price: number;
  status: 'PENDIENTE' | 'ENTREGADO' | 'CANCELADO';
  deliveryDate: string;
  createdAt: string;
}