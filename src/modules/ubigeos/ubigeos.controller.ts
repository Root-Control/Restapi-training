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

import { UbigeosService } from './ubigeos.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('ubigeos')
@UseGuards(RolesGuard)
export class UbigeosController {
    constructor(@Inject(UbigeosService) private readonly ubigeosService) {
    }
    /* --------------------------------------------------------------------

    Module     : Ubigeos
    Controller : Ubigeo Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.ubigeo value.

    Middleware description:

    Route:
    /api/ubigeos
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/ubigeos
        Roles:        user, admin
        Description:  Get list of ubigeos
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const ubigeos = await this.ubigeosService.list();
        return ubigeos;
    }

    /*
        Route:        Post api/ubigeos
        Roles:        user, admin
        Description:  Create a new Ubigeo
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const ubigeo = req.body;
        ubigeo.creator = req.user._id;
        await this.ubigeosService.create(ubigeo);
        return ubigeo;
    }

    /*
        Route:        GET api/ubigeos/:ubigeoId
        Roles:        ubigeo, admin
        Description:  Get ubigeo by provided Id.
    */

    @Get(':ubigeoId')
    @Roles('user', 'admin')
    async getUbigeoById(@Req() req) {
        const ubigeo = req.ubigeo;
        return ubigeo;
    }

    /*
        Route:        PUT api/ubigeos/:ubigeoId
        Roles:        ubigeo, admin
        Description:  Get ubigeo by provided Id.
    */

    @Put(':ubigeoId')
    @Roles('user', 'admin')
    async updateUbigeoById(@Req() req) {
        const ubigeo = req.ubigeo;
        return await this.ubigeosService.update(ubigeo, req.body);
    }

    /*
        Route:        DELETE api/ubigeos/:ubigeoId
        Roles:        user, admin
        Description:  Delete ubigeo provide by id.
    */

    @Patch(':ubigeoId')
    @Roles('user', 'admin')
    async patchUbigeoById(@Req() req) {
        const ubigeo = req.ubigeo;
        return await this.ubigeosService.patch(ubigeo, req.body);
    }

    /*
        Route:        DELETE api/ubigeos/:ubigeoId
        Roles:        user, admin
        Description:  Delete ubigeo provide by id.
    */

    @Delete(':ubigeoId')
    @Roles('user', 'admin')
    async deleteUbigeo(@Req() req) {
        const ubigeo = req.ubigeo;
        return await this.ubigeosService.delete(ubigeo);
    }
}
