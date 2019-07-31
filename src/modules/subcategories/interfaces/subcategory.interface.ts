import { Document } from 'mongoose';

/**
 *  Declaring the Interface Subcategory
 */
export interface ISubcategory extends Document {
    created: Date;
    subcategorieName: string;
}
