import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { couponSchema } from './../joi/coupon.joi';

@Injectable()
/**
 *  Coupon By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found coupon in the variable req.coupon
 */
export class CouponValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Coupon Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, couponSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
