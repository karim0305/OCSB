import { HydratedDocument, Types } from 'mongoose';
export type DeviceTokenDocument = HydratedDocument<DeviceToken>;
export declare class DeviceToken {
    userId: Types.ObjectId;
    expoPushToken: string;
    deviceType: string;
    deviceName?: string;
    isActive: boolean;
    lastUsedAt: Date;
}
export declare const DeviceTokenSchema: import("mongoose").Schema<DeviceToken, import("mongoose").Model<DeviceToken, any, any, any, import("mongoose").Document<unknown, any, DeviceToken, any, {}> & DeviceToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeviceToken, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DeviceToken>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<DeviceToken> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
