import axios from 'axios';
import { JwtHelper } from "../core/jwt-helper";
import { IsProduction, TokenKey } from './config';

const apiBaseUrl = IsProduction ? 'http://et.niteco.se:8080/' : 'http://et.niteco.se:8080/';

const isHandlerEnabled = true;

const requestHandler = (request) => {
    if (isHandlerEnabled) {
        const token = localStorage.getItem(TokenKey.AuthToken);
        if (JwtHelper.isAuthenticated()) {
            request.headers.common['Authorization'] = 'Bearer ' + token;
        }
        // if (!request.headers.common.has('Content-Type') && !(request.body instanceof FormData)) {
        //     request.headers.common['Content-Type'] = 'application/json';
        // }
        request.headers.common['Accept'] = 'application/json';
    }
    return request;
}

const successHandler = (response) => {
    if (isHandlerEnabled) {
        //TODO: Do Success Handler
    }
    return response;
}

const errorHandler = (error) => {
    if (isHandlerEnabled) {
        //TODO: Do Error Handler
    }
    console.log( error)
    return Promise.reject({...error.toJSON()});
}

export default class Service {
    constructor(namespace, vm, socketOpts) {
        this.namespace = namespace;
        this.axios = axios.create({
            baseURL: apiBaseUrl,
            responseType: "json"
        });

        //Enable request interceptor
        this.axios.interceptors.request.use(
            request => requestHandler(request),
            error => errorHandler(error));

        //Response and Error handler
        this.axios.interceptors.response.use(
            response => successHandler(response),
            error => errorHandler(error));
    }

    /**
     * 
     * @param {any} action 
     */
    get(action) {
        return new Promise((resolve, reject) => {
            this.axios.request(action, {
                method: 'GET',
            }).then(response => {
                if (response.data) {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            }).catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    console.error("REST request error!", error.response.data.error);
                    reject(error.response.data.error);
                } else
                    reject(error);
            })
        })
    }

    /**
     * Post Http Request
     * @param {any} action 
     * @param {any} parrams 
     */
    post(action, parrams) {
        return new Promise((resolve, reject) => {
            this.axios.request(action, {
                method: 'POST',
                data: parrams
            }).then(response => {
                if (response.data) {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            }).catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    console.error("REST request error!", error.response.data.error);
                    reject(error.response.data.error);
                } else
                    reject(error);
            })
        })
    }

    /**
     * 
     * @param {any} action 
     * @param {any} parrams 
     */
    put(action, parrams) {
        return new Promise((resolve, reject) => {
            this.axios.request(action, {
                method: 'PUT',
                data: parrams
            }).then(response => {
                if (response.data) {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            }).catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    console.error("REST request error!", error.response.data.error);
                    reject(error.response.data.error);
                } else
                    reject(error);
            })
        })
    }
}