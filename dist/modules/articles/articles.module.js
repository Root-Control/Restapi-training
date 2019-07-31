"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const database_1 = require("../../database");
const articles_controller_1 = require("./articles.controller");
const articles_providers_1 = require("./articles.providers");
const articles_service_1 = require("./articles.service");
const articles_gateway_1 = require("./articles.gateway");
const articleById_middleware_1 = require("./middlewares/articleById.middleware");
const article_validator_middleware_1 = require("../articles/middlewares/article-validator.middleware");
let ArticlesModule = class ArticlesModule {
    constructor() {
        console.log('Articles module loaded');
    }
    configure(consumer) {
        consumer
            .apply(article_validator_middleware_1.articleValidatorMiddleware)
            .forRoutes({ path: 'articles', method: common_1.RequestMethod.POST });
        consumer.apply(articleById_middleware_1.ArticleIdMiddleware)
            .forRoutes({ path: 'articles/:articleId', method: common_1.RequestMethod.ALL });
    }
};
ArticlesModule = __decorate([
    common_1.Module({
        imports: [database_1.DatabaseModule],
        controllers: [articles_controller_1.ArticlesController],
        providers: [
            articles_gateway_1.ArticlesGateway,
            ...articles_providers_1.articleProviders,
            articles_service_1.ArticlesService
        ],
        exports: [
            ...articles_providers_1.articleProviders
        ]
    }),
    __metadata("design:paramtypes", [])
], ArticlesModule);
exports.ArticlesModule = ArticlesModule;
//# sourceMappingURL=articles.module.js.map