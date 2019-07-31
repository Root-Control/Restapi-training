import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const articleSchema: ObjectSchema = object({
    title: string().required(),
    content: string().required()
});
