"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.articleSchema = joi_1.object({
    title: joi_1.string().required(),
    content: joi_1.string().required()
});
//# sourceMappingURL=article.joi.js.map