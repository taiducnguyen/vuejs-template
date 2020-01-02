import Vue from "vue";
import Vuex from "vuex";

import auth from "../core/auth";
import home from "../modules/home/home";
import layout from "../modules/_layouts/layout";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        home,
        layout
    }
});