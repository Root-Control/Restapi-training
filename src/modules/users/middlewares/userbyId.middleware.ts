import {
    BadRequestException,
    UnauthorizedException,
    NestMiddleware,
    Injectable,
    Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { IUser } from './../interfaces/user.interface';
import { UserSchema } from './../schemas/user.schema';

import { MESSAGES, USER_MODEL_TOKEN } from '../../../server.constants';

import { REQUEST } from '@nestjs/core';

@Injectable()
export class UserByIdMiddleware implements NestMiddleware {
    private userModel;
    constructor() {
        console.log('User by id middleware called');
    }
    async use(request, response, next: Function) {
        const db = request['dbConnection'];
        this.userModel = db.model(USER_MODEL_TOKEN, UserSchema) as Model<IUser>;
        const allowedRoutes = ['me', 'upload'];
        const isAllowedRoute = (allowedRoutes.indexOf(request.params.id) > -1);

        if (isAllowedRoute) {
            return next();
        } else if (!Types.ObjectId.isValid(request.params.id)) {
            return next(new UnauthorizedException('User is invalid'));
        }
        const user = await this.userModel.findById(request.params.id).select('-local.salt  -local.hashedPassword');
        if (user) {
            request.model = user;
            next();
        } else {
            return next(new UnauthorizedException('No user with that identifier has been found'));
        }
    }
}
