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
const server_constants_1 = require("../../../server.constants");
const user_schema_1 = require("../../users/schemas/user.schema");
const tenant_model_1 = require("../../../common/helpers/tenant-model");
const FacebookTokenStrategy = require('passport-facebook-token');
let FacebookStrategy = class FacebookStrategy {
    constructor(fbConfig, connection) {
        this.fbConfig = fbConfig;
        this.connection = connection;
        this.init();
    }
    init() {
        passport_1.use('facebook', new FacebookTokenStrategy({
            passReqToCallback: true,
            clientID: this.fbConfig.client_id,
            clientSecret: this.fbConfig.client_secret,
            profileFields: ['id', 'name', 'displayName', 'emails', 'photos']
        }, (req, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { request: req, connection: this.connection, model: server_constants_1.USER_MODEL_TOKEN, schema: user_schema_1.UserSchema };
                this.userModel = new tenant_model_1.Tenant(params).getModel();
                var providerData = profile._json;
                providerData.accessToken = accessToken;
                providerData.refreshToken = refreshToken;
                let email = profile.emails.shift().value;
                if (!email || email === '')
                    email = `${profile.id}@${profile.provider}.com`;
                const existingUser = yield this.userModel.findOne({ email: email });
                if (existingUser) {
                    return done(null, existingUser);
                }
                var providerUserProfile = {
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    displayName: profile.displayName,
                    email: email,
                    username: profile.username || `${profile.id}`,
                    profileImageURL: (profile.id) ? '//graph.facebook.com/' + profile.id + '/picture?type=large' : undefined,
                    provider: 'facebook',
                    providerIdentifierField: 'id',
                    providerData: providerData
                };
                const user = new this.userModel(providerUserProfile);
                done(null, yield user.save());
            }
            catch (err) {
                done(err, null);
            }
            function generateUsername(profile) {
                var username = '';
                if (profile.emails) {
                    username = profile.emails[0].value.split('@')[0];
                }
                else if (profile.name) {
                    username = profile.name.givenName[0] + profile.name.familyName;
                }
                return username.toLowerCase() || undefined;
            }
        })));
    }
};
FacebookStrategy = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(server_constants_1.FACEBOOK_CONFIG_TOKEN)),
    __param(1, common_1.Inject(server_constants_1.DB_CONNECTION_TOKEN)),
    __metadata("design:paramtypes", [Object, mongoose_1.Connection])
], FacebookStrategy);
exports.FacebookStrategy = FacebookStrategy;
//# sourceMappingURL=facebook.strategy.js.map