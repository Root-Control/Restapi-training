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

import { SellersService } from './sellers.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('sellers')
@UseGuards(RolesGuard)
export class SellersController {
    constructor(@Inject(SellersService) private readonly sellersService) {
    }
    /* --------------------------------------------------------------------

    Module     : Sellers
    Controller : Seller Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.seller value.

    Middleware description:

    Route:
    /api/sellers
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/sellers
        Roles:        user, admin
        Description:  Get list of sellers
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const sellers = await this.sellersService.list();
        return sellers;
    }

    /*
        Route:        Post api/sellers
        Roles:        user, admin
        Description:  Create a new Seller
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const seller = req.body;
        seller.creator = req.user._id;
        await this.sellersService.create(seller);
        return seller;
    }

    /*
        Route:        GET api/sellers/:sellerId
        Roles:        seller, admin
        Description:  Get seller by provided Id.
    */

    @Get(':sellerId')
    @Roles('user', 'admin')
    async getSellerById(@Req() req) {
        const seller = req.seller;
        return seller;
    }

    /*
        Route:        PUT api/sellers/:sellerId
        Roles:        seller, admin
        Description:  Get seller by provided Id.
    */

    @Put(':sellerId')
    @Roles('user', 'admin')
    async updateSellerById(@Req() req) {
        const seller = req.seller;
        return await this.sellersService.update(seller, req.body);
    }

    /*
        Route:        DELETE api/sellers/:sellerId
        Roles:        user, admin
        Description:  Delete seller provide by id.
    */

    @Patch(':sellerId')
    @Roles('user', 'admin')
    async patchSellerById(@Req() req) {
        const seller = req.seller;
        return await this.sellersService.patch(seller, req.body);
    }

    /*
        Route:        DELETE api/sellers/:sellerId
        Roles:        user, admin
        Description:  Delete seller provide by id.
    */

    @Delete(':sellerId')
    @Roles('user', 'admin')
    async deleteSeller(@Req() req) {
        const seller = req.seller;
        return await this.sellersService.delete(seller);
    }
}
