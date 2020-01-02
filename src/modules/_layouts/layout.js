import Service from "../../core/service";
import { ApiUrl } from "../../core/api-url";
let service = new Service('home', this);
/** State Definition */
const state = {
    expandedSidebar: false,
};

/** Getters - Return State */
const getters = {
    sideBarState(state) {
        return state.expandedSidebar;
    },
}

/** Mutations - Synchronous */
const mutations = {
    ["TOGGLE_SIDEBAR"](state) {
        state.expandedSidebar = !state.expandedSidebar;
    },
};


/** Actions - Asynchronous */
const actions = {
    toggleSidebar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
};


/** Private helpers */

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};