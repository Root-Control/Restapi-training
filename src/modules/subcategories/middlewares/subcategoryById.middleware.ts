import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { ISubcategory } from './../interfaces/subcategory.interface';
import { SubcategorySchema } from './../schemas/subcategory.schema';

import { MESSAGES, SUBCATEGORY_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Subcategory By Id Middleware
 *  We validating if the Id provided is valid, and returning the found subcategorie in the variable req.subcategorie
 */
export class SubcategoryByIdMiddleware implements NestMiddleware {
  private subcategoryModel;
  constructor() {
       console.log('SubcategoryByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.subcategoryModel = db.model(SUBCATEGORY_MODEL_TOKEN, SubcategorySchema) as Model<ISubcategory>;

       if (!Types.ObjectId.isValid(request.params.subcategoryId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const subcategory = await this.subcategoryModel.findById(request.params.subcategoryId);
       if (subcategory) {
            request.subcategory = subcategory;
            next();
       } else {
            return next(new UnauthorizedException('No subcategory with that identifier has been found'));
       }
  }
}
