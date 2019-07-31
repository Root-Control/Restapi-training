import { Connection } from 'mongoose';
import { FavoriteSchema } from './schemas/favorite.schema';
import { FAVORITE_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const favoriteProviders = [{
    provide: FAVORITE_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Favorite', FavoriteSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
