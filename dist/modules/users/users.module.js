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
const database_1 = require("../../database");
const users_controller_1 = require("./users.controller");
const users_providers_1 = require("./users.providers");
const users_service_1 = require("./users.service");
const userbyId_middleware_1 = require("./middlewares/userbyId.middleware");
let UsersModule = class UsersModule {
    constructor() {
        console.log('users module loaded');
    }
    configure(consumer) {
        consumer
            .apply(userbyId_middleware_1.UserIdMiddleware)
            .forRoutes({ path: 'users/:id', method: common_1.RequestMethod.ALL });
    }
};
UsersModule = __decorate([
    common_1.Module({
        imports: [database_1.DatabaseModule],
        controllers: [users_controller_1.UsersController],
        providers: [
            ...users_providers_1.userProviders,
            users_service_1.UserService
        ],
        exports: [
            ...users_providers_1.userProviders
        ]
    }),
    __metadata("design:paramtypes", [])
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map