import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DeviceTokenDocument = HydratedDocument<DeviceToken>;

@Schema({
  timestamps: true,
})
export class DeviceToken {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  expoPushToken!: string;

  @Prop({
    type: String,
    enum: ['ios', 'android'],
    required: true,
  })
  deviceType!: string;

  @Prop({
    type: String,
  })
  deviceName?: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive!: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  lastUsedAt!: Date;
}

export const DeviceTokenSchema = SchemaFactory.createForClass(DeviceToken);

// same userId multiple devices rakh sakta hai, isliye compound index
DeviceTokenSchema.index({ userId: 1, expoPushToken: 1 }, { unique: true });