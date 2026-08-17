import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

import {
  Offer,
  OfferDocument,
} from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<OfferDocument>,
  ) {}

  // CREATE
  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
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

  // GET ALL
  async findAll(): Promise<Offer[]> {
    return this.offerModel
      .find()
      .sort({
        sortOrder: 1,
        createdAt: -1,
      })
      .exec();
  }

  // GET ACTIVE
  async findActive(): Promise<Offer[]> {
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

  // GET ONE
  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel
      .findById(id)
      .exec();

    if (!offer) {
      throw new NotFoundException(
        `Offer with ID "${id}" not found`,
      );
    }

    return offer;
  }

  // UPDATE
  async update(
    id: string,
    updateOfferDto: UpdateOfferDto,
  ): Promise<Offer> {
    const updateData: any = {
      ...updateOfferDto,
    };

    if (updateOfferDto.startDate) {
      updateData.startDate = new Date(
        updateOfferDto.startDate,
      );
    }

    if (updateOfferDto.endDate) {
      updateData.endDate = new Date(
        updateOfferDto.endDate,
      );
    }

    const offer = await this.offerModel
      .findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    if (!offer) {
      throw new NotFoundException(
        `Offer with ID "${id}" not found`,
      );
    }

    return offer;
  }

  // DELETE
  async remove(
    id: string,
  ): Promise<{ message: string }> {
    const offer = await this.offerModel
      .findByIdAndDelete(id)
      .exec();

    if (!offer) {
      throw new NotFoundException(
        `Offer with ID "${id}" not found`,
      );
    }

    return {
      message: `Offer "${id}" deleted successfully`,
    };
  }
}