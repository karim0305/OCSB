import { HydratedDocument } from 'mongoose';
export type OfferDocument = HydratedDocument<Offer>;
export declare class Offer {
    smallTitle: string;
    heading: string;
    buttonText: string;
    buttonLink: string;
    bannerImage?: string;
    backgroundColor: string;
    buttonColor: string;
    textColor: string;
    isActive: boolean;
    sortOrder: number;
    startDate?: Date;
    endDate?: Date;
}
export declare const OfferSchema: import("mongoose").Schema<Offer, import("mongoose").Model<Offer, any, any, any, import("mongoose").Document<unknown, any, Offer, any, {}> & Offer & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Offer, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Offer>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Offer> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
