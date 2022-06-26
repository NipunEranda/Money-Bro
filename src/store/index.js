import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
const store = createStore({
  state() {
    return {
      currentUser: null,
      balance: "0",
      currency: 'LKR'
    }
  },
  getters: {

  },
  mutations: {
    updateCurrentUser(state, data) {
      state.currentUser = { ...data };
    },
    updateBalance(state, data){
      state.balance = data;
    },
    updateCurrency(state, data){
      state.balance = data;
    },
  },
  actions: {
    updateCurrentUser(context, data) {
      context.commit("updateCurrentUser", data);
    },
    updateBalance(context, data) {
      context.commit("updateBalance", data);
    },
    updateCurrency(context, data) {
      context.commit("updateCurrency", data);
    }
  },
  plugins: [createPersistedState()]

});

export default store;