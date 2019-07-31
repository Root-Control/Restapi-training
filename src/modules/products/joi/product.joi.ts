import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const productSchema: ObjectSchema = object({
    productName: string().required(),
});
