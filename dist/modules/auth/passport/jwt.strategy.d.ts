import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: IJwtPayload, done: Function): Promise<any>;
}
export {};
