import { Connection } from 'mongoose';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
export declare class FacebookStrategy {
    private readonly fbConfig;
    private readonly connection;
    private userModel;
    constructor(fbConfig: IFacebookConfig, connection: Connection);
    private init;
}
