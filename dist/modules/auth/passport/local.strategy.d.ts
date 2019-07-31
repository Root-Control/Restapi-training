import { Connection } from 'mongoose';
export declare class LocalStrategy {
    private readonly connection;
    private userModel;
    constructor(connection: Connection);
    private init;
}
