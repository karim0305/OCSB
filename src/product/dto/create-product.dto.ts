import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Selvedge Raw Denim Jacket',
  })
  @IsString()
  productName!: string;

  @ApiProperty({
    example: 'Wolfgang',
  })
  @IsString()
  brand!: string;

  @ApiProperty({
    example: 'Outerwear',
  })
  @IsString()
  category!: string;

  @ApiPropertyOptional({
    example: 'Crafted from Japanese selvedge denim.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 112,
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    example: 8,
  })
  @IsNumber()
  stockQty!: number;

  @ApiProperty({
    type: [String],
    example: ['S', 'M', 'L', 'XL'],
  })
  @IsArray()
  @IsString({ each: true })
  sizes!: string[];

  @ApiProperty({
    type: [String],
    example: ['#3B4A63', '#373733', '#8B6F4E'],
  })
  @IsArray()
  @IsString({ each: true })
  colors!: string[];

  @ApiProperty({
    type: [String],
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  images!: string[];

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isNewArrival!: boolean;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isFeatured!: boolean;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isPublished!: boolean;
}
