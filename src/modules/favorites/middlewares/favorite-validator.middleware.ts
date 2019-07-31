import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { favoriteSchema } from './../joi/favorite.joi';

@Injectable()
/**
 *  Favorite By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found favorite in the variable req.favorite
 */
export class FavoriteValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Favorite Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, favoriteSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
