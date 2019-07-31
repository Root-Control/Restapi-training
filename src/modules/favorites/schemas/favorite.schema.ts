import { Schema } from 'mongoose';

/**
 *  Favorite Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const FavoriteSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    favoriteName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

FavoriteSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

FavoriteSchema.post('save', async function(favorite) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

FavoriteSchema.methods.updateAttributes = async function(object) {
    const favorite = Object.assign(this, object);
    return await favorite.save();
};
