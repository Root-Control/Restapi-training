import { NestMiddleware } from '@nestjs/common';
export declare class articleValidatorMiddleware implements NestMiddleware {
    constructor();
    use(req: any, res: any, next: Function): Promise<any>;
}
