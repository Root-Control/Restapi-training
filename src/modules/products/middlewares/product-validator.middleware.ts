import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { productSchema } from './../joi/product.joi';

@Injectable()
/**
 *  Product By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found product in the variable req.product
 */
export class ProductValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Product Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, productSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
