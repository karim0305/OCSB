import {
 Injectable,
 NotFoundException,
 ConflictException
} from '@nestjs/common';


import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import {
 Wishlist,
 WishlistDocument
} from './schema/wishlist.schema';


import {
 CreateWishlistDto
} from './dto/create-wishlist.dto';


import {
 UpdateWishlistDto
} from './dto/update-wishlist.dto';



@Injectable()
export class WishlistService {


constructor(
 @InjectModel(Wishlist.name)
 private wishlistModel:Model<WishlistDocument>
){}



async create(dto:CreateWishlistDto){


const exists =
await this.wishlistModel.findOne({
 userId:dto.userId
});


if(exists){

 throw new ConflictException(
  'Wishlist already exists for this user'
 );

}



const wishlist =
await this.wishlistModel.create(dto);



return {

 success:true,

 message:'Wishlist created successfully',

 data:wishlist

};


}





async findAll(){


const wishlists =
await this.wishlistModel
.find()
.populate('userId')
.populate('products');



return {

 success:true,

 message:'Wishlists fetched successfully',

 data:wishlists

};

}





async findOne(id:string){


const wishlist =
await this.wishlistModel
.findById(id)
.populate('products');



if(!wishlist){

 throw new NotFoundException(
  'Wishlist not found'
 );

}



return {

 success:true,

 message:'Wishlist fetched successfully',

 data:wishlist

};

}





async update(
id:string,
dto:UpdateWishlistDto
){


const wishlist =
await this.wishlistModel.findByIdAndUpdate(
 id,
 dto,
 {
  new:true,
  runValidators:true
 }
);



if(!wishlist){

 throw new NotFoundException(
  'Wishlist not found'
 );

}



return {

 success:true,

 message:'Wishlist updated successfully',

 data:wishlist

};

}





async remove(id:string){


const wishlist =
await this.wishlistModel.findByIdAndDelete(id);



if(!wishlist){

 throw new NotFoundException(
  'Wishlist not found'
 );

}



return {

 success:true,

 message:'Wishlist deleted successfully'

};


}


}
