import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Query
   } from '@nestjs/common';
   
   
   import {
    ApiTags,
    ApiOperation,
    ApiQuery
   } from '@nestjs/swagger';
   
   
   import { WishlistService } from './wishlist.service';
   
   
   import {
    CreateWishlistDto
   } from './dto/create-wishlist.dto';
   
   
   import {
    UpdateWishlistDto
   } from './dto/update-wishlist.dto';
   
   
   
   @ApiTags('Wishlist')
   @Controller('wishlist')
   export class WishlistController {
   
   
   constructor(
   private readonly wishlistService:WishlistService
   ){}
   
   
   
   
   @Post()
   @ApiOperation({
   summary:'Create Wishlist'
   })
   create(
   @Body() dto:CreateWishlistDto
   ){
   
   return this.wishlistService.create(dto);
   
   }
   
   
   
   
   
   @Get()
   @ApiOperation({
   summary:'Get All Wishlists (ya userId se filter karein)'
   })
   @ApiQuery({ name: 'userId', required: false })
   findAll(
   @Query('userId') userId?: string
   ){
   
   // 👇 FIX: pehle query param bilkul use nahi ho raha tha, isliye
   // har user ko SAARE wishlists mil rahe the (list ka pehla item random dikhta tha)
   return this.wishlistService.findAll(userId);
   
   }
   
   
   
   
   
   @Get(':id')
   @ApiOperation({
   summary:'Get Wishlist By Id'
   })
   findOne(
   @Param('id') id:string
   ){
   
   return this.wishlistService.findOne(id);
   
   }
   
   
   
   
   
   @Patch(':id')
   @ApiOperation({
   summary:'Update Wishlist'
   })
   update(
   @Param('id') id:string,
   @Body() dto:UpdateWishlistDto
   ){
   
   return this.wishlistService.update(id,dto);
   
   }
   
   
   
   
   
   @Delete(':id')
   @ApiOperation({
   summary:'Delete Wishlist'
   })
   remove(
   @Param('id') id:string
   ){
   
   return this.wishlistService.remove(id);
   
   }
   
   
   }