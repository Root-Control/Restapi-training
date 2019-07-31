import { NestMiddleware } from '@nestjs/common';
import { Connection } from 'mongoose';
export declare class ArticleIdMiddleware implements NestMiddleware {
    private readonly connection;
    private articleModel;
    constructor(connection: Connection);
    use(request: any, response: any, next: Function): Promise<any>;
}
