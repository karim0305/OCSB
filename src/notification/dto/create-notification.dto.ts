// dto/create-notification.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsMongoId, IsObject } from 'class-validator';

export enum NotificationType {
  ORDER = 'order',
  PROMO = 'promo',
  GENERAL = 'general',
  USER = 'user',
}

export class CreateNotificationDto {
  @ApiProperty({ example: '64f1a2b3c4d5e6f7a8b9c0d1' })
  @IsMongoId()
  userId!: string;

  @ApiProperty({ example: 'Order Shipped 🚚' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Your order is on its way!' })
  @IsString()
  @IsNotEmpty()
  body!: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.ORDER })
  @IsEnum(NotificationType)
  type!: NotificationType;

  @ApiPropertyOptional({ example: { orderId: '64f1a2b3c4d5e6f7a8b9c0d1' } })
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}