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
const server_constants_1 = require("../../server.constants");
const user_schema_1 = require("./schemas/user.schema");
const converters_1 = require("../../common/helpers/converters");
const core_1 = require("@nestjs/core");
const tenant_model_1 = require("../../common/helpers/tenant-model");
let UserService = class UserService {
    constructor(connection, request) {
        this.connection = connection;
        this.request = request;
        this.params = { request, connection, model: server_constants_1.USER_MODEL_TOKEN, schema: user_schema_1.UserSchema };
    }
    me(userModel) {
        return __awaiter(this, void 0, void 0, function* () {
            return userModel;
        });
    }
    getUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new tenant_model_1.Tenant(this.params).getModel();
            return yield userModel.find(query).select('-local.salt  -local.hashedPassword');
        });
    }
    updateProfileImage(user, file) {
        return __awaiter(this, void 0, void 0, function* () {
            user.profileImageURL = file.location || `/${converters_1.parseImageURL(file.path)}`;
            return yield user.save();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new tenant_model_1.Tenant(this.params).getModel();
            return yield userModel.findById(userId).select('-salt -password');
        });
    }
    deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user.remove();
        });
    }
    updateUser(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const google = user.google.id;
            const local = user.local.email;
            const twitter = user.twitter.id;
            const facebook = user.facebook.id;
            if (google) {
            }
            else if (twitter) {
            }
            else if (facebook) {
            }
            else {
            }
            return user;
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(server_constants_1.DB_CONNECTION_TOKEN)),
    __param(1, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Connection, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map