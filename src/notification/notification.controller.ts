// notification.controller.ts
import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from '../user/auth/jwt-auth.guard';   // 👈 add karein

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)        // 👈 add karein
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Send notification to a user' })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get notifications for logged-in user' })
  findAll(@Req() req: any) {
    return this.notificationService.findAllForUser(req.user.userId);
  }


  @Patch(':id/read')
@ApiOperation({ summary: 'Mark notification as read' })
markAsRead(@Req() req: any, @Param('id') id: string) {
  return this.notificationService.markAsRead(req.user.userId, id);
}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  remove(@Req() req: any, @Param('id') id: string) {
    return this.notificationService.remove(req.user.userId, id);
  }
}