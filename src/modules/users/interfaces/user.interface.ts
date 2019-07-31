import { Document } from 'mongoose';

export interface IUser extends Document {
    created: Date;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    username: string;
    active: boolean;
    password: string;
    profileImageURL: string;
    salt: string;
    provider: string;
    providerData: object;
    additionalProvidersData: object;
    roles: string[];
    updated: Date;
    resetPasswordToken: string;
    resetPasswordExpires: string;
}
