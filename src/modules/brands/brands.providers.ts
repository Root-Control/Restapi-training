import { Connection } from 'mongoose';
import { BrandSchema } from './schemas/brand.schema';
import { BRAND_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const brandProviders = [{
    provide: BRAND_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Brand', BrandSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
