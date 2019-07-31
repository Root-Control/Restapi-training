import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { accountDetailSchema } from './../joi/account_detail.joi';

@Injectable()
/**
 *  Account_detail By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found account_detail in the variable req.account_detail
 */
export class AccountDetailValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Account_detail Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, accountDetailSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
