import {
  BadRequestException,
  NestMiddleware,
  Injectable
} from '@nestjs/common';
import { validate } from 'joi';
import { singularTemplateSchema } from './../joi/singularTemplate.joi';

@Injectable()
/**
 *  Template By Id Middleware edited
 *  We validating if the Id provided is valid, and returning the found template in the variable req.template
 */
export class TemplateValidatorMiddleware implements NestMiddleware {
  constructor() {
      console.log('Template Validator is called');
  }
  async use(req, res, next: Function) {
      const result = validate(req.body, singularTemplateSchema);
      if (result.error) {
          const errorMessage = result.error.details.shift().message;
          const message: string = errorMessage.replace(/["]/g, '');

          return next(new BadRequestException(`Validation failed: ${message}`));
      }
      next();
  }
}
