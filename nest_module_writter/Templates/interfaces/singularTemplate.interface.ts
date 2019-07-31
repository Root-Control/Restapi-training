import { Document } from 'mongoose';

/**
 *  Declaring the Interface Template
 */
export interface ITemplate extends Document {
    created: Date;
    templateName: string;
}
