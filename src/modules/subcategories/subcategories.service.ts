import { Injectable, Inject, HttpException, HttpStatus, Scope } from '@nestjs/common';
import { Model, Connection } from 'mongoose';

import { SUBCATEGORY_MODEL_TOKEN } from '../../server.constants';
import { ISubcategory } from './interfaces/subcategory.interface';
import { SubcategorySchema } from './schemas/subcategory.schema';
import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';
import { getErrorMessage } from '../../common/helpers/error-handler';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class SubcategoriesService {
    private subcategoryModel;
    private params;
    private db;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        const db = request['dbConnection'];
        this.subcategoryModel = db.model(SUBCATEGORY_MODEL_TOKEN, SubcategorySchema) as Model<ISubcategory>;
    }

    async create(subcategory) {
        try {
            return await this.subcategoryModel.create(subcategory);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async list() {
        try {
            return await this.subcategoryModel.find();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async update(subcategory, body) {
        subcategory.subcategoryName = body.subcategoryName;
        try {
            return await subcategory.save();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async patch(subcategory, body) {
        try {
            return await subcategory.updateAttributes(body);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async delete(subcategory) {
        try {
            return await subcategory.remove();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
