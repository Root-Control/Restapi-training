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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const article_schema_1 = require("./../schemas/article.schema");
const server_constants_1 = require("../../../server.constants");
const tenant_model_1 = require("../../../common/helpers/tenant-model");
let ArticleIdMiddleware = class ArticleIdMiddleware {
    constructor(connection) {
        this.connection = connection;
    }
    use(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { request, connection: this.connection, model: server_constants_1.ARTICLE_MODEL_TOKEN, schema: article_schema_1.ArticleSchema };
            this.articleModel = new tenant_model_1.Tenant(params).getModel();
            if (!mongoose_1.Types.ObjectId.isValid(request.params.articleId))
                return next(new common_1.UnauthorizedException('Invalid identifier'));
            const article = yield this.articleModel.findById(request.params.articleId);
            if (article) {
                request.article = article;
                next();
            }
            else
                return next(new common_1.UnauthorizedException('No article with that identifier has been found'));
        });
    }
};
ArticleIdMiddleware = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(server_constants_1.DB_CONNECTION_TOKEN)),
    __metadata("design:paramtypes", [mongoose_1.Connection])
], ArticleIdMiddleware);
exports.ArticleIdMiddleware = ArticleIdMiddleware;
//# sourceMappingURL=articleById.middleware.js.map