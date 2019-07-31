"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_constants_1 = require("../../server.constants");
const facebook_config_1 = require("./config/facebook-config");
const twitter_config_1 = require("./config/twitter-config");
const google_config_1 = require("./config/google-config");
exports.authProviders = [
    {
        provide: server_constants_1.FACEBOOK_CONFIG_TOKEN,
        useValue: facebook_config_1.facebookConfig
    },
    {
        provide: server_constants_1.TWITTER_CONFIG_TOKEN,
        useValue: twitter_config_1.twitterConfig
    },
    {
        provide: server_constants_1.GOOGLE_CONFIG_TOKEN,
        useValue: google_config_1.googleConfig
    }
];
//# sourceMappingURL=auth.providers.js.map