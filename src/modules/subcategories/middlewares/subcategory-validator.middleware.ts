import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { subcategorySchema } from './../joi/subcategory.joi';

@Injectable()
/**
 *  Subcategory By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found subcategorie in the variable req.subcategorie
 */
export class SubcategoryValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Subcategory Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, subcategorySchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
