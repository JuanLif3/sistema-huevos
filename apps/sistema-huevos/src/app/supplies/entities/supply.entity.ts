import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('supplies')
export class Supply {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    quantityBoxes: number; // Cuantas cajas compraron

    @Column('decimal', { precision: 10, scale: 2 })
    cost: number;

    @Column('text', { nullable: true })
    provider: string // Nombre del proveedor (opcional)

    @Column('timestamp')
    purchaseDate: Date // Fecha de compra

    @CreateDateColumn()
    createdAt: Date;
}