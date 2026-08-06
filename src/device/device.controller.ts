// device-token.controller.ts
import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { DeviceTokenService } from './device.service';
import { RegisterDeviceTokenDto } from './dto/create-device.dto';
import { RemoveDeviceTokenDto } from './dto/remove-device-token.dto';


@ApiTags('Device Tokens')
@ApiBearerAuth()
@Controller('device-tokens')
export class DeviceTokenController {
  constructor(private readonly deviceTokenService: DeviceTokenService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register or update Expo push token for logged-in user' })
  @ApiBody({ type: RegisterDeviceTokenDto })
  @ApiResponse({ status: 200, description: 'Token registered successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async registerToken(@Req() req: any, @Body() dto: RegisterDeviceTokenDto) {
    const userId = req.user.userId;
    return this.deviceTokenService.registerToken(userId, dto);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove device token (e.g. on logout)' })
  @ApiBody({ type: RemoveDeviceTokenDto })
  @ApiResponse({ status: 200, description: 'Token removed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeToken(@Req() req: any, @Body() dto: RemoveDeviceTokenDto) {
    const userId = req.user.userId;
    await this.deviceTokenService.removeToken(userId, dto.expoPushToken);
    return { message: 'Device token removed' };
  }

  @Get('my-devices')
  @ApiOperation({ summary: 'Get all registered devices for logged-in user' })
  @ApiResponse({ status: 200, description: 'List of device tokens' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyDevices(@Req() req: any) {
    const userId = req.user.userId;
    return this.deviceTokenService.getAllForUser(userId);
  }
}