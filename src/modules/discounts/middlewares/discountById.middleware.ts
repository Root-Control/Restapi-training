import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { IDiscount } from './../interfaces/discount.interface';
import { DiscountSchema } from './../schemas/discount.schema';

import { MESSAGES, DISCOUNT_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Discount By Id Middleware
 *  We validating if the Id provided is valid, and returning the found discount in the variable req.discount
 */
export class DiscountByIdMiddleware implements NestMiddleware {
  private discountModel;
  constructor() {
       console.log('DiscountByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.discountModel = db.model(DISCOUNT_MODEL_TOKEN, DiscountSchema) as Model<IDiscount>;

       if (!Types.ObjectId.isValid(request.params.discountId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const discount = await this.discountModel.findById(request.params.discountId);
       if (discount) {
            request.discount = discount;
            next();
       } else {
            return next(new UnauthorizedException('No discount with that identifier has been found'));
       }
  }
}
