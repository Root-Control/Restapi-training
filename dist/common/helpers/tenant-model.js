"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tenant {
    constructor(params) {
        const db = params.connection.useDb('AMS');
        this.model = db.model(params.model, params.schema);
    }
    getModel() {
        return this.model;
    }
}
exports.Tenant = Tenant;
//# sourceMappingURL=tenant-model.js.map