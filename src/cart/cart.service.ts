import {
 Injectable,
 NotFoundException,
 ConflictException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
 Cart,
 CartDocument
} from './schema/cart.schema';

import {
 CreateCartDto
} from './dto/create-cart.dto';

import {
 UpdateCartDto
} from './dto/update-cart.dto';



@Injectable()
export class CartService {


constructor(
 @InjectModel(Cart.name)
 private cartModel: Model<CartDocument>,
){}



async create(dto:CreateCartDto){


const existingCart =
await this.cartModel.findOne({
 userId:dto.userId
});


if(existingCart){

 throw new ConflictException(
  'User cart already exists'
 );

}


const cart =
await this.cartModel.create(dto);


return {

 success:true,

 message:'Cart created successfully',

 data:cart

};

}




async findAll(){


const carts =
await this.cartModel.find()
.populate('userId')
.populate('items.productId');


return {

 success:true,

 message:'Carts fetched successfully',

 data:carts

};

}





async findOne(id:string){


const cart =
await this.cartModel.findById(id)
.populate('items.productId');


if(!cart){

 throw new NotFoundException(
  'Cart not found'
 );

}


return {

 success:true,

 message:'Cart fetched successfully',

 data:cart

};

}





async update(
id:string,
dto:UpdateCartDto
){


const cart =
await this.cartModel.findByIdAndUpdate(
 id,
 dto,
 {
  new:true,
  runValidators:true
 }
);



if(!cart){

 throw new NotFoundException(
  'Cart not found'
 );

}



return {

 success:true,

 message:'Cart updated successfully',

 data:cart

};

}





async remove(id:string){


const cart =
await this.cartModel.findByIdAndDelete(id);



if(!cart){

 throw new NotFoundException(
  'Cart not found'
 );

}



return {

 success:true,

 message:'Cart deleted successfully'

};


}



}
