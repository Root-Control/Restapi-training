import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const brandSchema: ObjectSchema = object({
    brandName: string().required(),
});
