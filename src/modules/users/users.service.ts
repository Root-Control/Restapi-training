import { Injectable, Inject } from '@nestjs/common';
import { Model, Connection } from 'mongoose';

import { USER_MODEL_TOKEN, SERVER_CONFIG } from '../../server.constants';
import { IUser } from './interfaces/user.interface';
import { UserSchema } from './schemas/user.schema';

import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UserService {
    private userModel;
    private params;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        const db = request['dbConnection'];
        this.userModel = db.model(USER_MODEL_TOKEN, UserSchema) as Model<IUser>;
    }

    async me(userModel: IUser) {
        return userModel;
    }

    async getUsers(query?): Promise<IUser[]> {
        return await this.userModel.find(query).select('-salt  -password');
    }

    async updateProfileImage(user, file): Promise<IUser> {
        user.profileImageURL = file.location || `/${parseImageURL(file.path)}`;
        return await user.save();
    }

    async getUserById(userId): Promise<IUser> {
        return await this.userModel.findById(userId).select('-salt -password');
    }

    async deleteUser(user) {
        return await user.remove();
    }

    async updateUser(user, body) {
        const google = user.google.id;
        const local = user.local.email;
        const twitter = user.twitter.id;
        const facebook = user.facebook.id;

        if (google) {
            //  Do stuff updating google
        } else if (twitter) {
            //  Do stuff updating twitter
        } else if (facebook) {
            //  Do stuff updating facebook
        } else {
            //  Do stuff updating local
        }
        return user;
    }
}
