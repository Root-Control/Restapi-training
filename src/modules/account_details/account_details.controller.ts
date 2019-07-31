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

import { AccountDetailsService } from './account_details.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('account_details')
@UseGuards(RolesGuard)
export class AccountDetailsController {
    constructor(@Inject(AccountDetailsService) private readonly accountDetailsService) {
    }
    /* --------------------------------------------------------------------

    Module     : Account_details
    Controller : Account_detail Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.account_detail value.

    Middleware description:

    Route:
    /api/account_details
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/account_details
        Roles:        user, admin
        Description:  Get list of account_details
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const account_details = await this.accountDetailsService.list();
        return account_details;
    }

    /*
        Route:        Post api/account_details
        Roles:        user, admin
        Description:  Create a new Account_detail
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const account_detail = req.body;
        account_detail.creator = req.user._id;
        await this.accountDetailsService.create(account_detail);
        return account_detail;
    }

    /*
        Route:        GET api/account_details/:account_detailId
        Roles:        account_detail, admin
        Description:  Get account_detail by provided Id.
    */

    @Get(':account_detailId')
    @Roles('user', 'admin')
    async getAccountDetailById(@Req() req) {
        const account_detail = req.account_detail;
        return account_detail;
    }

    /*
        Route:        PUT api/account_details/:account_detailId
        Roles:        account_detail, admin
        Description:  Get account_detail by provided Id.
    */

    @Put(':account_detailId')
    @Roles('user', 'admin')
    async updateAccountDetailById(@Req() req) {
        const account_detail = req.account_detail;
        return await this.accountDetailsService.update(account_detail, req.body);
    }

    /*
        Route:        DELETE api/account_details/:account_detailId
        Roles:        user, admin
        Description:  Delete account_detail provide by id.
    */

    @Patch(':account_detailId')
    @Roles('user', 'admin')
    async patchAccountDetailById(@Req() req) {
        const account_detail = req.account_detail;
        return await this.accountDetailsService.patch(account_detail, req.body);
    }

    /*
        Route:        DELETE api/account_details/:account_detailId
        Roles:        user, admin
        Description:  Delete account_detail provide by id.
    */

    @Delete(':account_detailId')
    @Roles('user', 'admin')
    async deleteAccountDetail(@Req() req) {
        const account_detail = req.account_detail;
        return await this.accountDetailsService.delete(account_detail);
    }
}
