import { Injectable, Inject, HttpException, HttpStatus, Scope } from '@nestjs/common';
import { Model, Connection } from 'mongoose';

import { ACCOUNT_DETAIL_MODEL_TOKEN } from '../../server.constants';
import { IAccountDetail } from './interfaces/account_detail.interface';
import { AccountDetailSchema } from './schemas/account_detail.schema';
import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';
import { getErrorMessage } from '../../common/helpers/error-handler';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AccountDetailsService {
    private account_detailModel;
    private params;
    private db;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        const db = request['dbConnection'];
        this.account_detailModel = db.model(ACCOUNT_DETAIL_MODEL_TOKEN, AccountDetailSchema) as Model<IAccountDetail>;
    }

    async create(account_detail) {
        try {
            return await this.account_detailModel.create(account_detail);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async list() {
        try {
            return await this.account_detailModel.find();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async update(account_detail, body) {
        account_detail.account_detailName = body.account_detailName;
        try {
            return await account_detail.save();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async patch(account_detail, body) {
        try {
            return await account_detail.updateAttributes(body);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async delete(account_detail) {
        try {
            return await account_detail.remove();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
