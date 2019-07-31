import { Schema } from 'mongoose';

/**
 *  Product Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const ProductSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    productName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

ProductSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

ProductSchema.post('save', async function(product) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

ProductSchema.methods.updateAttributes = async function(object) {
    const product = Object.assign(this, object);
    return await product.save();
};
