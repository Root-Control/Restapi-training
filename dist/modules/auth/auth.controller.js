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
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    requestJsonWebTokenAfterLocalSignUp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.createUserAndReturnToken(req.body);
        });
    }
    requestJsonWebTokenAfterLocalSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.createToken(req.user);
        });
    }
    requestFacebookRedirectUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.requestFacebookRedirectUri();
        });
    }
    facebookSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.facebookSignIn(req.body.code);
        });
    }
    requestJsonWebTokenAfterFacebookSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.createToken(req.user);
        });
    }
    requestTwitterRedirectUri() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.requestTwitterRedirectUri();
        });
    }
    twitterSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.twitterSignIn(req.body.oauth_token, req.body.oauth_verifier);
        });
    }
    requestJsonWebTokenAfterTwitterSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.createToken(req.user);
        });
    }
    requestGoogleRedirectUri() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.requestGoogleRedirectUri();
        });
    }
    googleSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.googleSignIn(req.body.code);
        });
    }
    requestJsonWebTokenAfterGoogleSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.createToken(req.user);
        });
    }
};
__decorate([
    common_1.Post('local/signup'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestJsonWebTokenAfterLocalSignUp", null);
__decorate([
    common_1.Post('local/signin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestJsonWebTokenAfterLocalSignIn", null);
__decorate([
    common_1.Get('facebook/uri'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestFacebookRedirectUrl", null);
__decorate([
    common_1.Post('facebook/signin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookSignIn", null);
__decorate([
    common_1.Post('facebook/token'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestJsonWebTokenAfterFacebookSignIn", null);
__decorate([
    common_1.Get('twitter/uri'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestTwitterRedirectUri", null);
__decorate([
    common_1.Post('twitter/signin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "twitterSignIn", null);
__decorate([
    common_1.Post('twitter/token'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestJsonWebTokenAfterTwitterSignIn", null);
__decorate([
    common_1.Get('google/uri'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestGoogleRedirectUri", null);
__decorate([
    common_1.Post('google/signin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSignIn", null);
__decorate([
    common_1.Post('google/token'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestJsonWebTokenAfterGoogleSignIn", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map