import { Injectable, Inject, HttpException, HttpStatus, Scope } from '@nestjs/common';
import { Model, Connection } from 'mongoose';

import { DISCOUNT_MODEL_TOKEN } from '../../server.constants';
import { IDiscount } from './interfaces/discount.interface';
import { DiscountSchema } from './schemas/discount.schema';
import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';
import { getErrorMessage } from '../../common/helpers/error-handler';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class DiscountsService {
    private discountModel;
    private params;
    private db;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        const db = request['dbConnection'];
        this.discountModel = db.model(DISCOUNT_MODEL_TOKEN, DiscountSchema) as Model<IDiscount>;
    }

    async create(discount) {
        try {
            return await this.discountModel.create(discount);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async list() {
        try {
            return await this.discountModel.find();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async update(discount, body) {
        discount.discountName = body.discountName;
        try {
            return await discount.save();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async patch(discount, body) {
        try {
            return await discount.updateAttributes(body);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async delete(discount) {
        try {
            return await discount.remove();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
