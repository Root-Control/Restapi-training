import { Schema } from 'mongoose';

/**
 *  Brand Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const BrandSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    brandName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

BrandSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

BrandSchema.post('save', async function(brand) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

BrandSchema.methods.updateAttributes = async function(object) {
    const brand = Object.assign(this, object);
    return await brand.save();
};
