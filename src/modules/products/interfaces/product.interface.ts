import { Document } from 'mongoose';

/**
 *  Declaring the Interface Product
 */
export interface IProduct extends Document {
    created: Date;
    productName: string;
}
