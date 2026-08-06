// dto/register-device-token.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum DeviceType {
  IOS = 'ios',
  ANDROID = 'android',
}

export class RegisterDeviceTokenDto {
  @ApiProperty({
    description: 'Expo push notification token',
    example: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
  })
  @IsString()
  @IsNotEmpty()
  expoPushToken!: string;

  @ApiProperty({
    description: 'Device platform',
    enum: DeviceType,
    example: DeviceType.ANDROID,
  })
  @IsEnum(DeviceType)
  @IsNotEmpty()
  deviceType!: DeviceType;

  @ApiPropertyOptional({
    description: 'Device model/name for identification',
    example: 'Samsung Galaxy S23',
  })
  @IsString()
  @IsOptional()
  deviceName?: string;
}