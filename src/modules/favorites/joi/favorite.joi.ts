import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  Article Schema Declaration (Before REST communication)
 */

export const favoriteSchema: ObjectSchema = object({
    favoriteName: string().required(),
});
