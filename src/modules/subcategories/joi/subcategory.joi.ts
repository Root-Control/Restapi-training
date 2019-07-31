import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const subcategorySchema: ObjectSchema = object({
    subcategoryName: string().required(),
});
