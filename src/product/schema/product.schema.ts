import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
    trim: true,
  })
  productName!: string;

  @Prop({
    required: true,
    trim: true,
  })
  brand!: string;

  @Prop({
    required: true,
    trim: true,
  })
  category!: string;

  @Prop({
    default: '',
  })
  description!: string;

  @Prop({
    required: true,
  })
  price!: number;

  @Prop({
    default: 0,
  })
  stockQty!: number;

  @Prop({
    type: [String],
    default: [],
  })
  sizes!: string[];

  @Prop({
    type: [String],
    default: [],
  })
  colors!: string[];

  @Prop({
    type: [String],
    default: [],
  })
  images!: string[];

  @Prop({
    default: false,
  })
  isNewArrival!: boolean;

  @Prop({
    default: false,
  })
  isFeatured!: boolean;

  @Prop({
    default: true,
  })
  isPublished!: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
