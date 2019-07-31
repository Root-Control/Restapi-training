import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { categorySchema } from './../joi/category.joi';

@Injectable()
/**
 *  Category By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found categorie in the variable req.categorie
 */
export class CategoryValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Category Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, categorySchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
