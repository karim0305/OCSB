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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wishlist_schema_1 = require("./schema/wishlist.schema");
let WishlistService = class WishlistService {
    wishlistModel;
    constructor(wishlistModel) {
        this.wishlistModel = wishlistModel;
    }
    async create(dto) {
        const exists = await this.wishlistModel.findOne({
            userId: dto.userId
        });
        if (exists) {
            throw new common_1.ConflictException('Wishlist already exists for this user');
        }
        const wishlist = await this.wishlistModel.create(dto);
        return {
            success: true,
            message: 'Wishlist created successfully',
            data: wishlist
        };
    }
    async findAll(userId) {
        const filter = userId ? { userId } : {};
        const wishlists = await this.wishlistModel
            .find(filter)
            .populate('userId')
            .populate('products');
        return {
            success: true,
            message: 'Wishlists fetched successfully',
            data: wishlists
        };
    }
    async findOne(id) {
        const wishlist = await this.wishlistModel
            .findById(id)
            .populate('products');
        if (!wishlist) {
            throw new common_1.NotFoundException('Wishlist not found');
        }
        return {
            success: true,
            message: 'Wishlist fetched successfully',
            data: wishlist
        };
    }
    async update(id, dto) {
        const wishlist = await this.wishlistModel.findByIdAndUpdate(id, dto, {
            new: true,
            runValidators: true
        });
        if (!wishlist) {
            throw new common_1.NotFoundException('Wishlist not found');
        }
        return {
            success: true,
            message: 'Wishlist updated successfully',
            data: wishlist
        };
    }
    async remove(id) {
        const wishlist = await this.wishlistModel.findByIdAndDelete(id);
        if (!wishlist) {
            throw new common_1.NotFoundException('Wishlist not found');
        }
        return {
            success: true,
            message: 'Wishlist deleted successfully'
        };
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wishlist_schema_1.Wishlist.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map