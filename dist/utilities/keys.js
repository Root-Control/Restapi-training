"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function extractKey(path) {
    return fs_1.readFileSync(path)
        .toString()
        .replace(/\n|\r/g, '')
        .replace(/[-]+[\w\s]+[-]+/g, '');
}
exports.extractKey = extractKey;
//# sourceMappingURL=keys.js.map