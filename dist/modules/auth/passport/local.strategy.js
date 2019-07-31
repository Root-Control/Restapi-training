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
const passport_local_1 = require("passport-local");
const user_schema_1 = require("../../users/schemas/user.schema");
const encryption_1 = require("../../../utilities/encryption");
const server_constants_1 = require("../../../server.constants");
const tenant_model_1 = require("../../../common/helpers/tenant-model");
let LocalStrategy = class LocalStrategy {
    constructor(connection) {
        this.connection = connection;
        this.init();
    }
    init() {
        passport_1.use('local-signin', new passport_local_1.Strategy({
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password'
        }, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { request: req, connection: this.connection, model: server_constants_1.USER_MODEL_TOKEN, schema: user_schema_1.UserSchema };
                this.userModel = new tenant_model_1.Tenant(params).getModel();
                const user = yield this.userModel.findOne({ email: email });
                if (!user) {
                    return done(new common_1.UnauthorizedException(server_constants_1.MESSAGES.UNAUTHORIZED_INVALID_EMAIL), false);
                }
                if (encryption_1.generateHashedPassword(user.salt, password) !== user.password) {
                    return done(new common_1.UnauthorizedException(server_constants_1.MESSAGES.UNAUTHORIZED_INVALID_PASSWORD), false);
                }
                done(null, user);
            }
            catch (error) {
                done(error, false);
            }
        })));
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(server_constants_1.DB_CONNECTION_TOKEN)),
    __metadata("design:paramtypes", [mongoose_1.Connection])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map