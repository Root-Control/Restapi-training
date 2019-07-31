import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { FavoritesController } from './favorites.controller';
import { favoriteProviders } from './favorites.providers';
import { FavoritesService } from './favorites.service';

import { FavoriteByIdMiddleware } from './middlewares/favoriteById.middleware';
//  Middlewares
import { FavoriteValidatorMiddleware } from './middlewares/favorite-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [FavoritesController],
    providers: [
        ...favoriteProviders,
        FavoritesService,
    ],
    exports: [
        ...favoriteProviders
    ]
})
export class FavoritesModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(FavoriteValidatorMiddleware)
            .forRoutes({ path: 'favorite', method: RequestMethod.POST });

        consumer.apply(FavoriteByIdMiddleware)
            .forRoutes({ path: 'favorite/:favoriteId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
