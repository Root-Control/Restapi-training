import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { ubigeoSchema } from './../joi/ubigeo.joi';

@Injectable()
/**
 *  Ubigeo By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found ubigeo in the variable req.ubigeo
 */
export class UbigeoValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Ubigeo Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, ubigeoSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
