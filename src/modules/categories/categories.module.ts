import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { CategoriesController } from './categories.controller';
import { categoryProviders } from './categories.providers';
import { CategoriesService } from './categories.service';

import { CategoryByIdMiddleware } from './middlewares/categoryById.middleware';
//  Middlewares
import { CategoryValidatorMiddleware } from './middlewares/category-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [CategoriesController],
    providers: [
        ...categoryProviders,
        CategoriesService,
    ],
    exports: [
        ...categoryProviders
    ]
})
export class CategoriesModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CategoryValidatorMiddleware)
            .forRoutes({ path: 'category', method: RequestMethod.POST });

        consumer.apply(CategoryByIdMiddleware)
            .forRoutes({ path: 'category/:categoryId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
