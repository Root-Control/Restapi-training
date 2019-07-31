"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const environment_variables_1 = require("./environment.variables");
console.log('Configurating the server');
const envService = new environment_variables_1.EnvironmentService('.env');
const env = envService.get('NODE_ENV') || 'development';
exports.SERVER_CONFIG = config_1.Config[env];
exports.DB_CONNECTION_TOKEN = 'DbConnectionToken';
exports.SERVER_CONFIG_TOKEN = 'ServerConfigToken';
exports.FACEBOOK_CONFIG_TOKEN = 'FacebookConfigToken';
exports.TWITTER_CONFIG_TOKEN = 'TwitterConfigToken';
exports.GOOGLE_CONFIG_TOKEN = 'GoogleConfigToken';
exports.USER_MODEL_TOKEN = 'User';
exports.ARTICLE_MODEL_TOKEN = 'Article';
exports.MESSAGES = {
    UNAUTHORIZED_EMAIL_OR_USERNAME_IN_USE: 'Email or username already exists',
    UNAUTHORIZED_INVALID_PASSWORD: 'Invalid password',
    UNAUTHORIZED_INVALID_EMAIL: 'The email does not exist',
    UNAUTHORIZED_UNRECOGNIZED_BEARER: 'Unrecognized bearer of the token'
};
//# sourceMappingURL=server.constants.js.map