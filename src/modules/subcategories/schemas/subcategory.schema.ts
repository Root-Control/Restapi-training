import { Schema } from 'mongoose';

/**
 *  Subcategory Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const SubcategorySchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    subcategorieName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

SubcategorySchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

SubcategorySchema.post('save', async function(subcategorie) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

SubcategorySchema.methods.updateAttributes = async function(object) {
    const subcategorie = Object.assign(this, object);
    return await subcategorie.save();
};
