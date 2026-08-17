import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({
    example: 'END OF SEASON',
  })
  @IsString()
  @IsNotEmpty()
  smallTitle: string;

  @ApiProperty({
    example: 'Up to 40% off outerwear',
  })
  @IsString()
  @IsNotEmpty()
  heading: string;

  @ApiProperty({
    example: 'SHOP THE SALE',
  })
  @IsString()
  @IsNotEmpty()
  buttonText: string;

  @ApiProperty({
    example: '/sale',
  })
  @IsString()
  @IsNotEmpty()
  buttonLink: string;

  @ApiPropertyOptional({
    example: 'https://example.com/uploads/offer-banner.jpg',
  })
  @IsOptional()
  @IsString()
  bannerImage?: string;

  @ApiPropertyOptional({
    example: '#1B1B1B',
    default: '#1B1B1B',
  })
  @IsOptional()
  @IsHexColor()
  backgroundColor?: string;

  @ApiPropertyOptional({
    example: '#C45127',
    default: '#C45127',
  })
  @IsOptional()
  @IsHexColor()
  buttonColor?: string;

  @ApiPropertyOptional({
    example: '#FFFFFF',
    default: '#FFFFFF',
  })
  @IsOptional()
  @IsHexColor()
  textColor?: string;

  @ApiPropertyOptional({
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: '2026-08-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-08-31T23:59:59.000Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}