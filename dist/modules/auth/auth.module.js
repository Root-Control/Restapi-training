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
const passport_1 = require("passport");
const local_strategy_1 = require("./passport/local.strategy");
const jwt_strategy_1 = require("./passport/jwt.strategy");
const facebook_strategy_1 = require("./passport/facebook.strategy");
const twitter_strategy_1 = require("./passport/twitter.strategy");
const google_plus_strategy_1 = require("./passport/google-plus.strategy");
const users_module_1 = require("../users/users.module");
const auth_providers_1 = require("./auth.providers");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const body_validator_middleware_1 = require("./middlewares/body-validator.middleware");
let AuthModule = class AuthModule {
    constructor() {
        console.log('Auth Module loaded');
    }
    configure(consumer) {
        consumer
            .apply(body_validator_middleware_1.bodyValidatorMiddleware)
            .forRoutes('auth/local/signup');
        consumer
            .apply(passport_1.authenticate('local-signin', { session: false }))
            .forRoutes('auth/local/signin');
        consumer
            .apply(passport_1.authenticate('facebook', { session: false }))
            .forRoutes('auth/facebook/token');
        consumer
            .apply(passport_1.authenticate('twitter', { session: false }))
            .forRoutes('auth/twitter/token');
        consumer
            .apply(passport_1.authenticate('google', { session: false }))
            .forRoutes('auth/google/token');
    }
};
AuthModule = __decorate([
    common_1.Module({
        imports: [users_module_1.UsersModule],
        providers: [
            ...auth_providers_1.authProviders,
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            facebook_strategy_1.FacebookStrategy,
            twitter_strategy_1.TwitterStrategy,
            google_plus_strategy_1.GoogleStrategy
        ],
        controllers: [auth_controller_1.AuthController]
    }),
    __metadata("design:paramtypes", [])
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map