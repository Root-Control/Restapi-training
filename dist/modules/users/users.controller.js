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
const platform_express_1 = require("@nestjs/platform-express");
const users_service_1 = require("./users.service");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const multer_1 = require("../../config/multer");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    me(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.me(req.user);
        });
    }
    uploadFile(file, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            return yield this.userService.updateProfileImage(user, file);
        });
    }
    getUserById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.model;
            return user;
        });
    }
    updateUserById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.updateUser(req.model, req.body);
            return user;
        });
    }
    getUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = req.query;
            return yield this.userService.getUsers(query);
        });
    }
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.model;
            return yield this.userService.deleteUser(user);
        });
    }
};
__decorate([
    common_1.Get('me'),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "me", null);
__decorate([
    common_1.Put('upload'),
    roles_decorator_1.Roles('user', 'admin'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', multer_1.MulterConfig)),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadFile", null);
__decorate([
    common_1.Get(':id'),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    common_1.Put(':id'),
    roles_decorator_1.Roles('user', 'admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    common_1.Get(),
    roles_decorator_1.Roles('user', 'admin', 'superadmin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    common_1.Delete(':id'),
    roles_decorator_1.Roles('admin', 'superadmin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    common_1.Controller('users'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map