// src/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';
import { CreateNotificationDto, NotificationType } from './dto/create-notification.dto';
import { User, UserDocument } from '../user/schema/user.schema'; // 👈 adjust path if different

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name) // 👈 admin users dhoondne ke liye
    private readonly userModel: Model<UserDocument>,
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

  // 👇 NEW: bell icon badge ke liye — sirf count, poori list nahi
  async countUnread(userId: string) {
    const count = await this.notificationModel.countDocuments({
      userId: new Types.ObjectId(userId),
      status: 'active',
      isRead: false,
    });
    return { count };
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

  // =========================================================
  // ADMIN BROADCAST — naye order, naye user registration jaise
  // events par SAARE admins ko notify karta hai (multiple admin
  // accounts hone par bhi automatically sab ko milega).
  // =========================================================
  async notifyAllAdmins(
    title: string,
    body: string,
    type: NotificationType,
    data: Record<string, any> = {},
  ) {
    console.log('🔔 notifyAllAdmins() CALLED with title:', title);

    const admins = await this.userModel
      .find({ role: 'Admin' })
      .select('_id')
      .lean();

    console.log('🔔 Admins found:', admins.length, admins);

    if (!admins.length) {
      console.log('⚠️ No admins found — skipping notification creation');
      return;
    }

    const result = await this.notificationModel.insertMany(
      admins.map((admin) => ({
        userId: admin._id,
        title,
        body,
        type,
        data,
        isRead: false,
        status: 'active',
      })),
    );

    console.log('✅ Admin notifications created:', result.length);
  }
}