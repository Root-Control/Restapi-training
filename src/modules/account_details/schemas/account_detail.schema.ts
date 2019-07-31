import { Schema } from 'mongoose';

/**
 *  Account_detail Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const AccountDetailSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    accountDetailName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

AccountDetailSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

AccountDetailSchema.post('save', async function(account_detail) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

AccountDetailSchema.methods.updateAttributes = async function(object) {
    const account_detail = Object.assign(this, object);
    return await account_detail.save();
};
