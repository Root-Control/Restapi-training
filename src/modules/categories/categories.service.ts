import { Injectable, Inject, HttpException, HttpStatus, Scope } from '@nestjs/common';
import { Model, Connection } from 'mongoose';

import { CATEGORY_MODEL_TOKEN } from '../../server.constants';
import { ICategory } from './interfaces/category.interface';
import { CategorySchema } from './schemas/category.schema';
import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';
import { getErrorMessage } from '../../common/helpers/error-handler';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class CategoriesService {
    private categoryModel;
    private params;
    private db;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        const db = request['dbConnection'];
        this.categoryModel = db.model(CATEGORY_MODEL_TOKEN, CategorySchema) as Model<ICategory>;
    }

    async create(category) {
        try {
            return await this.categoryModel.create(category);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async list() {
        try {
            return await this.categoryModel.find();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async update(category, body) {
        category.categoryName = body.categoryName;
        try {
            return await category.save();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async patch(category, body) {
        try {
            return await category.updateAttributes(body);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async delete(category) {
        try {
            return await category.remove();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
