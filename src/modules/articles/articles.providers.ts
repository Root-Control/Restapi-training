import { Connection } from 'mongoose';
import { ArticleSchema } from './schemas/article.schema';
import { ARTICLE_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG } from '../../server.constants';

export const articleProviders = [{
    provide: ARTICLE_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Article', ArticleSchema),
    inject: [DB_CONNECTION_TOKEN]
}];
