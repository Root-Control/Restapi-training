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

import { BrandsService } from './brands.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('brands')
@UseGuards(RolesGuard)
export class BrandsController {
    constructor(@Inject(BrandsService) private readonly brandsService) {
    }
    /* --------------------------------------------------------------------

    Module     : Brands
    Controller : Brand Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.brand value.

    Middleware description:

    Route:
    /api/brands
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/brands
        Roles:        user, admin
        Description:  Get list of brands
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const brands = await this.brandsService.list();
        return brands;
    }

    /*
        Route:        Post api/brands
        Roles:        user, admin
        Description:  Create a new Brand
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const brand = req.body;
        brand.creator = req.user._id;
        await this.brandsService.create(brand);
        return brand;
    }

    /*
        Route:        GET api/brands/:brandId
        Roles:        brand, admin
        Description:  Get brand by provided Id.
    */

    @Get(':brandId')
    @Roles('user', 'admin')
    async getBrandById(@Req() req) {
        const brand = req.brand;
        return brand;
    }

    /*
        Route:        PUT api/brands/:brandId
        Roles:        brand, admin
        Description:  Get brand by provided Id.
    */

    @Put(':brandId')
    @Roles('user', 'admin')
    async updateBrandById(@Req() req) {
        const brand = req.brand;
        return await this.brandsService.update(brand, req.body);
    }

    /*
        Route:        DELETE api/brands/:brandId
        Roles:        user, admin
        Description:  Delete brand provide by id.
    */

    @Patch(':brandId')
    @Roles('user', 'admin')
    async patchBrandById(@Req() req) {
        const brand = req.brand;
        return await this.brandsService.patch(brand, req.body);
    }

    /*
        Route:        DELETE api/brands/:brandId
        Roles:        user, admin
        Description:  Delete brand provide by id.
    */

    @Delete(':brandId')
    @Roles('user', 'admin')
    async deleteBrand(@Req() req) {
        const brand = req.brand;
        return await this.brandsService.delete(brand);
    }
}
