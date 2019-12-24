/** State Definition */
const state = {
    profile: {}
};

/** Getters - Return State */
const getters = {
    profile(state) {
        return state.profile;
    },
}

/** Mutations - Synchronous */
const mutations = {
    ["UPDATE"](state, profile) {
        state.profile = profile;
    }
};


/** Actions - Asynchronous */
const actions = {
    getProfile({ commit }, { userName }) {
        // service.rest("get").then((data) => {
        //     commit("UPDATE", data);
        // }).catch((err) => {
        //     toastr.error(err.message);
        // });
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