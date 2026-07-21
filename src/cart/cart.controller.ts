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


import { CartService } from './cart.service';

import {
 CreateCartDto
} from './dto/create-cart.dto';

import {
 UpdateCartDto
} from './dto/update-cart.dto';



@ApiTags('Cart')
@Controller('cart')
export class CartController {


constructor(
private readonly cartService:CartService
){}



@Post()
@ApiOperation({
summary:'Create Cart'
})
create(
@Body() dto:CreateCartDto
){

return this.cartService.create(dto);

}




@Get()
@ApiOperation({
summary:'Get All Carts'
})
findAll(){

return this.cartService.findAll();

}





@Get(':id')
@ApiOperation({
summary:'Get Cart By Id'
})
findOne(
@Param('id') id:string
){

return this.cartService.findOne(id);

}





@Patch(':id')
@ApiOperation({
summary:'Update Cart'
})
update(
@Param('id') id:string,
@Body() dto:UpdateCartDto
){

return this.cartService.update(id,dto);

}





@Delete(':id')
@ApiOperation({
summary:'Delete Cart'
})
remove(
@Param('id') id:string
){

return this.cartService.remove(id);

}


}
