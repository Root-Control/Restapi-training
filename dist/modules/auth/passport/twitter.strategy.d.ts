import { Connection } from 'mongoose';
import { ITwitterConfig } from '../interfaces/twitter-config.interface';
export declare class TwitterStrategy {
    private readonly twitterConfig;
    private readonly connection;
    private userModel;
    constructor(twitterConfig: ITwitterConfig, connection: Connection);
    private init;
}
