import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { brandSchema } from './../joi/brand.joi';

@Injectable()
/**
 *  Brand By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found brand in the variable req.brand
 */
export class BrandValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Brand Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, brandSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
