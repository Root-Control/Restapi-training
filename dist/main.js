"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const environment_variables_1 = require("./environment.variables");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const chalk = require("chalk");
const log = chalk.default;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const environment = new environment_variables_1.EnvironmentService('.env');
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.setGlobalPrefix('api');
        app.useStaticAssets(path_1.join(__dirname, '/../public'));
        yield app.listen(environment.get('HTTP_SERVER_PORT'));
        console.log(log.yellow('[Store] V.1.0   -'));
        console.log(`Environment -> ${environment.get('NODE_ENV')}`);
        console.log(`Port -> ${environment.get('HTTP_SERVER_PORT')}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map