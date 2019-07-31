import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const couponSchema: ObjectSchema = object({
    couponName: string().required(),
});
