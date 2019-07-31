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

import { PluralTemplatesService } from './templates.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('templates')
@UseGuards(RolesGuard)
export class TemplatesController {
    constructor(@Inject(PluralTemplatesService) private readonly templatesService) {
    }
    /* --------------------------------------------------------------------

    Module     : Templates
    Controller : Template Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.template value.

    Middleware description:

    Route:
    /api/templates
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/templates
        Roles:        user, admin
        Description:  Get list of templates
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const templates = await this.templatesService.list();
        return templates;
    }

    /*
        Route:        Post api/templates
        Roles:        user, admin
        Description:  Create a new Template
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const template = req.body;
        template.creator = req.user._id;
        await this.templatesService.create(template);
        return template;
    }

    /*
        Route:        GET api/templates/:singularTemplateId
        Roles:        template, admin
        Description:  Get singularTemplate by provided Id.
    */

    @Get(':singularTemplateId')
    @Roles('user', 'admin')
    async getTemplateById(@Req() req) {
        const singularTemplate = req.singularTemplate;
        return singularTemplate;
    }

    /*
        Route:        PUT api/templates/:singularTemplateId
        Roles:        template, admin
        Description:  Get singularTemplate by provided Id.
    */

    @Put(':singularTemplateId')
    @Roles('user', 'admin')
    async updateTemplateById(@Req() req) {
        const singularTemplate = req.singularTemplate;
        return await this.templatesService.update(singularTemplate, req.body);
    }

    /*
        Route:        DELETE api/templates/:singularTemplateId
        Roles:        user, admin
        Description:  Delete singularTemplate provide by id.
    */

    @Patch(':singularTemplateId')
    @Roles('user', 'admin')
    async patchTemplateById(@Req() req) {
        const singularTemplate = req.singularTemplate;
        return await this.templatesService.patch(singularTemplate, req.body);
    }

    /*
        Route:        DELETE api/templates/:singularTemplateId
        Roles:        user, admin
        Description:  Delete singularTemplate provide by id.
    */

    @Delete(':singularTemplateId')
    @Roles('user', 'admin')
    async deleteTemplate(@Req() req) {
        const singularTemplate = req.singularTemplate;
        return await this.templatesService.delete(singularTemplate);
    }
}
