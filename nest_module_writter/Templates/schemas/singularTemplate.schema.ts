import { Schema } from 'mongoose';

/**
 *  Template Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const TemplateSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    templateName: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

TemplateSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

TemplateSchema.post('save', async function(template) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

TemplateSchema.methods.updateAttributes = async function(object) {
    const template = Object.assign(this, object);
    return await template.save();
};
