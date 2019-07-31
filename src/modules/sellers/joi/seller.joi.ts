import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const sellerSchema: ObjectSchema = object({
    sellerName: string().required(),
});
