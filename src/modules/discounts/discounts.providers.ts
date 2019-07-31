import { Connection } from 'mongoose';
import { DiscountSchema } from './schemas/discount.schema';
import { DISCOUNT_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const discountProviders = [{
    provide: DISCOUNT_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Discount', DiscountSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
