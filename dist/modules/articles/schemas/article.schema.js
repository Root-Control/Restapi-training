"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ArticleSchema = new mongoose_1.Schema({
    created: {
        type: Date,
        default: new Date()
    },
    title: {
        type: String,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: ''
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.ArticleSchema.pre('save', function (next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});
exports.ArticleSchema.post('save', function (article) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.wasNew) {
            console.log('Is Created');
        }
        else {
            console.log('Is Updated');
        }
    });
});
exports.ArticleSchema.methods.updateAttributes = function (object) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = Object.assign(this, object);
        return yield article.save();
    });
};
//# sourceMappingURL=article.schema.js.map