import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const ubigeoSchema: ObjectSchema = object({
    ubigeoName: string().required(),
});
