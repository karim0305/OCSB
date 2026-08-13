"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schema/order.schema");
const notification_service_1 = require("../notification/notification.service");
const create_notification_dto_1 = require("../notification/dto/create-notification.dto");
let OrderService = class OrderService {
    orderModel;
    notificationService;
    constructor(orderModel, notificationService) {
        this.orderModel = orderModel;
        this.notificationService = notificationService;
    }
    orderStatusMessages = {
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
    paymentStatusMessages = {
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
    async create(dto) {
        const orderNumber = `OCS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const order = await this.orderModel.create({
            ...dto,
            orderNumber,
        });
        await this.notificationService.create({
            userId: order.userId.toString(),
            title: 'Order Placed ✅',
            body: `Your order #${order.orderNumber} has been placed successfully!`,
            type: create_notification_dto_1.NotificationType.ORDER,
            data: {
                orderId: order._id.toString(),
                orderNumber: order.orderNumber,
            },
        });
        await this.notificationService.notifyAllAdmins('New Order Placed 🛍️', `Order #${order.orderNumber} placed — Rs ${order.totalAmount}`, create_notification_dto_1.NotificationType.ORDER, {
            orderId: order._id.toString(),
            orderNumber: order.orderNumber,
            totalAmount: order.totalAmount,
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
    async findOne(id) {
        const order = await this.orderModel
            .findById(id)
            .populate('items.productId');
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return {
            success: true,
            message: 'Order fetched successfully',
            data: order,
        };
    }
    async update(id, dto) {
        const existingOrder = await this.orderModel.findById(id);
        if (!existingOrder) {
            throw new common_1.NotFoundException('Order not found');
        }
        const previousOrderStatus = existingOrder.orderStatus;
        const previousPaymentStatus = existingOrder.paymentStatus;
        const order = await this.orderModel.findByIdAndUpdate(id, dto, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (dto.orderStatus && dto.orderStatus !== previousOrderStatus) {
            const message = this.orderStatusMessages[dto.orderStatus];
            if (message) {
                await this.notificationService.create({
                    userId: order.userId.toString(),
                    title: message.title,
                    body: `${message.body} (Order #${order.orderNumber})`,
                    type: create_notification_dto_1.NotificationType.ORDER,
                    data: {
                        orderId: order._id.toString(),
                        orderNumber: order.orderNumber,
                        orderStatus: order.orderStatus,
                    },
                });
                if (dto.orderStatus === 'cancelled') {
                    await this.notificationService.notifyAllAdmins('Order Cancelled ❌', `Order #${order.orderNumber} was cancelled.`, create_notification_dto_1.NotificationType.ORDER, {
                        orderId: order._id.toString(),
                        orderNumber: order.orderNumber,
                        orderStatus: order.orderStatus,
                    });
                }
            }
        }
        if (dto.paymentStatus && dto.paymentStatus !== previousPaymentStatus) {
            const message = this.paymentStatusMessages[dto.paymentStatus];
            if (message) {
                await this.notificationService.create({
                    userId: order.userId.toString(),
                    title: message.title,
                    body: `${message.body} (Order #${order.orderNumber})`,
                    type: create_notification_dto_1.NotificationType.ORDER,
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
    async remove(id) {
        const order = await this.orderModel.findByIdAndDelete(id);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return {
            success: true,
            message: 'Order deleted successfully',
        };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_service_1.NotificationService])
], OrderService);
//# sourceMappingURL=order.service.js.map