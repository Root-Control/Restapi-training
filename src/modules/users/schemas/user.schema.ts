import { Schema, model } from 'mongoose';

const illegalUsernames: string[] = ['meanjs', 'administrator', 'password', 'admin', 'user', 'unknown', 'anonymous', 'null', 'undefined', 'api'];
console.log('Loading user Schema');

export const UserSchema: Schema = new Schema({
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
            sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
        },
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        validate: [validateUsername,
            'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.",' +
            ' no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.'],
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
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

UserSchema.post('save', async user => {
    console.log('user saved or updated');
});

function validateUsername(username) {
    const usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
    return (
        this.provider !== 'local' ||
        (username && usernameRegex.test(username) && illegalUsernames.indexOf(username) < 0)
    );
}
