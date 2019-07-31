import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { SubcategoriesController } from './subcategories.controller';
import { subcategoryProviders } from './subcategories.providers';
import { SubcategoriesService } from './subcategories.service';

import { SubcategoryByIdMiddleware } from './middlewares/subcategoryById.middleware';
//  Middlewares
import { SubcategoryValidatorMiddleware } from './middlewares/subcategory-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [SubcategoriesController],
    providers: [
        ...subcategoryProviders,
        SubcategoriesService
    ],
    exports: [
        ...subcategoryProviders
    ]
})
export class SubcategoriesModule implements NestModule {
    constructor() {
        console.log('Subcategorys module loaded');
    }
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SubcategoryValidatorMiddleware)
            .forRoutes({ path: 'subcategory', method: RequestMethod.POST });

        consumer.apply(SubcategoryByIdMiddleware)
            .forRoutes({ path: 'subcategory/:subcategoryId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
