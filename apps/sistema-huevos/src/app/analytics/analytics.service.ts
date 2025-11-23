import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../sales/entities/order.entity';
import { Supply } from '../supplies/entities/supply.entity';

@Injectable()
export class AnalyticsService {
    constructor (
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
        @InjectRepository(Supply)
        private readonly SupplyRepo: Repository<Supply>,
    ) {}

    async getgeneralStats() {
        // 1. Calcular total de ventas (Ingresos)
        // Sumamos la columna 'price' de todos los pedidos que NO estan cancelados
        const salesResult = await this.orderRepo
        .createQueryBuilder('order')
        .select('SUM(order.price)', 'total')
        .where('order.status::text != :status', { status: 'CANCELLED' })
        .getRawOne();

        // 2. Calcular Total de Compras (Egresos)
        // Sumamos la columna 'cost' de todos los suministros
        const suppliesResult = await this.SupplyRepo
        .createQueryBuilder('supplu')
        .select('SUM(supply.cost', 'total')
        .getRawOne();

        // 3. Calcular Totales Numéricos (Manejar nulos si es la primera vez)
        const totalIncome = parseFloat(salesResult.total || '0');
        const totalExpenses = parseFloat(suppliesResult.total || '0');
        const profit = totalIncome - totalExpenses;

        // 4. Contar Cantidades Físicas (Inventario aproximado)
        // ¿Cuántas bandejas se vendieron?
        const traysSoldResult = await this.orderRepo
        .createQueryBuilder('order')
        .select('SUM(order.quantityTrays)', 'total')
        .where('order.status::text != :status', { status: 'CANCELLED' })
        .getRawOne();

        const traysSold = parseInt(traysSoldResult.total || '0');

        // Retornar el resumen ejecutivo
        return {
        totalIncome,      // Cuánto entró ($)
        totalExpenses,    // Cuánto salió ($)
        netProfit: profit, // Ganancia Real ($)
        traysSold,        // Bandejas vendidas
        margin: totalIncome > 0 ? ((profit / totalIncome) * 100).toFixed(1) + '%' : '0%', // Margen de ganancia %
        };
    }
}
