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
const articles_service_1 = require("./articles.service");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const articles_gateway_1 = require("../articles/articles.gateway");
let ArticlesController = class ArticlesController {
    constructor(articlesService, articlesSocket) {
        this.articlesService = articlesService;
        this.articlesSocket = articlesSocket;
    }
    list(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield this.articlesService.list();
            return articles;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let article = req.body;
            article.creator = req.user._id;
            yield this.articlesService.create(article);
            this.articlesSocket.sendCreatedArticle(article);
            return article;
        });
    }
    getArticleById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let article = req.article;
            return article;
        });
    }
    updateArticleById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = req.article;
            return yield this.articlesService.update(article, req.body);
        });
    }
    patchArticleById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = req.article;
            return yield this.articlesService.patch(article, req.body);
        });
    }
    deleteArticle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = req.article;
            return yield this.articlesService.delete(article);
        });
    }
};
__decorate([
    common_1.Get(''),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "list", null);
__decorate([
    common_1.Post(''),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "create", null);
__decorate([
    common_1.Get(':articleId'),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "getArticleById", null);
__decorate([
    common_1.Put(':articleId'),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "updateArticleById", null);
__decorate([
    common_1.Patch(':articleId'),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "patchArticleById", null);
__decorate([
    common_1.Delete(':articleId'),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticlesController.prototype, "deleteArticle", null);
ArticlesController = __decorate([
    common_1.Controller('articles'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __param(0, common_1.Inject(articles_service_1.ArticlesService)),
    __metadata("design:paramtypes", [Object, articles_gateway_1.ArticlesGateway])
], ArticlesController);
exports.ArticlesController = ArticlesController;
//# sourceMappingURL=articles.controller.js.map