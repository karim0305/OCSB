import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
} from 'class-validator';


export class CreateWishlistDto {


  @ApiProperty({
    example:'65f123456789abcd12345678'
  })
  @IsMongoId()
  userId!: string;



  @ApiProperty({
    example:[
      '65f123456789abcd12345678',
      '65f123456789abcd12345679'
    ],
    type:[String]
  })
  @IsArray()
  products!: string[];

}
