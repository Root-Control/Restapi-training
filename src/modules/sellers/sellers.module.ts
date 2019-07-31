import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { SellersController } from './sellers.controller';
import { sellerProviders } from './sellers.providers';
import { SellersService } from './sellers.service';

import { SellerByIdMiddleware } from './middlewares/sellerById.middleware';
//  Middlewares
import { SellerValidatorMiddleware } from './middlewares/seller-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [SellersController],
    providers: [
        ...sellerProviders,
        SellersService,
    ],
    exports: [
        ...sellerProviders
    ]
})
export class SellersModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SellerValidatorMiddleware)
            .forRoutes({ path: 'seller', method: RequestMethod.POST });

        consumer.apply(SellerByIdMiddleware)
            .forRoutes({ path: 'seller/:sellerId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
