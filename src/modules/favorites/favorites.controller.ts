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

import { FavoritesService } from './favorites.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('favorites')
@UseGuards(RolesGuard)
export class FavoritesController {
    constructor(@Inject(FavoritesService) private readonly favoritesService) {
    }
    /* --------------------------------------------------------------------

    Module     : Favorites
    Controller : Favorite Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.favorite value.

    Middleware description:

    Route:
    /api/favorites
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/favorites
        Roles:        user, admin
        Description:  Get list of favorites
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const favorites = await this.favoritesService.list();
        return favorites;
    }

    /*
        Route:        Post api/favorites
        Roles:        user, admin
        Description:  Create a new Favorite
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const favorite = req.body;
        favorite.creator = req.user._id;
        await this.favoritesService.create(favorite);
        return favorite;
    }

    /*
        Route:        GET api/favorites/:favoriteId
        Roles:        favorite, admin
        Description:  Get favorite by provided Id.
    */

    @Get(':favoriteId')
    @Roles('user', 'admin')
    async getFavoriteById(@Req() req) {
        const favorite = req.favorite;
        return favorite;
    }

    /*
        Route:        PUT api/favorites/:favoriteId
        Roles:        favorite, admin
        Description:  Get favorite by provided Id.
    */

    @Put(':favoriteId')
    @Roles('user', 'admin')
    async updateFavoriteById(@Req() req) {
        const favorite = req.favorite;
        return await this.favoritesService.update(favorite, req.body);
    }

    /*
        Route:        DELETE api/favorites/:favoriteId
        Roles:        user, admin
        Description:  Delete favorite provide by id.
    */

    @Patch(':favoriteId')
    @Roles('user', 'admin')
    async patchFavoriteById(@Req() req) {
        const favorite = req.favorite;
        return await this.favoritesService.patch(favorite, req.body);
    }

    /*
        Route:        DELETE api/favorites/:favoriteId
        Roles:        user, admin
        Description:  Delete favorite provide by id.
    */

    @Delete(':favoriteId')
    @Roles('user', 'admin')
    async deleteFavorite(@Req() req) {
        const favorite = req.favorite;
        return await this.favoritesService.delete(favorite);
    }
}
