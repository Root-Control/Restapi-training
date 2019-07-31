import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { IUbigeo } from './../interfaces/ubigeo.interface';
import { UbigeoSchema } from './../schemas/ubigeo.schema';

import { MESSAGES, UBIGEO_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Ubigeo By Id Middleware
 *  We validating if the Id provided is valid, and returning the found ubigeo in the variable req.ubigeo
 */
export class UbigeoByIdMiddleware implements NestMiddleware {
  private ubigeoModel;
  constructor() {
       console.log('UbigeoByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.ubigeoModel = db.model(UBIGEO_MODEL_TOKEN, UbigeoSchema) as Model<IUbigeo>;

       if (!Types.ObjectId.isValid(request.params.ubigeoId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const ubigeo = await this.ubigeoModel.findById(request.params.ubigeoId);
       if (ubigeo) {
            request.ubigeo = ubigeo;
            next();
       } else {
            return next(new UnauthorizedException('No ubigeo with that identifier has been found'));
       }
  }
}
