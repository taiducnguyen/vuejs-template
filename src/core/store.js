import Vue from "vue";
import Vuex from "vuex";

import auth from "../core/auth";
import home from "../modules/home/home";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        home,
    }
});