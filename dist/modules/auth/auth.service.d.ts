import { Connection } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import { IToken } from './interfaces/token.interface';
import { IFacebookConfig } from './interfaces/facebook-config.interface';
import { ITwitterConfig } from './interfaces/twitter-config.interface';
import { IGoogleConfig } from './interfaces/google-config.interface';
import { Request } from 'express';
export declare class AuthService {
    private readonly fbConfig;
    private readonly twitterConfig;
    private readonly googleConfig;
    private readonly connection;
    private readonly request;
    private url;
    private params;
    constructor(fbConfig: IFacebookConfig, twitterConfig: ITwitterConfig, googleConfig: IGoogleConfig, connection: Connection, request: Request);
    createUserAndReturnToken(user: IUser): Promise<IToken>;
    createToken(user: IUser): Promise<IToken>;
    findUserById(id: string): Promise<IUser>;
    requestFacebookRedirectUri(): Promise<{
        redirect_uri: string;
    }>;
    facebookSignIn(code: string): Promise<any>;
    requestTwitterRedirectUri(): Promise<{
        redirect_uri: string;
    } | any>;
    twitterSignIn(oauth_token: string, oauth_verifier: string): Promise<any>;
    requestGoogleRedirectUri(): Promise<{
        redirect_uri: string;
    } | any>;
    googleSignIn(code: string): Promise<any>;
    private parseTwitterResponse;
}
