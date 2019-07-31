import { Connection } from 'mongoose';
import { UbigeoSchema } from './schemas/ubigeo.schema';
import { UBIGEO_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const ubigeoProviders = [{
    provide: UBIGEO_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Ubigeo', UbigeoSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
