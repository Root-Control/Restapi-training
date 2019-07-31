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
const joi_1 = require("joi");
const article_joi_1 = require("../../articles/joi/article.joi");
let articleValidatorMiddleware = class articleValidatorMiddleware {
    constructor() {
    }
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = joi_1.validate(req.body, article_joi_1.articleSchema);
            if (result.error) {
                const errorMessage = result.error.details.shift().message;
                const message = errorMessage.replace(/["]/g, '');
                return next(new common_1.BadRequestException(`Validation failed: ${message}`));
            }
            next();
        });
    }
};
articleValidatorMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], articleValidatorMiddleware);
exports.articleValidatorMiddleware = articleValidatorMiddleware;
//# sourceMappingURL=article-validator.middleware.js.map