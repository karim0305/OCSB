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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Order = class Order {
    userId;
    items;
    totalAmount;
    amountType;
    orderStatus;
    paymentStatus;
    shippingAddress;
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                productId: {
                    type: mongoose_2.Types.ObjectId,
                    ref: 'Product',
                },
                productName: {
                    type: String,
                    required: true,
                },
                image: {
                    type: String,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                size: {
                    type: String,
                },
                color: {
                    type: String,
                }
            }
        ],
        required: true,
    }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['cod', 'card', 'easypaisa', 'jazzcash', 'bank_transfer'],
        default: 'cod',
    }),
    __metadata("design:type", String)
], Order.prototype, "amountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 'pending',
        enum: [
            'pending',
            'confirmed',
            'processing',
            'shipped',
            'delivered',
            'cancelled'
        ]
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 'pending',
        enum: [
            'pending',
            'paid',
            'failed'
        ]
    }),
    __metadata("design:type", String)
], Order.prototype, "paymentStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            fullName: String,
            phone: String,
            city: String,
            address: String,
            postalCode: String
        },
        required: true
    }),
    __metadata("design:type", Object)
], Order.prototype, "shippingAddress", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map