import { NestMiddleware } from '@nestjs/common';
export declare class bodyValidatorMiddleware implements NestMiddleware {
    constructor();
    use(req: any, res: any, next: Function): Promise<any>;
}
