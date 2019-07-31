import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { ICoupon } from './../interfaces/coupon.interface';
import { CouponSchema } from './../schemas/coupon.schema';

import { MESSAGES, COUPON_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Coupon By Id Middleware
 *  We validating if the Id provided is valid, and returning the found coupon in the variable req.coupon
 */
export class CouponByIdMiddleware implements NestMiddleware {
  private couponModel;
  constructor() {
       console.log('CouponByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.couponModel = db.model(COUPON_MODEL_TOKEN, CouponSchema) as Model<ICoupon>;

       if (!Types.ObjectId.isValid(request.params.couponId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const coupon = await this.couponModel.findById(request.params.couponId);
       if (coupon) {
            request.coupon = coupon;
            next();
       } else {
            return next(new UnauthorizedException('No coupon with that identifier has been found'));
       }
  }
}
