import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import auth from './auth';
import accounts from './accounts';
import router from '@/router';

const store = createStore({
    modules: {
        auth: auth,
        accounts: accounts,
    },
    plugins: [createPersistedState()],
    actions: {
        logout(){
            this.commit('resetState');
            router.push("/");
        },
    },
});

export default store;