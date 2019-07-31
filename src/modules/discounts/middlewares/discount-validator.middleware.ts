import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { discountSchema } from './../joi/discount.joi';

@Injectable()
/**
 *  Discount By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found discount in the variable req.discount
 */
export class DiscountValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Discount Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, discountSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
