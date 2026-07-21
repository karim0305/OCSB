import { Document, Types } from "mongoose";
export type UserDocument = User & Document;
export declare class User {
    UserId: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    cnic: string;
    address: string;
    role: string;
    image: string;
    lastLogin: Date;
    status: string;
    password: string;
    otp?: string;
    otpExpiresAt?: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
