import { Document } from 'mongoose';

/**
 *  Declaring the Interface Account_detail
 */
export interface IAccountDetail extends Document {
    created: Date;
    account_detailName: string;
}
