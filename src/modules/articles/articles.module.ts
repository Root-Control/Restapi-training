import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { ArticlesController } from './articles.controller';
import { articleProviders } from './articles.providers';
import { ArticlesService } from './articles.service';

import { ArticleByIdMiddleware } from './middlewares/articleById.middleware';
//  Middlewares
import { ArticleValidatorMiddleware } from '../articles/middlewares/article-validator.middleware';

import { AppGateway } from '../../app.gateway';

@Module({
    imports: [DatabaseModule],
    controllers: [ArticlesController],
    providers: [
        ...articleProviders,
        ArticlesService,
        AppGateway
    ],
    exports: [
        ...articleProviders
    ]
})
export class ArticlesModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ArticleValidatorMiddleware)
            .forRoutes({ path: 'articles', method: RequestMethod.POST });

        consumer.apply(ArticleByIdMiddleware)
            .forRoutes({ path: 'articles/:articleId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
