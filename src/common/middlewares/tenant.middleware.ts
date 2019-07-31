import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';

import * as chalk from 'chalk';
import { Connection } from 'mongoose';

import { DB_CONNECTION_TOKEN } from '../../server.constants';
import { getDatabaseFromOrigin } from '../helpers/utils';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(@Inject(DB_CONNECTION_TOKEN) private readonly connection: Connection) {
        console.log('Tenant Middleware initialized');
    }
    async use(req: Request, res: Response, next: Function) {
        const database = getDatabaseFromOrigin(req.headers.origin);
        req['dbConnection'] = this.connection.useDb(database);
        next();
    }
}
