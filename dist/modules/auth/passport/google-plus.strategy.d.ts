import { Connection } from 'mongoose';
import { IGoogleConfig } from '../interfaces/google-config.interface';
export declare class GoogleStrategy {
    private readonly googleConfig;
    private readonly connection;
    private userModel;
    constructor(googleConfig: IGoogleConfig, connection: Connection);
    private init;
}
