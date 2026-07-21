import { HydratedDocument, Types } from 'mongoose';
export type CartDocument = HydratedDocument<Cart>;
export declare class Cart {
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
}
export declare const CartSchema: import("mongoose").Schema<Cart, import("mongoose").Model<Cart, any, any, any, import("mongoose").Document<unknown, any, Cart, any, {}> & Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Cart>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Cart> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
