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
const websockets_1 = require("@nestjs/websockets");
let ArticlesGateway = class ArticlesGateway {
    constructor() {
        console.log('initializing');
    }
    afterInit() {
    }
    sendArticlesListFromSocket(articles) {
        return this.server.emit('articles', { message: 'from controller' });
    }
    sendCreatedArticle(article) {
        return this.server.emit('articleChannel', { article });
    }
    findAll(client, data) {
        return this.server.emit('articles', { message: 'works' });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ArticlesGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('articles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArticlesGateway.prototype, "findAll", null);
ArticlesGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [])
], ArticlesGateway);
exports.ArticlesGateway = ArticlesGateway;
//# sourceMappingURL=articles.gateway.js.map