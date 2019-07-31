import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const discountSchema: ObjectSchema = object({
    discountName: string().required(),
});
