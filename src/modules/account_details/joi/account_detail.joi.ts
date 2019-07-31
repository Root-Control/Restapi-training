import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const accountDetailSchema: ObjectSchema = object({
    account_detailName: string().required(),
});
