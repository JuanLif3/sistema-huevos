export interface Order {
  id: string;
  customerName: string;
  address: string;
  quantityTrays: number;
  price: number;
  status: 'PENDING' | 'DELIVERED' | 'CANCELLED';
  deliveryDate: string;
  createdAt: string;
}