import { Connection } from 'mongoose';
import { SubcategorySchema } from './schemas/subcategory.schema';
import { SUBCATEGORY_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const subcategoryProviders = [{
    provide: SUBCATEGORY_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Subcategory', SubcategorySchema),
    inject: [DB_CONNECTION_TOKEN]
}];
