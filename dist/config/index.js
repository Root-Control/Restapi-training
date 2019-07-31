"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (config, express) => {
    require('./middlewares')(config, express);
    require('./express')(config, express);
};
//# sourceMappingURL=index.js.map