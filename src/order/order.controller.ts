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


import { OrderService } from './order.service';


import {
 CreateOrderDto
} from './dto/create-order.dto';


import {
 UpdateOrderDto
} from './dto/update-order.dto';



@ApiTags('Orders')
@Controller('orders')
export class OrderController {


constructor(
private readonly orderService:OrderService
){}



@Post()
@ApiOperation({
summary:'Create Order'
})
create(
@Body() dto:CreateOrderDto
){

return this.orderService.create(dto);

}




@Get()
@ApiOperation({
summary:'Get All Orders'
})
findAll(){

return this.orderService.findAll();

}





@Get(':id')
@ApiOperation({
summary:'Get Order By Id'
})
findOne(
@Param('id') id:string
){

return this.orderService.findOne(id);

}





@Patch(':id')
@ApiOperation({
summary:'Update Order'
})
update(
@Param('id') id:string,
@Body() dto:UpdateOrderDto
){

return this.orderService.update(id,dto);

}





@Delete(':id')
@ApiOperation({
summary:'Delete Order'
})
remove(
@Param('id') id:string
){

return this.orderService.remove(id);

}


}
