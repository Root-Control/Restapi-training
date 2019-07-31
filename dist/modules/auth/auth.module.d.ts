import { NestModule, MiddlewareConsumer } from '@nestjs/common';
export declare class AuthModule implements NestModule {
    constructor();
    configure(consumer: MiddlewareConsumer): void;
}
