import { Injectable, Inject, HttpException, HttpStatus, Scope } from '@nestjs/common';
import { Model, Connection } from 'mongoose';

import { COUPON_MODEL_TOKEN } from '../../server.constants';
import { ICoupon } from './interfaces/coupon.interface';
import { CouponSchema } from './schemas/coupon.schema';
import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';
import { getErrorMessage } from '../../common/helpers/error-handler';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class CouponsService {
    private couponModel;
    private params;
    private db;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        const db = request['dbConnection'];
        this.couponModel = db.model(COUPON_MODEL_TOKEN, CouponSchema) as Model<ICoupon>;
    }

    async create(coupon) {
        try {
            return await this.couponModel.create(coupon);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async list() {
        try {
            return await this.couponModel.find();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async update(coupon, body) {
        coupon.couponName = body.couponName;
        try {
            return await coupon.save();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async patch(coupon, body) {
        try {
            return await coupon.updateAttributes(body);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async delete(coupon) {
        try {
            return await coupon.remove();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
