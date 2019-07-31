import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';
export declare class TokenMiddleware implements NestMiddleware {
    private readonly connection;
    private userModel;
    constructor(connection: Connection);
    use(req: Request, res: Response, next: Function): Promise<import("express-serve-static-core").Response>;
}
