import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Req,
    UseGuards,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './users.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { MulterConfig } from '../../config/multer';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly userService: UserService) { }
    /* --------------------------------------------------------------------
      Module     : Users
      Controller : User Controller
      ---------------------------------------------------------------------
      Description :

      Aditional information: All role routes are working with Guards, and Guards
      are defining the current req.user value.

      Middleware description:

      Route:
      /api/users
     ----------------------------------------------------------------------*/

    /*
      Route:        GET api/users/me
      Roles:        user, admin
      Description:  Get the current session user information based in authenticated token.
    */

    @Get('me')
    @Roles('user', 'admin')
    async me(@Req() req) {
        return await this.userService.me(req.user);
    }

    /*
      Route:        PUT api/users/upload
      Roles:        user, admin
      Description:  Get user by provided Id.
    */

    @Put('upload')
    @Roles('user', 'admin')
    @UseInterceptors(FileInterceptor('file', MulterConfig))
    async uploadFile(@UploadedFile() file, @Req() req) {
        const user = req.user;
        return await this.userService.updateProfileImage(user, file);
    }

    /*
      Route:        GET api/users/:id
      Roles:        user, admin
      Description:  Get user by provided Id.
    */

    @Get(':id')
    @Roles('user', 'admin')
    async getUserById(@Req() req) {
        const user = req.model;
        return user;
    }

    /*
      Route:        PUT api/users/:id
      Roles:        user, admin
      Description:  Get user by provided Id.
    */

    @Put(':id')
    @Roles('user', 'admin')
    async updateUserById(@Req() req) {
        const user = await this.userService.updateUser(req.model, req.body);
        return user;
    }

    /*
      Route:        GET api/users
      Roles:        user, admin, superadmin
      Description:  Get all users in database.
    */
    @Get()
    @Roles('user', 'admin', 'superadmin')
    async getUsers(@Req() req) {
        const query = req.query;
        return await this.userService.getUsers(query);
    }

    /*
      Route:        DELETE api/users
      Roles:        admin, superadmin
      Description:  Delete user provide by id.
    */

    @Delete(':id')
    @Roles('admin', 'superadmin')
    async deleteUser(@Req() req) {
        const user = req.model;
        return await this.userService.deleteUser(user);
    }
}
