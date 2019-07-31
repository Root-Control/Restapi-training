import { Document } from 'mongoose';

/**
 *  Declaring the Interface Favorite
 */
export interface IFavorite extends Document {
    created: Date;
    favoriteName: string;
}
