import { Document } from 'mongoose';

/**
 *  Declaring the Interface Ubigeo
 */
export interface IUbigeo extends Document {
    created: Date;
    ubigeoName: string;
}
