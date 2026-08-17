import { Model } from 'mongoose';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer, OfferDocument } from './entities/offer.entity';
export declare class OffersService {
    private readonly offerModel;
    constructor(offerModel: Model<OfferDocument>);
    create(createOfferDto: CreateOfferDto): Promise<Offer>;
    findAll(): Promise<Offer[]>;
    findActive(): Promise<Offer[]>;
    findOne(id: string): Promise<Offer>;
    update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
