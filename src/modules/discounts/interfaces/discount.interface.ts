import { Document } from 'mongoose';

/**
 *  Declaring the Interface Discount
 */
export interface IDiscount extends Document {
    created: Date;
    discountName: string;
}
