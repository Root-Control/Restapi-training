import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const singularTemplateSchema: ObjectSchema = object({
    singularTemplateName: string().required(),
});
