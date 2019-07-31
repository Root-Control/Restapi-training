import { Document } from 'mongoose';

/**
 *  Declaring the Interface Article
 */
export interface IArticle extends Document {
    created: Date;
    title: string;
    content: string;
}
