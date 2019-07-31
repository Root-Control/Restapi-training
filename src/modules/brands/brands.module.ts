import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { BrandsController } from './brands.controller';
import { brandProviders } from './brands.providers';
import { BrandsService } from './brands.service';

import { BrandByIdMiddleware } from './middlewares/brandById.middleware';
//  Middlewares
import { BrandValidatorMiddleware } from './middlewares/brand-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [BrandsController],
    providers: [
        ...brandProviders,
        BrandsService,
    ],
    exports: [
        ...brandProviders
    ]
})
export class BrandsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BrandValidatorMiddleware)
            .forRoutes({ path: 'brand', method: RequestMethod.POST });

        consumer.apply(BrandByIdMiddleware)
            .forRoutes({ path: 'brand/:brandId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
