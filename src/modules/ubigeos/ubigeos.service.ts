import { Injectable, Inject, HttpException, HttpStatus, Scope } from '@nestjs/common';
import { Model, Connection } from 'mongoose';

import { UBIGEO_MODEL_TOKEN } from '../../server.constants';
import { IUbigeo } from './interfaces/ubigeo.interface';
import { UbigeoSchema } from './schemas/ubigeo.schema';
import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';
import { getErrorMessage } from '../../common/helpers/error-handler';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UbigeosService {
    private ubigeoModel;
    private params;
    private db;
    constructor(@Inject(REQUEST) private readonly request: Request) {
        const db = request['dbConnection'];
        this.ubigeoModel = db.model(UBIGEO_MODEL_TOKEN, UbigeoSchema) as Model<IUbigeo>;
    }

    async create(ubigeo) {
        try {
            return await this.ubigeoModel.create(ubigeo);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async list() {
        try {
            return await this.ubigeoModel.find();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async update(ubigeo, body) {
        ubigeo.ubigeoName = body.ubigeoName;
        try {
            return await ubigeo.save();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async patch(ubigeo, body) {
        try {
            return await ubigeo.updateAttributes(body);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async delete(ubigeo) {
        try {
            return await ubigeo.remove();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
