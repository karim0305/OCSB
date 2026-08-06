// src/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async create(dto: CreateNotificationDto) {
    return this.notificationModel.create({
      ...dto,
      userId: new Types.ObjectId(dto.userId),
    });
  }

  async findAllForUser(userId: string) {
    return this.notificationModel
      .find({ userId: new Types.ObjectId(userId), status: 'active' }) // 👈 sirf active
      .sort({ createdAt: -1 })
      .lean();
  }


  async markAsRead(userId: string, id: string) {
  return this.notificationModel.findOneAndUpdate(
    { _id: id, userId: new Types.ObjectId(userId) },
    { isRead: true },
    { new: true },
  );
}

  // 👇 ab ye hard delete nahi, status change karega
  async remove(userId: string, id: string) {
    const notification = await this.notificationModel.findOneAndUpdate(
      { _id: id, userId: new Types.ObjectId(userId) },
      { status: 'deleted' },
      { new: true },
    );
    return notification;
  }
}