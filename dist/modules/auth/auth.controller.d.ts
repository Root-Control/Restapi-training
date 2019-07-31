import { Request } from 'express';
import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    requestJsonWebTokenAfterLocalSignUp(req: Request): Promise<IToken>;
    requestJsonWebTokenAfterLocalSignIn(req: Request): Promise<IToken>;
    requestFacebookRedirectUrl(): Promise<{
        redirect_uri: string;
    }>;
    facebookSignIn(req: Request): Promise<IToken>;
    requestJsonWebTokenAfterFacebookSignIn(req: Request): Promise<IToken>;
    requestTwitterRedirectUri(): Promise<any>;
    twitterSignIn(req: Request): Promise<any>;
    requestJsonWebTokenAfterTwitterSignIn(req: Request): Promise<IToken>;
    requestGoogleRedirectUri(): Promise<any>;
    googleSignIn(req: Request): Promise<any>;
    requestJsonWebTokenAfterGoogleSignIn(req: Request): Promise<IToken>;
}
