import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { TemplatesController } from './templates.controller';
import { singularTemplateProviders } from './templates.providers';
import { PluralTemplatesService } from './templates.service';

import { TemplateByIdMiddleware } from './middlewares/singularTemplateById.middleware';
//  Middlewares
import { TemplateValidatorMiddleware } from './middlewares/singularTemplate-validator.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [TemplatesController],
    providers: [
        ...singularTemplateProviders,
        PluralTemplatesService
    ],
    exports: [
        ...singularTemplateProviders
    ]
})
export class PluralTemplatesModule implements NestModule {
    constructor() {
        console.log('Templates module loaded');
    }
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TemplateValidatorMiddleware)
            .forRoutes({ path: 'singularTemplate', method: RequestMethod.POST });

        consumer.apply(TemplateByIdMiddleware)
            .forRoutes({ path: 'singularTemplate/:templateId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
