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

import { CouponsService } from './coupons.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('coupons')
@UseGuards(RolesGuard)
export class CouponsController {
    constructor(@Inject(CouponsService) private readonly couponsService) {
    }
    /* --------------------------------------------------------------------

    Module     : Coupons
    Controller : Coupon Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.coupon value.

    Middleware description:

    Route:
    /api/coupons
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/coupons
        Roles:        user, admin
        Description:  Get list of coupons
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const coupons = await this.couponsService.list();
        return coupons;
    }

    /*
        Route:        Post api/coupons
        Roles:        user, admin
        Description:  Create a new Coupon
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const coupon = req.body;
        coupon.creator = req.user._id;
        await this.couponsService.create(coupon);
        return coupon;
    }

    /*
        Route:        GET api/coupons/:couponId
        Roles:        coupon, admin
        Description:  Get coupon by provided Id.
    */

    @Get(':couponId')
    @Roles('user', 'admin')
    async getCouponById(@Req() req) {
        const coupon = req.coupon;
        return coupon;
    }

    /*
        Route:        PUT api/coupons/:couponId
        Roles:        coupon, admin
        Description:  Get coupon by provided Id.
    */

    @Put(':couponId')
    @Roles('user', 'admin')
    async updateCouponById(@Req() req) {
        const coupon = req.coupon;
        return await this.couponsService.update(coupon, req.body);
    }

    /*
        Route:        DELETE api/coupons/:couponId
        Roles:        user, admin
        Description:  Delete coupon provide by id.
    */

    @Patch(':couponId')
    @Roles('user', 'admin')
    async patchCouponById(@Req() req) {
        const coupon = req.coupon;
        return await this.couponsService.patch(coupon, req.body);
    }

    /*
        Route:        DELETE api/coupons/:couponId
        Roles:        user, admin
        Description:  Delete coupon provide by id.
    */

    @Delete(':couponId')
    @Roles('user', 'admin')
    async deleteCoupon(@Req() req) {
        const coupon = req.coupon;
        return await this.couponsService.delete(coupon);
    }
}
