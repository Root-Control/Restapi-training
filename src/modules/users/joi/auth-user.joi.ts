import { object, string, boolean, ObjectSchema } from 'joi';

export const authUserSchema: ObjectSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    username: string().required(),
    email: string().email().required(),
    password: string().alphanum().min(6).max(36).required()
});
