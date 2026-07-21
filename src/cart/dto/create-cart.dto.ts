import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsMongoId,
} from 'class-validator';


export class CreateCartDto {


  @ApiProperty({
    example: "65f123456789abcd12345678"
  })
  @IsMongoId()
  userId!: string;



  @ApiProperty({
    example:[
      {
        productId:"65f123456789abcd12345678",
        productName:"Denim Jacket",
        price:112,
        quantity:2,
        size:"L",
        color:"#3B4A63"
      }
    ]
  })
  @IsArray()
  items!: any[];



  @ApiProperty({
    example:224
  })
  @IsNumber()
  totalAmount!: number;

}
