// schemas/notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  body!: string;

  @Prop({
    type: String,
    enum: ['order', 'promo', 'general'],
    default: 'general',
  })
  type!: string;

  @Prop({ type: Object })
  data?: Record<string, any>;

  @Prop({ type: Boolean, default: false })
  isRead!: boolean;

    @Prop({ type: String, enum: ['active', 'deleted'], default: 'active' })
  status!: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);