import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
  ) {}

  // CREATE
  @Post()
  @ApiOperation({
    summary: 'Create a new offer',
  })
  @ApiResponse({
    status: 201,
    description: 'Offer created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid offer data',
  })
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  // GET ALL
  @Get()
  @ApiOperation({
    summary: 'Get all offers',
  })
  @ApiResponse({
    status: 200,
    description: 'All offers returned successfully',
  })
  findAll() {
    return this.offersService.findAll();
  }

  // GET ACTIVE
  @Get('active')
  @ApiOperation({
    summary: 'Get currently active offers',
  })
  @ApiResponse({
    status: 200,
    description: 'Active offers returned successfully',
  })
  findActive() {
    return this.offersService.findActive();
  }

  // GET ONE
  @Get(':id')
  @ApiOperation({
    summary: 'Get an offer by ID',
  })
  @ApiParam({
    name: 'id',
    example: '66b123456789abcdef123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Offer found',
  })
  @ApiResponse({
    status: 404,
    description: 'Offer not found',
  })
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  @ApiOperation({
    summary: 'Update an offer',
  })
  @ApiParam({
    name: 'id',
    example: '66b123456789abcdef123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Offer updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Offer not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.update(
      id,
      updateOfferDto,
    );
  }

  // DELETE
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an offer',
  })
  @ApiParam({
    name: 'id',
    example: '66b123456789abcdef123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Offer deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Offer not found',
  })
  remove(@Param('id') id: string) {
    return this.offersService.remove(id);
  }
}