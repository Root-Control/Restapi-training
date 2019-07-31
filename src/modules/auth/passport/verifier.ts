import { BadRequestException, NestMiddleware, UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces/user.interface';
import { UserSchema } from '../../users/schemas/user.schema';
import { MESSAGES, USER_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
export class Verifier implements NestMiddleware {
    constructor() {
        console.log('User Verification middleware');
    }
    async use(req: Request, res: Response, next: Function) {
        const db = req['dbConnection'];
        const userModel = db.model(USER_MODEL_TOKEN, UserSchema) as Model<IUser>;
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            next();
        } else {
            return next(new UnauthorizedException(MESSAGES.UNAUTHORIZED_EMAIL_OR_USERNAME_IN_USE));
        }
    }
}
