import { Injectable, Inject } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { use } from 'passport';

import { FACEBOOK_CONFIG_TOKEN, DB_CONNECTION_TOKEN, USER_MODEL_TOKEN } from '../../../server.constants';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';

import { IUser } from '../../users/interfaces/user.interface';
import { UserSchema } from '../../users/schemas/user.schema';

import { Request } from 'express';

import * as FacebookTokenStrategy from 'passport-facebook-token';

@Injectable()
export class FacebookStrategy {
    private userModel;

    constructor(@Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig) {
        this.init();
    }

    private init(): void {
        use('facebook', new FacebookTokenStrategy({
            passReqToCallback: true,
            clientID: this.fbConfig.client_id,
            clientSecret: this.fbConfig.client_secret,
            profileFields: ['id', 'name', 'displayName', 'emails', 'photos']
        }, async (req: Request, accessToken: string, refreshToken: string, profile: any, done: Function) => {
            try {
                const db = req['dbConnection'];
                this.userModel = db.model(USER_MODEL_TOKEN, UserSchema) as Model<IUser>;
                const providerData = profile._json;
                providerData.accessToken = accessToken;
                providerData.refreshToken = refreshToken;

                let email: string = profile.emails.shift().value;

                //  Conditional if facebook doesn't return email
                if (!email || email === '') {
                    email = `${profile.id}@${profile.provider}.com`;
                }

                const existingUser: IUser = await this.userModel.findOne({ email });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const providerUserProfile = {
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    displayName: profile.displayName,
                    email,
                    username: profile.username || `${profile.id}`,
                    profileImageURL: (profile.id) ? '//graph.facebook.com/' + profile.id + '/picture?type=large' : undefined,
                    provider: 'facebook',
                    providerIdentifierField: 'id',
                    providerData
                };

                const user = new this.userModel(providerUserProfile);

                done(null, await user.save());
            } catch (err) {
                done(err, null);
            }

            const generateUsername = userProfile => {
                let username = '';

                if (userProfile.emails) {
                    username = userProfile.emails[0].value.split('@')[0];
                } else if (userProfile.name) {
                    username = userProfile.name.givenName[0] + userProfile.name.familyName;
                }

                return username.toLowerCase() || undefined;
            };
        }));
    }
}
