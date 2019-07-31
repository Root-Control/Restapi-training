"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUniqueErrorMessage(err) {
    var output;
    try {
        var begin = 0;
        if (err.errmsg.lastIndexOf('.$') !== -1) {
            begin = err.errmsg.lastIndexOf('.$') + 2;
        }
        else {
            begin = err.errmsg.lastIndexOf('index: ') + 7;
        }
        var fieldName = err.errmsg.substring(begin, err.errmsg.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
    }
    catch (ex) {
        output = 'Unique field already exists';
    }
    return output;
}
function getErrorMessage(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            case 'UNSUPPORTED_MEDIA_TYPE':
                message = 'Unsupported filetype';
                break;
            case 'LIMIT_FILE_SIZE':
                message = 'Image file too large. Maximum size allowed is 2Mb files.';
                break;
            case 'LIMIT_UNEXPECTED_FILE':
                message = 'Missing `newProfilePicture` field';
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else if (err.message && !err.errors) {
        message = err.message;
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=error-handler.js.map