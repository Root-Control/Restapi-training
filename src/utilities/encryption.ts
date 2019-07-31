import { randomBytes, createHmac } from 'crypto';

/**
 *  Salt generator for password and user schema
 *  Params - none
 */
const generateSalt: () => string = () => {
    return randomBytes(128).toString('base64');
};

/**
 *  Generating hashed password for the provided salt, password
 *  Params - Salt - password
 */
const generateHashedPassword: (salt: string, password: string) => string = (salt, password) => {
    return createHmac('sha256', salt).update(password).digest('hex');
};

export {
    generateSalt,
    generateHashedPassword
};
