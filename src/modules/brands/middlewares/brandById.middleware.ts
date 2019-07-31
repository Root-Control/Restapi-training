import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { IBrand } from './../interfaces/brand.interface';
import { BrandSchema } from './../schemas/brand.schema';

import { MESSAGES, BRAND_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Brand By Id Middleware
 *  We validating if the Id provided is valid, and returning the found brand in the variable req.brand
 */
export class BrandByIdMiddleware implements NestMiddleware {
  private brandModel;
  constructor() {
       console.log('BrandByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.brandModel = db.model(BRAND_MODEL_TOKEN, BrandSchema) as Model<IBrand>;

       if (!Types.ObjectId.isValid(request.params.brandId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const brand = await this.brandModel.findById(request.params.brandId);
       if (brand) {
            request.brand = brand;
            next();
       } else {
            return next(new UnauthorizedException('No brand with that identifier has been found'));
       }
  }
}
