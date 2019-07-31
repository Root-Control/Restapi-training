import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { IAccountDetail } from './../interfaces/account_detail.interface';
import { AccountDetailSchema } from './../schemas/account_detail.schema';

import { MESSAGES, ACCOUNT_DETAIL_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Account_detail By Id Middleware
 *  We validating if the Id provided is valid, and returning the found account_detail in the variable req.account_detail
 */
export class AccountDetailByIdMiddleware implements NestMiddleware {
  private accountDetailModel;
  constructor() {
       console.log('Account_detailByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.accountDetailModel = db.model(ACCOUNT_DETAIL_MODEL_TOKEN, AccountDetailSchema) as Model<IAccountDetail>;

       if (!Types.ObjectId.isValid(request.params.account_detailId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const account_detail = await this.accountDetailModel.findById(request.params.account_detailId);
       if (account_detail) {
            request.account_detail = account_detail;
            next();
       } else {
            return next(new UnauthorizedException('No account_detail with that identifier has been found'));
       }
  }
}
