import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { ITemplate } from './../interfaces/singularTemplate.interface';
import { TemplateSchema } from './../schemas/singularTemplate.schema';

import { MESSAGES, TEMPLATE_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Template By Id Middleware
 *  We validating if the Id provided is valid, and returning the found template in the variable req.template
 */
export class TemplateByIdMiddleware implements NestMiddleware {
  private templateModel;
  constructor() {
       console.log('TemplateByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.templateModel = db.model(TEMPLATE_MODEL_TOKEN, TemplateSchema) as Model<ITemplate>;

       if (!Types.ObjectId.isValid(request.params.templateId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const template = await this.templateModel.findById(request.params.templateId);
       if (template) {
            request.template = template;
            next();
       } else {
            return next(new UnauthorizedException('No template with that identifier has been found'));
       }
  }
}
