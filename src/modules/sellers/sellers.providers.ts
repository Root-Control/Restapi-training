import { Connection } from 'mongoose';
import { SellerSchema } from './schemas/seller.schema';
import { SELLER_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const sellerProviders = [{
    provide: SELLER_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Seller', SellerSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
