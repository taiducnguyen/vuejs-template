import axios from 'axios';
import { ApiUrl } from "./api-url";
import { JwtHelper } from './jwt-helper';
import { TokenKey } from './config';
import Service from "./service";
let service = new Service('auth', this);

export const state = {
    authToken: getSavedState(TokenKey.AuthToken),
}

export const mutations = {
    SET_ACCESS_TOKEN(state, newAuthToken) {
        state.authToken = newAuthToken;
        saveState(TokenKey.AuthToken, newAuthToken);
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.authToken;
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    init({ state, dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { username, password } = {}) {
        if (getters.loggedIn) {
            //TODO: Do something with current token
            // return dispatch('validate');
        }

        return service.post(ApiUrl.Login, { userNameOrEmailAddress: username, password }).then(res => {
            const accessToken = res.result && res.result.accessToken;
            if (!!accessToken) {
                commit('SET_ACCESS_TOKEN', accessToken);
            }
            return res.result;
        }).catch(err => {
            throw err;
        });
    },

    // Logs out the current user.
    logOut({ commit }) {
        commit('SET_ACCESS_TOKEN', null)
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    validate({ commit, state }) {
        if (!state.authToken) return Promise.resolve(null)
        return axios
            .get('/api/session')
            .then((response) => {
                const user = response.data
                commit('SET_ACCESS_TOKEN', user)
                return user
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    commit('SET_ACCESS_TOKEN', null)
                } else {
                    console.warn(error)
                }
                return null
            })
    },
    loginFake({ commit, state }, { username, password } = {}) {

        return new Promise((resolve, reject) => {
            if (!!username && !!password) {
                let data = {
                    username: username,
                    token: 'Fake'
                };
                let token = JwtHelper.createSigningToken(data);
                commit('SET_ACCESS_TOKEN', token);
                resolve(data);
            } else {
                reject('Fake Data')
            }
        })
    }
}

// ===
// Private helpers
// ===

function getSavedState(key) {
    return window.localStorage.getItem(key)
}

function saveState(key, state) {
    window.localStorage.setItem(key, state)
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}