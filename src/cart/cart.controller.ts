import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CartService } from './cart.service';

import { CreateCartDto } from './dto/create-cart.dto';

import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Cart',
  })
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get All Carts',
  })
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Cart By Id',
  })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.cartService.findByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Cart',
  })
  update(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Cart',
  })
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
