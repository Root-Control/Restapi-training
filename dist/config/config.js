"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_variables_1 = require("../environment.variables");
const keys_1 = require("../utilities/keys");
let environmentService = new environment_variables_1.EnvironmentService('.env');
const rootPath = process.cwd();
const jwtSecret = keys_1.extractKey(`${rootPath}/keys/jwt.private.key`);
const Config = {
    development: {
        rootPath,
        db_uri: 'mongodb://localhost:27017',
        dbs: ['TEL', 'PIT', 'SAS', 'AMS', 'HIR'],
        httpPort: 1337,
        wsPort: 1338,
        jwtSecret,
        domain: 'localhost',
        httpProtocol: 'http',
        wsProtocol: 'ws',
        awsKey: environmentService.get('AWS_KEY'),
        awsSecret: environmentService.get('AWS_SECRET')
    },
    production: {
        rootPath,
        dbs: environmentService.get('MONGODB_CONNECTION'),
        db_uri: 'mongodb://localhost:27017',
        httpPort: +environmentService.get('HTTP_SERVER_PORT'),
        wsPort: +environmentService.get('WS_PORT'),
        jwtSecret,
        domain: environmentService.get('DOMAIN'),
        httpProtocol: environmentService.get('HTTP_PROTOCOL'),
        wsProtocol: environmentService.get('WS_PROTOCOL'),
        awsKey: environmentService.get('AWS_KEY'),
        awsSecret: environmentService.get('AWS_SECRET')
    }
};
exports.Config = Config;
//# sourceMappingURL=config.js.map