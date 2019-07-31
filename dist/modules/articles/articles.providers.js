"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_schema_1 = require("./schemas/article.schema");
const server_constants_1 = require("../../server.constants");
exports.articleProviders = [{
        provide: server_constants_1.ARTICLE_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Article', article_schema_1.ArticleSchema),
        inject: [server_constants_1.DB_CONNECTION_TOKEN]
    }];
console.log(exports.articleProviders);
//# sourceMappingURL=articles.providers.js.map