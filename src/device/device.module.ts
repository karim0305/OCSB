// device-token.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceToken, DeviceTokenSchema } from './schema/device.schema';
import { DeviceTokenService } from './device.service';
import { DeviceTokenController } from './device.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeviceToken.name, schema: DeviceTokenSchema },
    ]),
  ],
  controllers: [DeviceTokenController],
  providers: [DeviceTokenService],
  exports: [DeviceTokenService], // Notification module isko import kar ke use karega
})
export class DeviceTokenModule {}