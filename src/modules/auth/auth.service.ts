import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { get, post, Response } from 'request';

import { getErrorMessage } from '../../common/helpers/error-handler';

import {
    SERVER_CONFIG,
    USER_MODEL_TOKEN,
    FACEBOOK_CONFIG_TOKEN,
    TWITTER_CONFIG_TOKEN,
    GOOGLE_CONFIG_TOKEN
} from '../../server.constants';
import { IUser } from '../users/interfaces/user.interface';
import { IToken } from './interfaces/token.interface';
import { IFacebookConfig } from './interfaces/facebook-config.interface';
import { ITwitterConfig } from './interfaces/twitter-config.interface';
import { IGoogleConfig } from './interfaces/google-config.interface';
import { generateHashedPassword, generateSalt } from '../../utilities/encryption';

import { UserSchema } from '../users/schemas/user.schema';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthService {
    private userModel;
    private url: string;
    private params;
    constructor(
        @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
        @Inject(TWITTER_CONFIG_TOKEN) private readonly twitterConfig: ITwitterConfig,
        @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: IGoogleConfig,
        @Inject(REQUEST) private readonly request: Request
    ) {
        const db = request['dbConnection'];
        this.userModel = db.model(USER_MODEL_TOKEN, UserSchema) as Model<IUser>;
        this.url = `${SERVER_CONFIG.httpProtocol}://${SERVER_CONFIG.domain}:${SERVER_CONFIG.httpPort}`;
    }

    async createUserAndReturnToken(user: IUser): Promise<IToken> {
        const expiresIn = '48h';
        const salt: string = generateSalt();
        const newUser: IUser = new this.userModel({
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            username: user.username,
            password: generateHashedPassword(salt, user.password),
            salt,
            provider: 'local',
            providerData: null,
            additionalProvidersData: null,
            roles: user.roles || 'user'
        });

        try {
            await newUser.save();
            const token = sign({
                _id: newUser._id
            }, SERVER_CONFIG.jwtSecret, {
                    expiresIn
                });

            return {
                token
            };
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async createToken(user: IUser): Promise<IToken> {
        const expiresIn: string = '48h';
        const token: string = sign({
            _id: user.id
        }, SERVER_CONFIG.jwtSecret, { expiresIn });

        return {
            token
        };
    }

    async findUserById(id: string): Promise<IUser> {
        return await this.userModel.findById(id);
    }

    async requestFacebookRedirectUri(): Promise<{ redirect_uri: string }> {
        const queryParams: string[] = [
            `client_id=${this.fbConfig.client_id}`,
            `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
            `state=${this.fbConfig.state}`
        ];
        const redirect_uri: string = `${this.fbConfig.login_dialog_uri}?${queryParams.join('&')}`;

        return {
            redirect_uri
        };
    }

    async facebookSignIn(code: string): Promise<any> {
        console.log('Llego aqui');
        const queryParams: string[] = [
            `client_id=${this.fbConfig.client_id}`,
            `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
            `client_secret=${this.fbConfig.client_secret}`,
            `code=${code}`
        ];

        const uri: string = `${this.fbConfig.access_token_uri}?${queryParams.join('&')}`;

        return new Promise((resolve: Function, reject: Function) => {
            get(uri, (error: Error, response: Response, body: any) => {
                if (error) {
                    return reject(error);
                }

                if (body.error) {
                    return reject(body.error);
                }

                const { access_token } = JSON.parse(body);

                post({
                    url: `${this.url}/api/auth/facebook/token`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    form: {
                        access_token
                    }
                }, async (err: Error, res: Response, result: any) => {
                    if (err) {
                        return reject(err);
                    }

                    if (result.error) {
                        return reject(result.error);
                    }
                    resolve(result);
                });
            });
        });
    }

    async requestTwitterRedirectUri(): Promise<{ redirect_uri: string } | any> {
        return new Promise((resolve: Function, reject: Function) => {
            post({
                url: this.twitterConfig.request_token_uri,
                oauth: {
                    consumer_key: this.twitterConfig.consumer_key,
                    consumer_secret: this.twitterConfig.consumer_secret,
                    callback: this.twitterConfig.oauth_redirect_uri
                },
            }, async (err: Error, res: Response, body: any) => {
                if (err) {
                    return reject(err);
                }

                if (body.error) {
                    return reject(body.error);
                }

                const { oauth_token } = this.parseTwitterResponse(body);
                const redirect_uri: string = `${this.twitterConfig.login_dialog_uri}?oauth_token=${oauth_token}`;

                resolve({
                    redirect_uri
                });
            });
        });
    }

    async twitterSignIn(oauth_token: string, oauth_verifier: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            post({
                url: this.twitterConfig.access_token_uri,
                oauth: {
                    consumer_key: this.twitterConfig.consumer_key,
                    consumer_secret: this.twitterConfig.consumer_secret,
                    token: oauth_token,
                    verifier: oauth_verifier
                }
            }, async (err: Error, res: Response, body: any) => {
                if (err) {
                    return reject(err);
                }

                if (body.error) {
                    return reject(body.error);
                }

                const { oauth_token, oauth_token_secret, user_id } = this.parseTwitterResponse(body);

                post({
                    url: `${this.url}/api/auth/twitter/token`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    form: {
                        oauth_token,
                        oauth_token_secret,
                        user_id
                    }
                }, async (err: Error, res: Response, body: any) => {
                    if (err) {
                        return reject(err);
                    }

                    if (body.error) {
                        return reject(body.error);
                    }

                    resolve(body);
                });
            });
        });
    }

    async requestGoogleRedirectUri(): Promise<{ redirect_uri: string } | any> {
        const queryParams: string[] = [
            `client_id=${this.googleConfig.client_id}`,
            `redirect_uri=${this.googleConfig.oauth_redirect_uri}`,
            `response_type=${this.googleConfig.response_type}`,
            `scope=${this.googleConfig.scopes.join(' ')}`
        ];
        const redirect_uri: string = `${this.googleConfig.login_dialog_uri}?${queryParams.join('&')}`;

        return {
            redirect_uri
        };
    }

    async googleSignIn(code: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            post({
                url: this.googleConfig.access_token_uri,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: {
                    code,
                    client_id: this.googleConfig.client_id,
                    client_secret: this.googleConfig.client_secret,
                    redirect_uri: this.googleConfig.oauth_redirect_uri,
                    grant_type: this.googleConfig.grant_type
                }
            }, async (err: Error, res: Response, body: any) => {
                if (err) {
                    return reject(err);
                }

                if (body.error) {
                    return reject(body.error);
                }

                const { access_token } = JSON.parse(body);

                post({
                    url: `${this.url}/api/auth/google/token`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    form: {
                        access_token
                    }
                }, async (err: Error, res: Response, body: any) => {
                    if (err) {
                        return reject(err);
                    }

                    if (body.error) {
                        return reject(body.error);
                    }

                    resolve(body);
                });
            });
        });
    }

    private parseTwitterResponse(response: string): { [key: string]: string | boolean } {
        const regex: RegExp = /([a-z_]+?)=([a-zA-Z0-9_-]+)/g;
        const parsedResponse: { [key: string]: string } = {};

        let match: RegExpMatchArray = regex.exec(response);

        while (match) {
            match.shift();

            parsedResponse[match.shift()] = match.shift();

            match = regex.exec(response);
        }

        return parsedResponse;
    }
}
