import {
    BadRequestException,
    NestMiddleware,
    Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { articleSchema } from './../joi/article.joi';

@Injectable()
/**
 *  Article By Id Middleware
 *  We validating if the Id provided is valid, and returning the found article in the variable req.article
 */
export class ArticleValidatorMiddleware implements NestMiddleware {
    constructor() {
        console.log('Article Validator is called');
    }
    async use(req, res, next: Function) {
        const result = validate(req.body, articleSchema);
        if (result.error) {
            const errorMessage = result.error.details.shift().message;
            const message: string = errorMessage.replace(/["]/g, '');

            return next(new BadRequestException(`Validation failed: ${message}`));
        }
        next();
    }
}
