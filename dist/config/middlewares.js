"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
module.exports = (config, app) => {
    app.use(cookieParser());
    app.use(helmet());
    app.use(body_parser_1.json());
    app.use(body_parser_1.urlencoded({ extended: true }));
};
//# sourceMappingURL=middlewares.js.map