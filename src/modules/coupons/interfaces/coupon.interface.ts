import { Document } from 'mongoose';

/**
 *  Declaring the Interface Coupon
 */
export interface ICoupon extends Document {
    created: Date;
    couponName: string;
}
