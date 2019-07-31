import { NestModule, MiddlewareConsumer } from '@nestjs/common';
export declare class UsersModule implements NestModule {
    constructor();
    configure(consumer: MiddlewareConsumer): void;
}
