import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { CouponsController } from './coupons.controller';
import { couponProviders } from './coupons.providers';
import { CouponsService } from './coupons.service';

import { CouponByIdMiddleware } from './middlewares/couponById.middleware';
//  Middlewares
import { CouponValidatorMiddleware } from './middlewares/coupon-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [CouponsController],
    providers: [
        ...couponProviders,
        CouponsService,
    ],
    exports: [
        ...couponProviders
    ]
})
export class CouponsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CouponValidatorMiddleware)
            .forRoutes({ path: 'coupon', method: RequestMethod.POST });

        consumer.apply(CouponByIdMiddleware)
            .forRoutes({ path: 'coupon/:couponId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
