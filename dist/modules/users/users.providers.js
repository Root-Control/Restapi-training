"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./schemas/user.schema");
const server_constants_1 = require("../../server.constants");
exports.userProviders = [{
        provide: server_constants_1.USER_MODEL_TOKEN,
        useFactory: (connection) => connection.model('User', user_schema_1.UserSchema),
        inject: [server_constants_1.DB_CONNECTION_TOKEN]
    }];
console.log(exports.userProviders);
//# sourceMappingURL=users.providers.js.map