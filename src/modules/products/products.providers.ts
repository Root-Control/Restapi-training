import { Connection } from 'mongoose';
import { ProductSchema } from './schemas/product.schema';
import { PRODUCT_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const productProviders = [{
    provide: PRODUCT_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
