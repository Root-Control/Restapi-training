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
const passport_1 = require("passport");
const uuid_1 = require("uuid");
const server_constants_1 = require("../../../server.constants");
const user_schema_1 = require("../../users/schemas/user.schema");
const tenant_model_1 = require("../../../common/helpers/tenant-model");
const GoogleTokenStrategy = require('passport-google-plus-token');
let GoogleStrategy = class GoogleStrategy {
    constructor(googleConfig, connection) {
        this.googleConfig = googleConfig;
        this.connection = connection;
        this.init();
    }
    init() {
        passport_1.use('google', new GoogleTokenStrategy({
            passReqToCallback: true,
            clientID: this.googleConfig.client_id,
            clientSecret: this.googleConfig.client_secret
        }, (req, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { request: req, connection: this.connection, model: server_constants_1.USER_MODEL_TOKEN, schema: user_schema_1.UserSchema };
                this.userModel = new tenant_model_1.Tenant(params).getModel();
                var providerData = profile._json;
                providerData.accessToken = accessToken;
                providerData.refreshToken = refreshToken;
                const existingUser = yield this.userModel.findOne({ email: profile.emails[0].value });
                if (existingUser) {
                    return done(null, existingUser);
                }
                var providerUserProfile = {
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    profileImageURL: (providerData.picture) ? providerData.picture : providerData.image.url,
                    provider: 'google',
                    providerIdentifierField: 'id',
                    providerData: providerData
                };
                if (!providerUserProfile.username)
                    providerUserProfile.username = uuid_1.v1();
                const user = new this.userModel(providerUserProfile);
                done(null, yield user.save());
            }
            catch (ex) {
                done(ex, null);
            }
        })));
    }
};
GoogleStrategy = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(server_constants_1.GOOGLE_CONFIG_TOKEN)),
    __param(1, common_1.Inject(server_constants_1.DB_CONNECTION_TOKEN)),
    __metadata("design:paramtypes", [Object, mongoose_1.Connection])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google-plus.strategy.js.map