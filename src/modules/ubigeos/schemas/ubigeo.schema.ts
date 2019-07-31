import { Schema } from 'mongoose';

/**
 *  Ubigeo Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const UbigeoSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    ubigeoName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

UbigeoSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

UbigeoSchema.post('save', async function(ubigeo) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

UbigeoSchema.methods.updateAttributes = async function(object) {
    const ubigeo = Object.assign(this, object);
    return await ubigeo.save();
};
