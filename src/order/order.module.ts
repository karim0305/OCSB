import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from './schema/order.schema';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { NotificationModule } from '../notification/notification.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
        NotificationModule, 
  ],

  controllers: [OrderController],

  providers: [OrderService],

  exports: [OrderService],
})
export class OrderModule {}
