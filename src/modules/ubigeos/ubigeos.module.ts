import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { UbigeosController } from './ubigeos.controller';
import { ubigeoProviders } from './ubigeos.providers';
import { UbigeosService } from './ubigeos.service';

import { UbigeoByIdMiddleware } from './middlewares/ubigeoById.middleware';
//  Middlewares
import { UbigeoValidatorMiddleware } from './middlewares/ubigeo-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [UbigeosController],
    providers: [
        ...ubigeoProviders,
        UbigeosService
    ],
    exports: [
        ...ubigeoProviders
    ]
})
export class UbigeosModule implements NestModule {
    constructor() {
        console.log('Ubigeos module loaded');
    }
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UbigeoValidatorMiddleware)
            .forRoutes({ path: 'ubigeo', method: RequestMethod.POST });

        consumer.apply(UbigeoByIdMiddleware)
            .forRoutes({ path: 'ubigeo/:ubigeoId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
