import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'PENDIENTE',
    DELIVERED = 'ENTREGADO',
    CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    customerName: string;

    @Column('text')
    address: string;

    @Column('int', { default: 1 }) 
    quantityTrays: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column('timestamp')
    deliveryDate: Date; // Cuándo se debe entregar (para las alertas)

    @CreateDateColumn()
    creatredAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}