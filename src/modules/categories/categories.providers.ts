import { Connection } from 'mongoose';
import { CategorySchema } from './schemas/category.schema';
import { CATEGORY_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const categoryProviders = [{
    provide: CATEGORY_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Category', CategorySchema),
    inject: [DB_CONNECTION_TOKEN]
}];
