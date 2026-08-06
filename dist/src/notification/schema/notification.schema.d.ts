import { HydratedDocument, Types } from 'mongoose';
export type NotificationDocument = HydratedDocument<Notification>;
export declare class Notification {
    userId: Types.ObjectId;
    title: string;
    body: string;
    type: string;
    data?: Record<string, any>;
    isRead: boolean;
    status: string;
}
export declare const NotificationSchema: import("mongoose").Schema<Notification, import("mongoose").Model<Notification, any, any, any, import("mongoose").Document<unknown, any, Notification, any, {}> & Notification & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Notification>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Notification> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
