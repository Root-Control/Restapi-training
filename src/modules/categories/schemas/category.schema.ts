import { Schema } from 'mongoose';

/**
 *  Category Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const CategorySchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    categoryName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

CategorySchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

CategorySchema.post('save', async function(categorie) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

CategorySchema.methods.updateAttributes = async function(object) {
    const categorie = Object.assign(this, object);
    return await categorie.save();
};
