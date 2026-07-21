import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type OrderDocument = HydratedDocument<Order>;


@Schema({
  timestamps:true,
})
export class Order {


  @Prop({
    type:Types.ObjectId,
    ref:'User',
    required:true,
  })
  userId!: Types.ObjectId;



  @Prop({
    type:[
      {
        productId:{
          type:Types.ObjectId,
          ref:'Product',
        },

        productName:{
          type:String,
          required:true,
        },

        image:{
          type:String,
        },

        price:{
          type:Number,
          required:true,
        },

        quantity:{
          type:Number,
          required:true,
        },

        size:{
          type:String,
        },

        color:{
          type:String,
        }
      }
    ],
    required:true,
  })
  items!: {
    productId:Types.ObjectId;
    productName:string;
    image?:string;
    price:number;
    quantity:number;
    size?:string;
    color?:string;
  }[];



  @Prop({
    required:true,
  })
  totalAmount!:number;



  @Prop({
    default:'pending',
    enum:[
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled'
    ]
  })
  orderStatus!:string;



  @Prop({
    default:'pending',
    enum:[
      'pending',
      'paid',
      'failed'
    ]
  })
  paymentStatus!:string;




  @Prop({
    type:{
      fullName:String,
      phone:String,
      city:String,
      address:String,
      postalCode:String
    },
    required:true
  })
  shippingAddress!: {
    fullName:string;
    phone:string;
    city:string;
    address:string;
    postalCode:string;
  };

}



export const OrderSchema =
SchemaFactory.createForClass(Order);
