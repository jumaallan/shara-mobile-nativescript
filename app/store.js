import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import * as ApplicationSettings from "tns-core-modules/application-settings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    token: ApplicationSettings.getString("token") || ""
  },
  getters: {
    isLoggedIn: state => !!state.token
  },
  mutations: {
    loginUser(state, token) {
      ApplicationSettings.setString("token", token);
      state.token = token
    },
    logoutUser(state) {
      ApplicationSettings.remove("token");
      state.token = ""
    }
  },
  actions: {
    loginUser(context, token) {
      context.commit('loginUser', token)
    },
    logoutUser(context) {
      context.commit('logoutUser')
    }
  }
});
