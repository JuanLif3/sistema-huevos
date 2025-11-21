import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])], // Registrar Entidad
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService], // Por si lo necesitamos en estadísticas luego
})
export class SalesModule {}
