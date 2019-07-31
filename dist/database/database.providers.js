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
const mongoose_1 = require("mongoose");
const server_constants_1 = require("../server.constants");
const opts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    keepAlive: true,
    socketTimeoutMS: 30000,
    poolSize: 100,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    autoReconnect: true,
};
exports.databaseProviders = [{
        provide: server_constants_1.DB_CONNECTION_TOKEN,
        useFactory: () => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Connecting to ${server_constants_1.SERVER_CONFIG.db_uri}/default`);
                return yield mongoose_1.createConnection(`${server_constants_1.SERVER_CONFIG.db_uri}/default`, opts);
            }
            catch (ex) {
                console.log(ex);
            }
        })
    }];
console.log(exports.databaseProviders);
//# sourceMappingURL=database.providers.js.map