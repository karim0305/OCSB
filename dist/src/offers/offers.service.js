"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const offer_entity_1 = require("./entities/offer.entity");
let OffersService = class OffersService {
    offerModel;
    constructor(offerModel) {
        this.offerModel = offerModel;
    }
    async create(createOfferDto) {
        const offer = new this.offerModel({
            ...createOfferDto,
            startDate: createOfferDto.startDate
                ? new Date(createOfferDto.startDate)
                : null,
            endDate: createOfferDto.endDate
                ? new Date(createOfferDto.endDate)
                : null,
        });
        return offer.save();
    }
    async findAll() {
        return this.offerModel
            .find()
            .sort({
            sortOrder: 1,
            createdAt: -1,
        })
            .exec();
    }
    async findActive() {
        const now = new Date();
        return this.offerModel
            .find({
            isActive: true,
            $and: [
                {
                    $or: [
                        { startDate: { $exists: false } },
                        { startDate: null },
                        { startDate: { $lte: now } },
                    ],
                },
                {
                    $or: [
                        { endDate: { $exists: false } },
                        { endDate: null },
                        { endDate: { $gte: now } },
                    ],
                },
            ],
        })
            .sort({
            sortOrder: 1,
            createdAt: -1,
        })
            .exec();
    }
    async findOne(id) {
        const offer = await this.offerModel
            .findById(id)
            .exec();
        if (!offer) {
            throw new common_1.NotFoundException(`Offer with ID "${id}" not found`);
        }
        return offer;
    }
    async update(id, updateOfferDto) {
        const updateData = {
            ...updateOfferDto,
        };
        if (updateOfferDto.startDate) {
            updateData.startDate = new Date(updateOfferDto.startDate);
        }
        if (updateOfferDto.endDate) {
            updateData.endDate = new Date(updateOfferDto.endDate);
        }
        const offer = await this.offerModel
            .findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
            .exec();
        if (!offer) {
            throw new common_1.NotFoundException(`Offer with ID "${id}" not found`);
        }
        return offer;
    }
    async remove(id) {
        const offer = await this.offerModel
            .findByIdAndDelete(id)
            .exec();
        if (!offer) {
            throw new common_1.NotFoundException(`Offer with ID "${id}" not found`);
        }
        return {
            message: `Offer "${id}" deleted successfully`,
        };
    }
};
exports.OffersService = OffersService;
exports.OffersService = OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(offer_entity_1.Offer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OffersService);
//# sourceMappingURL=offers.service.js.map