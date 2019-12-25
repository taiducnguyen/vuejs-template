import { IsProduction } from './config';

const apiBaseUrl = IsProduction ? 'http://localhost:8088/login' : 'http://localhost:8088/login';

export const ApiUrl = {
    /** User*/
    Login: apiBaseUrl + '',
    UserGetProfile: apiBaseUrl + '',
}