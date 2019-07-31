import { Injectable, NestMiddleware } from '@nestjs/common';
import * as chalk from 'chalk';
import { getMethodColor } from '../helpers/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req, res, next: Function) {
        let logMessage;
        const log = chalk.default;
        const methodColor = getMethodColor(req.method);
        console.log(methodColor);
        logMessage = `[URL]: ${req.baseUrl}`;
        console.log(`[${log[methodColor](req.method)}]-${log.white(req.baseUrl)}`);
        next();
    }
}
