import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productModel.findOne({
      productName: createProductDto.productName.trim(),
    });

    if (existingProduct) {
      throw new ConflictException('Product name already exists.');
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

  async findOne(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return {
      success: true,
      message: 'Product fetched successfully.',
      data: product,
    };
  }

  async update(id: string, dto: UpdateProductDto) {
    if (dto.productName) {
      const existingProduct = await this.productModel.findOne({
        productName: dto.productName.trim(),
        _id: { $ne: id },
      });

      if (existingProduct) {
        throw new ConflictException('Product name already exists.');
      }
    }

    const product = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return {
      success: true,
      message: 'Product updated successfully.',
      data: product,
    };
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return {
      success: true,
      message: 'Product deleted successfully.',
    };
  }
}
