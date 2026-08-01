import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schema/order.schema';

import { CreateOrderDto } from './dto/create-order.dto';

import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

async create(dto: CreateOrderDto) {
const orderNumber = `OCS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const order = await this.orderModel.create({
    ...dto,
    orderNumber,
  });

  return {
    success: true,
    message: 'Order created successfully',
    data: order,
  };
}

  async findAll() {
    const orders = await this.orderModel
      .find()
      .populate('userId')
      .populate('items.productId')
      .sort({
        createdAt: -1,
      });

    return {
      success: true,

      message: 'Orders fetched successfully',

      data: orders,
    };
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('items.productId');

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,

      message: 'Order fetched successfully',

      data: order,
    };
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,

      message: 'Order updated successfully',

      data: order,
    };
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,

      message: 'Order deleted successfully',
    };
  }
}
