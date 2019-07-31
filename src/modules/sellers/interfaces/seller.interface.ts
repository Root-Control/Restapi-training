import { Document } from 'mongoose';

/**
 *  Declaring the Interface Seller
 */
export interface ISeller extends Document {
    created: Date;
    sellerName: string;
}
