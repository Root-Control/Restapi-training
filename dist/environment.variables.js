"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
class EnvironmentService {
    constructor(filePath) {
        this.envConfig = dotenv_1.parse(fs_1.readFileSync(filePath));
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=environment.variables.js.map