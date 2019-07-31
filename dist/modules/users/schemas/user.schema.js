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
const illegalUsernames = ['meanjs', 'administrator', 'password', 'admin', 'user', 'unknown', 'anonymous', 'null', 'undefined', 'api'];
exports.UserSchema = new mongoose_1.Schema({
    created: {
        type: Date,
        default: new Date()
    },
    firstName: {
        type: String,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        required: 'Last name is required'
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        index: {
            unique: true,
            sparse: true
        },
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        validate: [validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.'],
        lowercase: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: ''
    },
    profileImageURL: {
        type: String,
        default: '/modules/users/client/img/profile/default.png'
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    additionalProvidersData: {},
    roles: {
        type: [{
                type: String,
                enum: ['user', 'admin']
            }],
        default: ['user'],
        required: 'Please provide at least one role'
    },
    updated: {
        type: Date
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});
exports.UserSchema.post('save', function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('user saved or updated');
    });
});
function validateUsername(username) {
    var usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
    return (this.provider !== 'local' ||
        (username && usernameRegex.test(username) && illegalUsernames.indexOf(username) < 0));
}
;
//# sourceMappingURL=user.schema.js.map