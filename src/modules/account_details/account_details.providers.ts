import { Connection } from 'mongoose';
import { AccountDetailSchema } from './schemas/account_detail.schema';
import { ACCOUNT_DETAIL_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const accountDetailProviders = [{
    provide: ACCOUNT_DETAIL_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Account_detail', AccountDetailSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
