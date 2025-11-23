import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Order } from '../sales/entities/order.entity';
import { Supply } from '../supplies/entities/supply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Supply])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
