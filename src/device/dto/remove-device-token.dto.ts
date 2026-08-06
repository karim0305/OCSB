// dto/remove-device-token.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RemoveDeviceTokenDto {
  @ApiProperty({
    description: 'Expo push token to remove (on logout)',
    example: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
  })
  @IsString()
  @IsNotEmpty()
  expoPushToken!: string;
}