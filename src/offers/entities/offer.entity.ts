import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type OfferDocument = HydratedDocument<Offer>;

@Schema({
  timestamps: true,
  collection: 'offers',
})
export class Offer {
  @ApiProperty({
    example: 'END OF SEASON',
    description: 'Small text displayed above the main offer heading',
  })
  @Prop({
    required: true,
    trim: true,
  })
  smallTitle: string;

  @ApiProperty({
    example: 'Up to 40% off outerwear',
    description: 'Main offer heading',
  })
  @Prop({
    required: true,
    trim: true,
  })
  heading: string;

  @ApiProperty({
    example: 'SHOP THE SALE',
    description: 'CTA button text',
  })
  @Prop({
    required: true,
    trim: true,
  })
  buttonText: string;

  @ApiProperty({
    example: '/sale',
    description: 'Route or URL for the CTA button',
  })
  @Prop({
    required: true,
    trim: true,
  })
  buttonLink: string;

  @ApiPropertyOptional({
    example: 'https://example.com/uploads/offer-banner.jpg',
    description: 'Optional offer/banner image URL',
    nullable: true,
  })
  @Prop({
    default: null,
  })
  bannerImage?: string;

  @ApiProperty({
    example: '#1B1B1B',
    description: 'Offer banner background color',
    default: '#1B1B1B',
  })
  @Prop({
    required: true,
    default: '#1B1B1B',
  })
  backgroundColor: string;

  @ApiProperty({
    example: '#C45127',
    description: 'CTA button background color',
    default: '#C45127',
  })
  @Prop({
    required: true,
    default: '#C45127',
  })
  buttonColor: string;

  @ApiProperty({
    example: '#FFFFFF',
    description: 'Offer banner text color',
    default: '#FFFFFF',
  })
  @Prop({
    required: true,
    default: '#FFFFFF',
  })
  textColor: string;

  @ApiProperty({
    example: true,
    description: 'Whether this offer is active',
    default: true,
  })
  @Prop({
    required: true,
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: 1,
    description: 'Display order of the offer',
    default: 1,
  })
  @Prop({
    required: true,
    default: 1,
  })
  sortOrder: number;

  @ApiPropertyOptional({
    example: '2026-08-01T00:00:00.000Z',
    description: 'Offer start date',
  })
  @Prop({
    default: null,
  })
  startDate?: Date;

  @ApiPropertyOptional({
    example: '2026-08-31T23:59:59.000Z',
    description: 'Offer expiry date',
  })
  @Prop({
    default: null,
  })
  endDate?: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);