import {
 Controller,
 Get,
 Post,
 Body,
 Param,
 Patch,
 Delete
} from '@nestjs/common';


import {
 ApiTags,
 ApiOperation
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
summary:'Get All Wishlists'
})
findAll(){

return this.wishlistService.findAll();

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
