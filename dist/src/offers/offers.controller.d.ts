import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(createOfferDto: CreateOfferDto): Promise<import("./entities/offer.entity").Offer>;
    findAll(): Promise<import("./entities/offer.entity").Offer[]>;
    findActive(): Promise<import("./entities/offer.entity").Offer[]>;
    findOne(id: string): Promise<import("./entities/offer.entity").Offer>;
    update(id: string, updateOfferDto: UpdateOfferDto): Promise<import("./entities/offer.entity").Offer>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
