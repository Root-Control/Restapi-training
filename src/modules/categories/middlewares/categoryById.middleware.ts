import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { ICategory } from './../interfaces/category.interface';
import { CategorySchema } from './../schemas/category.schema';

import { MESSAGES, CATEGORY_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Category By Id Middleware
 *  We validating if the Id provided is valid, and returning the found category in the variable req.category
 */
export class CategoryByIdMiddleware implements NestMiddleware {
  private categoryModel;

  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.categoryModel = db.model(CATEGORY_MODEL_TOKEN, CategorySchema) as Model<ICategory>;

       if (!Types.ObjectId.isValid(request.params.categoryId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const category = await this.categoryModel.findById(request.params.categoryId);
       if (category) {
            request.catyorie = category;
            next();
       } else {
            return next(new UnauthorizedException('No category with that identifier has been found'));
       }
  }
}
