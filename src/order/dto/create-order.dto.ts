import { ApiProperty } from '@nestjs/swagger';
import {
 IsArray,
 IsEnum,
 IsMongoId,
 IsNumber,
 IsObject,
 IsString
} from 'class-validator';


export enum PaymentMethod {
  COD = 'cod',
  CARD = 'card',
  EASYPAISA = 'easypaisa',
  JAZZCASH = 'jazzcash',
  BANK_TRANSFER = 'bank_transfer',
}

export class CreateOrderDto {


@ApiProperty({
 example:"65f123456789abcd12345678"
})
@IsMongoId()
userId!:string;



@ApiProperty({
 example:[
  {
   productId:"65f123456789abcd12345678",
   productName:"Denim Jacket",
   price:112,
   quantity:1,
   size:"L",
   color:"Blue"
  }
 ]
})
@IsArray()
items!:any[];




@ApiProperty({
 example:112
})
@IsNumber()
totalAmount!:number;

@ApiProperty({
  enum: PaymentMethod,
  example: PaymentMethod.COD,
})
@IsEnum(PaymentMethod)
paymentMethod!: PaymentMethod;



@ApiProperty({
 example:{
  fullName:"Ali",
  phone:"03001234567",
  city:"Multan",
  address:"Street 1",
  postalCode:"60000"
 }
})
@IsObject()
shippingAddress!:object;



@ApiProperty({
 example:"pending"
})
@IsString()
orderStatus!:string;



@ApiProperty({
 example:"pending"
})
@IsString()
paymentStatus!:string;


}
