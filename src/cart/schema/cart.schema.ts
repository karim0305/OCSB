import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;


@Schema({
  timestamps: true,
})
export class Cart {

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId!: Types.ObjectId;


  @Prop({
    type: [
      {
        productId: {
          type: Types.ObjectId,
          ref: 'Product',
          required: true,
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
          default: 1,
        },

        size: {
          type: String,
        },

        color: {
          type: String,
        },
      },
    ],
    default: [],
  })
  items!: {
    productId: Types.ObjectId;
    productName: string;
    image?: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }[];


  @Prop({
    default: 0,
  })
  totalAmount!: number;
}


export const CartSchema = SchemaFactory.createForClass(Cart);
