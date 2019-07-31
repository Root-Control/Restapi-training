import { Connection } from 'mongoose';
export declare const articleProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("mongoose").Document, {}>;
    inject: string[];
}[];
