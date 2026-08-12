import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';
import { CreateNotificationDto, NotificationType } from './dto/create-notification.dto';
import { UserDocument } from '../user/schema/user.schema';
export declare class NotificationService {
    private readonly notificationModel;
    private readonly userModel;
    constructor(notificationModel: Model<NotificationDocument>, userModel: Model<UserDocument>);
    create(dto: CreateNotificationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findAllForUser(userId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    countUnread(userId: string): Promise<{
        count: number;
    }>;
    markAsRead(userId: string, id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    remove(userId: string, id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    notifyAllAdmins(title: string, body: string, type: NotificationType, data?: Record<string, any>): Promise<void>;
}
