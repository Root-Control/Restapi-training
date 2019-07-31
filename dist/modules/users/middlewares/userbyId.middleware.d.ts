import { NestMiddleware } from '@nestjs/common';
import { Connection } from 'mongoose';
export declare class UserIdMiddleware implements NestMiddleware {
    private readonly connection;
    private userModel;
    constructor(connection: Connection);
    use(request: any, response: any, next: Function): Promise<any>;
}
