import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { IFavorite } from './../interfaces/favorite.interface';
import { FavoriteSchema } from './../schemas/favorite.schema';

import { MESSAGES, FAVORITE_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Favorite By Id Middleware
 *  We validating if the Id provided is valid, and returning the found favorite in the variable req.favorite
 */
export class FavoriteByIdMiddleware implements NestMiddleware {
  private favoriteModel;
  constructor() {
       console.log('FavoriteByIdMiddleware');
  }
  async use(request, response, next: Function) {
       const db = request['dbConnection'];
       this.favoriteModel = db.model(FAVORITE_MODEL_TOKEN, FavoriteSchema) as Model<IFavorite>;

       if (!Types.ObjectId.isValid(request.params.favoriteId)) {
            return next(new UnauthorizedException('Invalid identifier'));
       }

       const favorite = await this.favoriteModel.findById(request.params.favoriteId);
       if (favorite) {
            request.favorite = favorite;
            next();
       } else {
            return next(new UnauthorizedException('No favorite with that identifier has been found'));
       }
  }
}
