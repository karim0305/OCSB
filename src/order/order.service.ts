import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schema/order.schema';

import { CreateOrderDto } from './dto/create-order.dto';

import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from 'src/notification/dto/create-notification.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  // 👇 order status ke messages
  private orderStatusMessages: Record<string, { title: string; body: string }> = {
    pending: {
      title: 'Order Placed ✅',
      body: 'Your order has been placed and is pending confirmation.',
    },
    confirmed: {
      title: 'Order Confirmed 👍',
      body: 'Your order has been confirmed and will be processed soon.',
    },
    processing: {
      title: 'Order Processing 📦',
      body: 'Your order is being packed and prepared for shipment.',
    },
    shipped: {
      title: 'Order Shipped 🚚',
      body: 'Your order has been shipped and is on its way to you.',
    },
    delivered: {
      title: 'Order Delivered ✅',
      body: 'Your order has been delivered successfully. Enjoy!',
    },
    cancelled: {
      title: 'Order Cancelled ❌',
      body: 'Your order has been cancelled.',
    },
  };

  // 👇 payment status ke messages
  private paymentStatusMessages: Record<string, { title: string; body: string }> = {
    pending: {
      title: 'Payment Pending ⏳',
      body: 'Your payment is pending. Please complete it to confirm your order.',
    },
    paid: {
      title: 'Payment Received 💰',
      body: 'Your payment has been received successfully.',
    },
    failed: {
      title: 'Payment Failed ⚠️',
      body: 'Your payment could not be processed. Please try again.',
    },
  };

  async create(dto: CreateOrderDto) {
    const orderNumber = `OCS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await this.orderModel.create({
      ...dto,
      orderNumber,
    });

    // 👇 order create hone pe notification
    await this.notificationService.create({
      userId: order.userId.toString(),
      title: 'Order Placed ✅',
      body: `Your order #${order.orderNumber} has been placed successfully!`,
      type: NotificationType.ORDER,
      data: {
        orderId: order._id.toString(),
        orderNumber: order.orderNumber,
      },
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
    // 👇 pehle purana order fetch karein taake compare kar sakein kya change hua
    const existingOrder = await this.orderModel.findById(id);

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    const previousOrderStatus = existingOrder.orderStatus;
    const previousPaymentStatus = existingOrder.paymentStatus;

    const order = await this.orderModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // 👇 sirf tab notification bhejein jab orderStatus waqai change hua ho
    if (dto.orderStatus && dto.orderStatus !== previousOrderStatus) {
      const message = this.orderStatusMessages[dto.orderStatus];
      if (message) {
        await this.notificationService.create({
          userId: order.userId.toString(),
          title: message.title,
          body: `${message.body} (Order #${order.orderNumber})`,
          type: NotificationType.ORDER,
          data: {
            orderId: order._id.toString(),
            orderNumber: order.orderNumber,
            orderStatus: order.orderStatus,
          },
        });
      }
    }

    // 👇 sirf tab notification bhejein jab paymentStatus waqai change hua ho
    if (dto.paymentStatus && dto.paymentStatus !== previousPaymentStatus) {
      const message = this.paymentStatusMessages[dto.paymentStatus];
      if (message) {
        await this.notificationService.create({
          userId: order.userId.toString(),
          title: message.title,
          body: `${message.body} (Order #${order.orderNumber})`,
          type: NotificationType.ORDER,
          data: {
            orderId: order._id.toString(),
            orderNumber: order.orderNumber,
            paymentStatus: order.paymentStatus,
          },
        });
      }
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