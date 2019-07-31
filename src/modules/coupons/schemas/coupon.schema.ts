import { Schema } from 'mongoose';

/**
 *  Coupon Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const CouponSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    couponName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

CouponSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

CouponSchema.post('save', async function(coupon) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

CouponSchema.methods.updateAttributes = async function(object) {
    const coupon = Object.assign(this, object);
    return await coupon.save();
};
