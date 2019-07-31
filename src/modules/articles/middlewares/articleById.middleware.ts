import {
     UnauthorizedException,
     NestMiddleware,
     Injectable,
     Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types, Connection } from 'mongoose';
import { IArticle } from './../interfaces/article.interface';
import { ArticleSchema } from './../schemas/article.schema';

import { MESSAGES, ARTICLE_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Article By Id Middleware
 *  We validating if the Id provided is valid, and returning the found article in the variable req.article
 */
export class ArticleByIdMiddleware implements NestMiddleware {
     private articleModel;
     constructor() {
          console.log('ArticleByIdMiddleware');
     }
     async use(request, response, next: Function) {
          const db = request['dbConnection'];
          this.articleModel = db.model(ARTICLE_MODEL_TOKEN, ArticleSchema) as Model<IArticle>;

          if (!Types.ObjectId.isValid(request.params.articleId)) {
               return next(new UnauthorizedException('Invalid identifier'));
          }

          const article = await this.articleModel.findById(request.params.articleId);
          if (article) {
               request.article = article;
               next();
          } else {
               return next(new UnauthorizedException('No article with that identifier has been found'));
          }
     }
}
