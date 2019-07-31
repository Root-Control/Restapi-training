import { connect, createConnection } from 'mongoose';
import { SERVER_CONFIG, DB_CONNECTION_TOKEN } from '../server.constants';

const opts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    keepAlive: true,
    socketTimeoutMS: 30000,
    poolSize: 100,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    autoReconnect: true
};

export const databaseProviders = [{
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
        try {
            console.log(`Connecting to ${SERVER_CONFIG.db_uri}`);
            return await createConnection(`${SERVER_CONFIG.db_uri}`, opts);
        } catch (ex) {
            console.log(ex);
        }
    }
}];
