import { IGoogleConfig } from '../interfaces/google-config.interface';

export const googleConfig: IGoogleConfig = {
    login_dialog_uri: 'https://accounts.google.com/o/oauth2/auth',
    client_id: '342352192956-dr6rht4d8neev4lsf11inalma1j86rrf.apps.googleusercontent.com',
    client_secret: 'PKiHC4-jos975AffhQgSLcR6',
    oauth_redirect_uri: 'http://localhost:4200/index',
    access_token_uri: 'https://accounts.google.com/o/oauth2/token',
    response_type: 'code',
    scopes: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ],
    grant_type: 'authorization_code'
};
