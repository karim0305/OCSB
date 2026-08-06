import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationService {
    private readonly notificationModel;
    constructor(notificationModel: Model<NotificationDocument>);
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
}
