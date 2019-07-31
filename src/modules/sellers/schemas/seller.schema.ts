import { Schema } from 'mongoose';

/**
 *  Seller Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const SellerSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    sellerName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

SellerSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

SellerSchema.post('save', async function(seller) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

SellerSchema.methods.updateAttributes = async function(object) {
    const seller = Object.assign(this, object);
    return await seller.save();
};
