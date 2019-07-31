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

import { SubcategoriesService } from './subcategories.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('subcategories')
@UseGuards(RolesGuard)
export class SubcategoriesController {
    constructor(@Inject(SubcategoriesService) private readonly subcategoriesService) {
    }
    /* --------------------------------------------------------------------

    Module     : Subcategories
    Controller : Subcategories Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.subcategorie value.

    Middleware description:

    Route:
    /api/subcategories
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/subcategories
        Roles:        user, admin
        Description:  Get list of subcategories
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const subcategories = await this.subcategoriesService.list();
        return subcategories;
    }

    /*
        Route:        Post api/subcategories
        Roles:        user, admin
        Description:  Create a new Subcategory
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const subcategory = req.body;
        subcategory.creator = req.user._id;
        await this.subcategoriesService.create(subcategory);
        return subcategory;
    }

    /*
        Route:        GET api/subcategories/:subcategoryId
        Roles:        subcategorie, admin
        Description:  Get subcategorie by provided Id.
    */

    @Get(':subcategoryId')
    @Roles('user', 'admin')
    async getSubcategoryById(@Req() req) {
        const subcategory = req.subcategory;
        return subcategory;
    }

    /*
        Route:        PUT api/subcategories/:subcategoryId
        Roles:        subcategorie, admin
        Description:  Get subcategorie by provided Id.
    */

    @Put(':subcategoryId')
    @Roles('user', 'admin')
    async updateSubcategoryById(@Req() req) {
        const subcategory = req.subcategory;
        return await this.subcategoriesService.update(subcategory, req.body);
    }

    /*
        Route:        DELETE api/subcategories/:subcategoryId
        Roles:        user, admin
        Description:  Delete subcategory provide by id.
    */

    @Patch(':subcategoryId')
    @Roles('user', 'admin')
    async patchSubcategoryById(@Req() req) {
        const subcategory = req.subcategory;
        return await this.subcategoriesService.patch(subcategory, req.body);
    }

    /*
        Route:        DELETE api/subcategories/:subcategoryId
        Roles:        user, admin
        Description:  Delete subcategory provide by id.
    */

    @Delete(':subcategoryId')
    @Roles('user', 'admin')
    async deleteSubcategory(@Req() req) {
        const subcategory = req.subcategory;
        return await this.subcategoriesService.delete(subcategory);
    }
}
