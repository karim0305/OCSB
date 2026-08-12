import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart, CartDocument } from './schema/cart.schema';

import { CreateCartDto } from './dto/create-cart.dto';

import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
  ) {}

  async create(dto: CreateCartDto) {
    const existingCart = await this.cartModel.findOne({
      userId: dto.userId,
    });

    // Case 1: Cart exist nahi karta — naya bana do
    if (!existingCart) {
      // 👇 FIX: totalAmount pehle calculate nahi ho raha tha, isliye
      // naye cart ka totalAmount hamesha 0 (schema default) rehta tha.
      const totalAmount = dto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const cart = await this.cartModel.create({
        ...dto,
        totalAmount,
      });

      return {
        success: true,
        message: 'Cart created successfully',
        data: cart,
      };
    }

    // Case 2: Cart exist karta hai — naye items check + merge karo
    for (const newItem of dto.items) {
      const duplicateItem = existingCart.items.find(
        (item) =>
          item.productId.toString() === newItem.productId.toString() &&
          item.size === newItem.size &&
          item.color === newItem.color,
      );

      if (duplicateItem) {
        throw new ConflictException(
          `${newItem.productName} (Size: ${newItem.size}, Color: ${newItem.color}) is already in your cart`,
        );
      }

      existingCart.items.push(newItem);
    }

    // totalAmount recalculate karo
    existingCart.totalAmount = existingCart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    await existingCart.save();

    return {
      success: true,
      message: 'Item added to cart successfully',
      data: existingCart,
    };
  }

  async findAll() {
    const carts = await this.cartModel
      .find()
      .populate('userId')
      .populate('items.productId');

    return {
      success: true,

      message: 'Carts fetched successfully',

      data: carts,
    };
  }

  async findOne(id: string) {
    const cart = await this.cartModel.findById(id).populate('items.productId');

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return {
      success: true,

      message: 'Cart fetched successfully',

      data: cart,
    };
  }

  async update(id: string, dto: UpdateCartDto) {
    // 👇 FIX (bonus): agar frontend items update karta hai (quantity change/remove),
    // to totalAmount bhi yahan recalculate hona chahiye, warna wo stale reh jayega
    // jab tak koi doosra update na aaye jo explicitly totalAmount bhi bheje.
    const payload: any = { ...dto };
    if (dto.items) {
      payload.totalAmount = dto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    }

    const cart = await this.cartModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return {
      success: true,

      message: 'Cart updated successfully',

      data: cart,
    };
  }

  async remove(id: string) {
    const cart = await this.cartModel.findByIdAndDelete(id);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return {
      success: true,

      message: 'Cart deleted successfully',
    };
  }

  async findByUserId(userId: string) {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.productId');

    return {
      success: true,
      message: cart ? 'Cart fetched successfully' : 'No cart found',
      data: cart, // null agar cart exist nahi karta
    };
  }
}
