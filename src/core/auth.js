import axios from 'axios'
import Service from "./service"
import { ApiUrl } from "./api-url";
import { JwtHelper } from './jwt-helper';

let service = new Service('auth', this);

export const state = {
    currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue;
        saveState('auth.currentUser', newValue);
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser;
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

        return service.post(ApiUrl.Login, { username, password }).then(res => {
            const user = res.data;
            commit('SET_CURRENT_USER', user);
            return user;
        }).catch(err => {
            throw err;
        });
    },

    // Logs out the current user.
    logOut({ commit }) {
        commit('SET_CURRENT_USER', null)
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)
        return axios
            .get('/api/session')
            .then((response) => {
                const user = response.data
                commit('SET_CURRENT_USER', user)
                return user
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    commit('SET_CURRENT_USER', null)
                } else {
                    console.warn(error)
                }
                return null
            })
    },
    loginFake({ commit, state }, { username, password } = {}) {
        console.log(username)
        console.log(password)

        return new Promise((resolve, reject) => {
            if (!!username && !!password) {
                let data = {
                    username: username,
                    token: 'Fake'
                };
                let token = JwtHelper.createSignToken(data);
                commit('SET_CURRENT_USER', token);
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
    return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
    axios.defaults.headers.common.Authorization = state.currentUser ?
        state.currentUser.token :
        ''
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}