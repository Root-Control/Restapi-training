import {
    BadRequestException,
    NestMiddleware,
    Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { authLoginSchema } from '../joi/login-user.joi';

@Injectable()
/**
 *  LoginValidator Middleware
 *  We validating if the Id provided is valid, and returning the found article in the variable req.article
 */
export class LoginValidatorMiddleware implements NestMiddleware {
    constructor() {
        console.log('Initializing Login Validator Middleware');
    }
    async use(req, res, next: Function) {
        const result = validate(req.body, authLoginSchema);

        if (result.error) {
            const errorMessage = result.error.details.shift().message;
            const message: string = errorMessage.replace(/["]/g, '');

            return next(new BadRequestException(`Validation failed: ${message}`));
        }
        next();
    }
}
