import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common';
import { authenticate } from 'passport';

// Strategies
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { FacebookStrategy } from './passport/facebook.strategy';
import { TwitterStrategy } from './passport/twitter.strategy';
import { GoogleStrategy } from './passport/google-plus.strategy';

import { UsersModule } from '../users/users.module';
import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

//  Middlewares
import { BodyValidatorMiddleware } from './middlewares/body-validator.middleware';
import { LoginValidatorMiddleware } from './middlewares/login-validator.middleware';

import { Verifier } from './passport/verifier';

@Module({
    imports: [UsersModule],
    providers: [
        ...authProviders,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        FacebookStrategy,
        TwitterStrategy,
        GoogleStrategy
    ],
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BodyValidatorMiddleware)
            .forRoutes('auth/local/signup');
        consumer
            .apply(LoginValidatorMiddleware, authenticate('local-signin', { session: false }))
            .forRoutes('auth/local/signin');

        consumer
            .apply(authenticate('facebook', { session: false }))
            .forRoutes('auth/facebook/token');

        consumer
            .apply(authenticate('twitter', { session: false }))
            .forRoutes('auth/twitter/token');

        consumer
            .apply(authenticate('google', { session: false }))
            .forRoutes('auth/google/token');
    }
}
