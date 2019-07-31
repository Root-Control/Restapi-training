import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { AccountDetailsController } from './account_details.controller';
import { accountDetailProviders } from './account_details.providers';
import { AccountDetailsService } from './account_details.service';

import { AccountDetailByIdMiddleware } from './middlewares/account_detailById.middleware';
//  Middlewares
import { AccountDetailValidatorMiddleware } from './middlewares/account_detail-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [AccountDetailsController],
    providers: [
        ...accountDetailProviders,
        AccountDetailsService
    ],
    exports: [
        ...accountDetailProviders
    ]
})
export class AccountDetailsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AccountDetailValidatorMiddleware)
            .forRoutes({ path: 'account_detail', method: RequestMethod.POST });

        consumer.apply(AccountDetailByIdMiddleware)
            .forRoutes({ path: 'account_detail/:account_detailId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
