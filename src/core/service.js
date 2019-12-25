import axios from 'axios';
import { JwtHelper } from "../core/jwt-helper";
const isHandlerEnabled = true;

const requestHandler = (request) => {
    if (isHandlerEnabled) {
        //TODO: Change Request Header
        const token = localStorage.getItem('token');
        // if (JwtHelper.isAuthenticated()) {
        //     request.headers['Authorization'] = 'Bearer ' + token;
        // }
        // if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
        //     request.headers['Content-Type'] = 'application/json';
        // }
        // request.headers['Accept'] = 'application/json';
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
    return Promise.reject({...error.toJSON()});
}

export default class Service {
    constructor(namespace, vm, socketOpts) {
        this.namespace = namespace;
        this.axios = axios.create({
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