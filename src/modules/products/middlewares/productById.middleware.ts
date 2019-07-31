import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { IProduct } from './../interfaces/product.interface';
import { ProductSchema } from './../schemas/product.schema';

import { MESSAGES, PRODUCT_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Product By Id Middleware
 *  We validating if the Id provided is valid, and returning the found product in the variable req.product
 */
export class ProductByIdMiddleware implements NestMiddleware {
  private productModel;
  constructor() {
       console.log('ProductByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.productModel = db.model(PRODUCT_MODEL_TOKEN, ProductSchema) as Model<IProduct>;

       if (!Types.ObjectId.isValid(request.params.productId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const product = await this.productModel.findById(request.params.productId);
       if (product) {
            request.product = product;
            next();
       } else {
            return next(new UnauthorizedException('No product with that identifier has been found'));
       }
  }
}
