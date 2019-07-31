import { Schema } from 'mongoose';

/**
 *  Discount Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const DiscountSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    discountName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

DiscountSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

DiscountSchema.post('save', async function(discount) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

DiscountSchema.methods.updateAttributes = async function(object) {
    const discount = Object.assign(this, object);
    return await discount.save();
};
