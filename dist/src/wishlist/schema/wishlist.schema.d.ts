import { HydratedDocument, Types } from 'mongoose';
export type WishlistDocument = HydratedDocument<Wishlist>;
export declare class Wishlist {
    userId: Types.ObjectId;
    products: Types.ObjectId[];
}
export declare const WishlistSchema: import("mongoose").Schema<Wishlist, import("mongoose").Model<Wishlist, any, any, any, import("mongoose").Document<unknown, any, Wishlist, any, {}> & Wishlist & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Wishlist, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Wishlist>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Wishlist> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
