// device-token.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DeviceToken, DeviceTokenDocument } from './schema/device.schema';
import { RegisterDeviceTokenDto } from './dto/create-device.dto';

@Injectable()
export class DeviceTokenService {
  private readonly logger = new Logger(DeviceTokenService.name);

  constructor(
    @InjectModel(DeviceToken.name)
    private readonly deviceTokenModel: Model<DeviceTokenDocument>,
  ) {}

  async registerToken(
    userId: string,
    dto: RegisterDeviceTokenDto,
  ): Promise<DeviceToken> {
    // upsert: agar token already exist karta hai to userId/isActive update kar do
    // (case: pehle kisi aur user ne login kiya tha isi device pe)
    const token = await this.deviceTokenModel.findOneAndUpdate(
      { expoPushToken: dto.expoPushToken },
      {
        userId: new Types.ObjectId(userId),
        deviceType: dto.deviceType,
        deviceName: dto.deviceName,
        isActive: true,
        lastUsedAt: new Date(),
      },
      { upsert: true, new: true },
    );

    this.logger.log(`Device token registered for user ${userId}`);
    return token;
  }

  async removeToken(userId: string, expoPushToken: string): Promise<void> {
    await this.deviceTokenModel.deleteOne({
      userId: new Types.ObjectId(userId),
      expoPushToken,
    });
  }

  async getActiveTokensByUser(userId: string): Promise<string[]> {
    const tokens = await this.deviceTokenModel
      .find({ userId: new Types.ObjectId(userId), isActive: true })
      .select('expoPushToken')
      .lean();

    return tokens.map((t) => t.expoPushToken);
  }

  async getActiveTokensByUsers(userIds: string[]): Promise<string[]> {
    const objectIds = userIds.map((id) => new Types.ObjectId(id));
    const tokens = await this.deviceTokenModel
      .find({ userId: { $in: objectIds }, isActive: true })
      .select('expoPushToken')
      .lean();

    return tokens.map((t) => t.expoPushToken);
  }

  // jab Expo "DeviceNotRegistered" error de, tab ye call karo
  async deactivateToken(expoPushToken: string): Promise<void> {
    await this.deviceTokenModel.updateOne(
      { expoPushToken },
      { isActive: false },
    );
    this.logger.warn(`Deactivated invalid token: ${expoPushToken}`);
  }

  async getAllForUser(userId: string): Promise<DeviceToken[]> {
    return this.deviceTokenModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ lastUsedAt: -1 })
      .exec();
  }
}