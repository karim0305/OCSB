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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schema/product.schema");
let ProductService = class ProductService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createProductDto) {
        const existingProduct = await this.productModel.findOne({
            $or: [
                { productName: createProductDto.productName.trim() },
                { productCode: createProductDto.productCode.trim() },
            ],
        });
        if (existingProduct) {
            if (existingProduct.productName === createProductDto.productName.trim()) {
                throw new common_1.ConflictException('Product name already exists.');
            }
            throw new common_1.ConflictException('Product code already exists.');
        }
        const product = await this.productModel.create(createProductDto);
        return {
            success: true,
            message: 'Product created successfully.',
            data: product,
        };
    }
    async findAll() {
        const products = await this.productModel
            .find()
            .sort({ createdAt: -1 });
        return {
            success: true,
            message: 'Products fetched successfully.',
            data: products,
        };
    }
    async findOne(id) {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found.');
        }
        return {
            success: true,
            message: 'Product fetched successfully.',
            data: product,
        };
    }
    async update(id, dto) {
        if (dto.productCode) {
            const existingProductCode = await this.productModel.findOne({
                productCode: dto.productCode.trim(),
                _id: { $ne: id },
            });
            if (existingProductCode) {
                throw new common_1.ConflictException('Product code already exists.');
            }
        }
        const product = await this.productModel.findByIdAndUpdate(id, dto, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found.');
        }
        return {
            success: true,
            message: 'Product updated successfully.',
            data: product,
        };
    }
    async remove(id) {
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found.');
        }
        return {
            success: true,
            message: 'Product deleted successfully.',
        };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map