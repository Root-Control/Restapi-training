import { NestModule, MiddlewareConsumer } from '@nestjs/common';
export declare class ArticlesModule implements NestModule {
    constructor();
    configure(consumer: MiddlewareConsumer): void;
}
