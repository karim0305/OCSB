// dto/update-device.dto.ts
import { PartialType } from '@nestjs/swagger';
import { RegisterDeviceTokenDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(RegisterDeviceTokenDto) {}