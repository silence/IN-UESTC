/**
 * @file index.js
*/

import Vue from "vue";
import Vuex from "vuex";
// import http from "../http";

Vue.use(Vuex);

// modules
import user from "./user";

export default new Vuex.Store({
  state: {
    code: ""
  },
  modules: {
    user
  },
  getters: {

  },
  mutations: {
    
  },
  actions: {
  }
});
