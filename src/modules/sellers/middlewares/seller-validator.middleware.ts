import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { sellerSchema } from './../joi/seller.joi';

@Injectable()
/**
 *  Seller By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found seller in the variable req.seller
 */
export class SellerValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Seller Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, sellerSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
