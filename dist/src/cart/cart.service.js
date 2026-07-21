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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("./schema/cart.schema");
let CartService = class CartService {
    cartModel;
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async create(dto) {
        const existingCart = await this.cartModel.findOne({
            userId: dto.userId
        });
        if (existingCart) {
            throw new common_1.ConflictException('User cart already exists');
        }
        const cart = await this.cartModel.create(dto);
        return {
            success: true,
            message: 'Cart created successfully',
            data: cart
        };
    }
    async findAll() {
        const carts = await this.cartModel.find()
            .populate('userId')
            .populate('items.productId');
        return {
            success: true,
            message: 'Carts fetched successfully',
            data: carts
        };
    }
    async findOne(id) {
        const cart = await this.cartModel.findById(id)
            .populate('items.productId');
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return {
            success: true,
            message: 'Cart fetched successfully',
            data: cart
        };
    }
    async update(id, dto) {
        const cart = await this.cartModel.findByIdAndUpdate(id, dto, {
            new: true,
            runValidators: true
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return {
            success: true,
            message: 'Cart updated successfully',
            data: cart
        };
    }
    async remove(id) {
        const cart = await this.cartModel.findByIdAndDelete(id);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return {
            success: true,
            message: 'Cart deleted successfully'
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map