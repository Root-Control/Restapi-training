import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { ISeller } from './../interfaces/seller.interface';
import { SellerSchema } from './../schemas/seller.schema';

import { MESSAGES, SELLER_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Seller By Id Middleware
 *  We validating if the Id provided is valid, and returning the found seller in the variable req.seller
 */
export class SellerByIdMiddleware implements NestMiddleware {
  private sellerModel;
  constructor() {
       console.log('SellerByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.sellerModel = db.model(SELLER_MODEL_TOKEN, SellerSchema) as Model<ISeller>;

       if (!Types.ObjectId.isValid(request.params.sellerId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const seller = await this.sellerModel.findById(request.params.sellerId);
       if (seller) {
            request.seller = seller;
            next();
       } else {
            return next(new UnauthorizedException('No seller with that identifier has been found'));
       }
  }
}
