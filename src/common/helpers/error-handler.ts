/**
 * Verifies the unique error un mongo
 */
function getUniqueErrorMessage(err) {
    let output;

    try {
        let begin = 0;
        if (err.errmsg.lastIndexOf('.$') !== -1) {
            // support mongodb <= 3.0 (default: MMapv1 engine)
            // "errmsg" : "E11000 duplicate key error index: mean-dev.users.$email_1 dup key: { : \"test@user.com\" }"
            begin = err.errmsg.lastIndexOf('.$') + 2;
        } else {
            // support mongodb >= 3.2 (default: WiredTiger engine)
            // "errmsg" : "E11000 duplicate key error collection: mean-dev.users index: email_1 dup key: { : \"test@user.com\" }"
            begin = err.errmsg.lastIndexOf('index: ') + 7;
        }
        const fieldName = err.errmsg.substring(begin, err.errmsg.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

    } catch (ex) {
        output = 'Unique field already exists';
    }

    return output;
}

/**
 * Get the error message from error object
 */
function getErrorMessage(err) {
    let message = '';

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
    } else if (err.message && !err.errors) {
        message = err.message;
    } else {
        for (const errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }

    return message;
}

export {
    getErrorMessage
};
