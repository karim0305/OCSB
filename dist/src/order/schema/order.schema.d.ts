import { HydratedDocument, Types } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;
export declare class Order {
    userId: Types.ObjectId;
    items: {
        productId: Types.ObjectId;
        productName: string;
        image?: string;
        price: number;
        quantity: number;
        size?: string;
        color?: string;
    }[];
    totalAmount: number;
    amountType: string;
    orderStatus: string;
    paymentStatus: string;
    shippingAddress: {
        fullName: string;
        phone: string;
        city: string;
        address: string;
        postalCode: string;
    };
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, import("mongoose").Document<unknown, any, Order, any, {}> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Order> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
