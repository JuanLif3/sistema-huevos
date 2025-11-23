import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class SalesService {
    constructor (
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    // Crear un pedido
    async create (createOrderDto: CreateOrderDto): Promise<Order>{
    const order = this.orderRepository.create(createOrderDto)
    order.status = OrderStatus.PENDING;
    return this.orderRepository.save(order);
    }

    // Listar todo (Opcional, filtrar por estado)
    async findAll () {
        return this.orderRepository.find({
            order: { deliveryDate: 'ASC' } // Los mas urgentes primero
        });
    }

    // Buscar por uno
    async findOne (id: string) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) throw new NotFoundException(`Pedido ${id} no enontrado`);
        return order;
    }

    // Actualizar un pedido
    async update (id: string, updateOrderDto: UpdateOrderDto) {
        const order = await this.findOne(id);
        const updated = Object.assign(order, updateOrderDto);
        return this.orderRepository.save(updated);
    }

    // Marcar como entregado (Metodo especial rapido)
    async markAsDelivered(id: string) {
        const order = await this.findOne(id);
        order.status = OrderStatus.DELIVERED;
        return this.orderRepository.save(order);
    }

    // Elimianr
    async remove(id: string) {
        const result = await this.orderRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Pedido ${id} no encontrado`);
    }
}
