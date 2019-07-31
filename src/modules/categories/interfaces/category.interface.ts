import { Document } from 'mongoose';

/**
 *  Declaring the Interface Category
 */
export interface ICategory extends Document {
    created: Date;
    categorieName: string;
}
