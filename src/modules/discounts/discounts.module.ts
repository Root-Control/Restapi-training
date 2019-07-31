import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { DiscountsController } from './discounts.controller';
import { discountProviders } from './discounts.providers';
import { DiscountsService } from './discounts.service';

import { DiscountByIdMiddleware } from './middlewares/discountById.middleware';
//  Middlewares
import { DiscountValidatorMiddleware } from './middlewares/discount-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [DiscountsController],
    providers: [
        ...discountProviders,
        DiscountsService,
    ],
    exports: [
        ...discountProviders
    ]
})
export class DiscountsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(DiscountValidatorMiddleware)
            .forRoutes({ path: 'discount', method: RequestMethod.POST });

        consumer.apply(DiscountByIdMiddleware)
            .forRoutes({ path: 'discount/:discountId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
