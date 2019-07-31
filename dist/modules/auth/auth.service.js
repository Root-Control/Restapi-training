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
const jsonwebtoken_1 = require("jsonwebtoken");
const request_1 = require("request");
const error_handler_1 = require("../../common/helpers/error-handler");
const server_constants_1 = require("../../server.constants");
const encryption_1 = require("../../utilities/encryption");
const user_schema_1 = require("../users/schemas/user.schema");
const core_1 = require("@nestjs/core");
const tenant_model_1 = require("../../common/helpers/tenant-model");
let AuthService = class AuthService {
    constructor(fbConfig, twitterConfig, googleConfig, connection, request) {
        this.fbConfig = fbConfig;
        this.twitterConfig = twitterConfig;
        this.googleConfig = googleConfig;
        this.connection = connection;
        this.request = request;
        this.params = { request, connection, model: server_constants_1.USER_MODEL_TOKEN, schema: user_schema_1.UserSchema };
        this.url = `${server_constants_1.SERVER_CONFIG.httpProtocol}://${server_constants_1.SERVER_CONFIG.domain}:${server_constants_1.SERVER_CONFIG.httpPort}`;
    }
    createUserAndReturnToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new tenant_model_1.Tenant(this.params).getModel();
            const expiresIn = '48h';
            const salt = encryption_1.generateSalt();
            const newUser = new userModel({
                firstName: user.firstName,
                lastName: user.lastName,
                displayName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                username: user.username,
                password: encryption_1.generateHashedPassword(salt, user.password),
                salt,
                provider: 'local',
                providerData: null,
                additionalProvidersData: null,
                roles: user.roles || 'user'
            });
            try {
                yield newUser.save();
                const token = jsonwebtoken_1.sign({
                    _id: newUser._id
                }, server_constants_1.SERVER_CONFIG.jwtSecret, {
                    expiresIn
                });
                return {
                    token
                };
            }
            catch (ex) {
                throw new common_1.HttpException(error_handler_1.getErrorMessage(ex), common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        });
    }
    createToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresIn = '48h';
            const token = jsonwebtoken_1.sign({
                _id: user.id
            }, server_constants_1.SERVER_CONFIG.jwtSecret, { expiresIn });
            return {
                token
            };
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new tenant_model_1.Tenant(this.params).getModel();
            return yield userModel.findById(id);
        });
    }
    requestFacebookRedirectUri() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = [
                `client_id=${this.fbConfig.client_id}`,
                `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
                `state=${this.fbConfig.state}`
            ];
            const redirect_uri = `${this.fbConfig.login_dialog_uri}?${queryParams.join('&')}`;
            return {
                redirect_uri
            };
        });
    }
    facebookSignIn(code) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Llego aqui');
            const queryParams = [
                `client_id=${this.fbConfig.client_id}`,
                `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
                `client_secret=${this.fbConfig.client_secret}`,
                `code=${code}`
            ];
            const uri = `${this.fbConfig.access_token_uri}?${queryParams.join('&')}`;
            return new Promise((resolve, reject) => {
                request_1.get(uri, (error, response, body) => {
                    if (error) {
                        return reject(error);
                    }
                    if (body.error) {
                        return reject(body.error);
                    }
                    const { access_token } = JSON.parse(body);
                    request_1.post({
                        url: `${this.url}/api/auth/facebook/token`,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        form: {
                            access_token
                        }
                    }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return reject(err);
                        }
                        if (body.error) {
                            return reject(body.error);
                        }
                        resolve(body);
                    }));
                });
            });
        });
    }
    requestTwitterRedirectUri() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                request_1.post({
                    url: this.twitterConfig.request_token_uri,
                    oauth: {
                        consumer_key: this.twitterConfig.consumer_key,
                        consumer_secret: this.twitterConfig.consumer_secret,
                        callback: this.twitterConfig.oauth_redirect_uri
                    },
                }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return reject(err);
                    }
                    if (body.error) {
                        return reject(body.error);
                    }
                    const { oauth_token } = this.parseTwitterResponse(body);
                    const redirect_uri = `${this.twitterConfig.login_dialog_uri}?oauth_token=${oauth_token}`;
                    resolve({
                        redirect_uri
                    });
                }));
            });
        });
    }
    twitterSignIn(oauth_token, oauth_verifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                request_1.post({
                    url: this.twitterConfig.access_token_uri,
                    oauth: {
                        consumer_key: this.twitterConfig.consumer_key,
                        consumer_secret: this.twitterConfig.consumer_secret,
                        token: oauth_token,
                        verifier: oauth_verifier
                    }
                }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return reject(err);
                    }
                    if (body.error) {
                        return reject(body.error);
                    }
                    const { oauth_token, oauth_token_secret, user_id } = this.parseTwitterResponse(body);
                    request_1.post({
                        url: `${this.url}/api/auth/twitter/token`,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        form: {
                            oauth_token,
                            oauth_token_secret,
                            user_id
                        }
                    }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return reject(err);
                        }
                        if (body.error) {
                            return reject(body.error);
                        }
                        resolve(body);
                    }));
                }));
            });
        });
    }
    requestGoogleRedirectUri() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = [
                `client_id=${this.googleConfig.client_id}`,
                `redirect_uri=${this.googleConfig.oauth_redirect_uri}`,
                `response_type=${this.googleConfig.response_type}`,
                `scope=${this.googleConfig.scopes.join(' ')}`
            ];
            const redirect_uri = `${this.googleConfig.login_dialog_uri}?${queryParams.join('&')}`;
            return {
                redirect_uri
            };
        });
    }
    googleSignIn(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                request_1.post({
                    url: this.googleConfig.access_token_uri,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    form: {
                        code,
                        client_id: this.googleConfig.client_id,
                        client_secret: this.googleConfig.client_secret,
                        redirect_uri: this.googleConfig.oauth_redirect_uri,
                        grant_type: this.googleConfig.grant_type
                    }
                }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return reject(err);
                    }
                    if (body.error) {
                        return reject(body.error);
                    }
                    const { access_token } = JSON.parse(body);
                    request_1.post({
                        url: `${this.url}/api/auth/google/token`,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        form: {
                            access_token
                        }
                    }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return reject(err);
                        }
                        if (body.error) {
                            return reject(body.error);
                        }
                        resolve(body);
                    }));
                }));
            });
        });
    }
    parseTwitterResponse(response) {
        const regex = /([a-z_]+?)=([a-zA-Z0-9_-]+)/g;
        const parsedResponse = {};
        let match = regex.exec(response);
        while (match) {
            match.shift();
            parsedResponse[match.shift()] = match.shift();
            match = regex.exec(response);
        }
        return parsedResponse;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(server_constants_1.FACEBOOK_CONFIG_TOKEN)),
    __param(1, common_1.Inject(server_constants_1.TWITTER_CONFIG_TOKEN)),
    __param(2, common_1.Inject(server_constants_1.GOOGLE_CONFIG_TOKEN)),
    __param(3, common_1.Inject(server_constants_1.DB_CONNECTION_TOKEN)),
    __param(4, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, Object, Object, mongoose_1.Connection, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map