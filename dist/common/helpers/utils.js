"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmptyObject(value) {
    for (var key in value) {
        if (value.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
exports.isEmptyObject = isEmptyObject;
//# sourceMappingURL=utils.js.map