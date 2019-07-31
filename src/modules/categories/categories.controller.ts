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

import { CategoriesService } from './categories.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('categories')
@UseGuards(RolesGuard)
export class CategoriesController {
    constructor(@Inject(CategoriesService) private readonly categoriesService) {
    }
    /* --------------------------------------------------------------------

    Module     : Categorys
    Controller : Category Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.categorie value.

    Middleware description:

    Route:
    /api/categories
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/categories
        Roles:        user, admin
        Description:  Get list of categories
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const categories = await this.categoriesService.list();
        return categories;
    }

    /*
        Route:        Post api/categories
        Roles:        user, admin
        Description:  Create a new Category
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const category = req.body;
        category.creator = req.user._id;
        await this.categoriesService.create(category);
        return category;
    }

    /*
        Route:        GET api/categories/:categoryId
        Roles:        categorie, admin
        Description:  Get category by provided Id.
    */

    @Get(':categoryId')
    @Roles('user', 'admin')
    async getCategoryById(@Req() req) {
        const category = req.category;
        return category;
    }

    /*
        Route:        PUT api/categories/:categoryId
        Roles:        categorie, admin
        Description:  Get category by provided Id.
    */

    @Put(':categoryId')
    @Roles('user', 'admin')
    async updateCategoryById(@Req() req) {
        const category = req.category;
        return await this.categoriesService.update(category, req.body);
    }

    /*
        Route:        Patch api/categories/:categoryId
        Roles:        user, admin
        Description:  Patch category provide by id.
    */

    @Patch(':categoryId')
    @Roles('user', 'admin')
    async patchCategoryById(@Req() req) {
        const category = req.category;
        return await this.categoriesService.patch(category, req.body);
    }

    /*
        Route:        DELETE api/categories/:categoryId
        Roles:        user, admin
        Description:  Delete category provide by id.
    */

    @Delete(':categoryId')
    @Roles('user', 'admin')
    async deleteCategory(@Req() req) {
        const category = req.category;
        return await this.categoriesService.delete(category);
    }
}
