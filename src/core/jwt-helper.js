const jwt = require('jsonwebtoken');
const privateKey = '__niteco__privatekey__';
const algorithm = 'HS256';
const _expiredTime = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour

export const JwtHelper = {
    isExpired(key) {
        let token = localStorage.getItem(key);
        jwt.verify(key, privateKey, function (err, decoded) {
            console.log(err);
            return err ? false : true;
        })
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
        let token = localStorage.getItem('token');
        return !!token;
        // return !this.isExpired(token);
    }
}