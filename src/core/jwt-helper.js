const jwt = require('jsonwebtoken');
const privateKey = '__niteco__privatekey__';
const algorithm = 'HS256';
const _expiredTime = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour
import { JwtHelperService } from "./jwthelper.service";
import { TokenKey } from "./config";
export const JwtHelper = {
    isExpired(key) {
        let token = localStorage.getItem(key);
        console.log(JwtHelperService.isTokenExpired("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjUzZjRiZDgzLTgzNjEtYmMzOC1hN2RkLTM5ZjI1MzZmMDE5OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6IjAyMDViNjU5LTA1MTQtNGI1ZS05MWZmLTNjZTY3YTBiOGYwNCIsImlhdCI6MTU3NzM1NDgwMCwibmJmIjoxNTc3MzU0ODAwLCJleHAiOjE1Nzc0NDEyMDAsImlzcyI6IkVUIiwiYXVkIjoiRVQifQ.CcGvPkR0rYWbM_aVPa7jh1s0gnrMrcr4ubxxmmRa2cc"))
        return JwtHelperService.isTokenExpired(token);
    },
    createSignToken(data, expiredTime) {
        return jwt.sign(data, privateKey, {
            algorithm,
            expiresIn: expiredTime || _expiredTime
        });
    },
    createSignTokenAsync(data, expiredTime) {
        jwt.sign(data, privateKey, {
            algorithm,
            expiresIn: expiredTime || _expiredTime
        }, function (err, token) {
            if (!err) return token;
            throw err;
        });
    },
    isAuthenticated() {
        return !this.isExpired(TokenKey.AuthToken);
    }
}