import { Document } from 'mongoose';

/**
 *  Declaring the Interface Brand
 */
export interface IBrand extends Document {
    created: Date;
    brandName: string;
}
