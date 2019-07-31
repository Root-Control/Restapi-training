import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';

import * as chalk from 'chalk';
import { Model, Connection } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { USER_MODEL_TOKEN, SERVER_CONFIG, DB_CONNECTION_TOKEN } from '../../server.constants';
import { IUser } from '../../modules/users/interfaces/user.interface';
import { UserSchema } from '../../modules/users/schemas/user.schema';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    private userModel;
    constructor() {
        console.log('Token middleware called');
    }
    async use(req: Request, res: Response, next: Function) {
        const db = req['dbConnection'];
        this.userModel = db.model(USER_MODEL_TOKEN, UserSchema) as Model<IUser>;
        req.user = {};
        let parsedToken = {};
        const token: any = req.headers.authorization || req.headers.Authorization;

        if (token) {
            try {
                parsedToken = verify(token, SERVER_CONFIG.jwtSecret);
                const user = await this.userModel.findById(parsedToken['_id']).select('-salt -password');
                req.user = user;
            } catch (ex) {
                return res.status(500).send(ex);
            }
        }
        next();
    }
}
