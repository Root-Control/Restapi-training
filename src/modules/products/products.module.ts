import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { ProductsController } from './products.controller';
import { productProviders } from './products.providers';
import { ProductsService } from './products.service';

import { ProductByIdMiddleware } from './middlewares/productById.middleware';
//  Middlewares
import { ProductValidatorMiddleware } from './middlewares/product-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductsController],
    providers: [
        ...productProviders,
        ProductsService,
    ],
    exports: [
        ...productProviders
    ]
})
export class ProductsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ProductValidatorMiddleware)
            .forRoutes({ path: 'product', method: RequestMethod.POST });

        consumer.apply(ProductByIdMiddleware)
            .forRoutes({ path: 'product/:productId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
