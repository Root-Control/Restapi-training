import { Connection } from 'mongoose';
import { CouponSchema } from './schemas/coupon.schema';
import { COUPON_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const couponProviders = [{
    provide: COUPON_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Coupon', CouponSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
