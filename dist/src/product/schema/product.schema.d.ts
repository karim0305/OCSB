import { HydratedDocument } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;
export declare class Product {
    productName: string;
    productCode: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    stockQty: number;
    sizes: string[];
    colors: string[];
    status: string;
    images: string[];
    isNewArrival: boolean;
    isFeatured: boolean;
    isPublished: boolean;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product, any, {}> & Product & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Product> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
