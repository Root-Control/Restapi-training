import {
    Controller,
    Post,
    Get,
    Put,
    Patch,
    Delete,
    Param,
    UseGuards,
    Inject,
    Req
} from '@nestjs/common';

import { DiscountsService } from './discounts.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('discounts')
@UseGuards(RolesGuard)
export class DiscountsController {
    constructor(@Inject(DiscountsService) private readonly discountsService) {
    }
    /* --------------------------------------------------------------------

    Module     : Discounts
    Controller : Discount Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.discount value.

    Middleware description:

    Route:
    /api/discounts
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/discounts
        Roles:        user, admin
        Description:  Get list of discounts
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const discounts = await this.discountsService.list();
        return discounts;
    }

    /*
        Route:        Post api/discounts
        Roles:        user, admin
        Description:  Create a new Discount
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const discount = req.body;
        discount.creator = req.user._id;
        await this.discountsService.create(discount);
        return discount;
    }

    /*
        Route:        GET api/discounts/:discountId
        Roles:        discount, admin
        Description:  Get discount by provided Id.
    */

    @Get(':discountId')
    @Roles('user', 'admin')
    async getDiscountById(@Req() req) {
        const discount = req.discount;
        return discount;
    }

    /*
        Route:        PUT api/discounts/:discountId
        Roles:        discount, admin
        Description:  Get discount by provided Id.
    */

    @Put(':discountId')
    @Roles('user', 'admin')
    async updateDiscountById(@Req() req) {
        const discount = req.discount;
        return await this.discountsService.update(discount, req.body);
    }

    /*
        Route:        DELETE api/discounts/:discountId
        Roles:        user, admin
        Description:  Delete discount provide by id.
    */

    @Patch(':discountId')
    @Roles('user', 'admin')
    async patchDiscountById(@Req() req) {
        const discount = req.discount;
        return await this.discountsService.patch(discount, req.body);
    }

    /*
        Route:        DELETE api/discounts/:discountId
        Roles:        user, admin
        Description:  Delete discount provide by id.
    */

    @Delete(':discountId')
    @Roles('user', 'admin')
    async deleteDiscount(@Req() req) {
        const discount = req.discount;
        return await this.discountsService.delete(discount);
    }
}
