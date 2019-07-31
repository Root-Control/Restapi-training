import { object, string, boolean, ObjectSchema } from 'joi';

export const authLoginSchema: ObjectSchema = object({
    email: string().required(),
    password: string().required()
});
