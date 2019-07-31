import { Document } from 'mongoose';
export interface IArticle extends Document {
    created: Date;
    title: string;
    content: string;
}
