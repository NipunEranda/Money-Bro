import index from '..';
import helper from '@/mixin/helper';

const getDefaultState = () => {
    return {
        Accounts: [],
    }
}

export default {
    state() {
        return getDefaultState();
    },
    getters: {
        async getAccounts(state) {
            try {
                const response = await axios.get('/.netlify/functions/account/get', {
                    headers: { Authroization: `bearer ${index.state.auth.currentUser.token.toString()}` },
                });
                state.Accounts = response.data.data;
            } catch (e) {
                console.log(e);
            }
            return state.Accounts;
        },
    },
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        addAccount(state, data) {
            //Operation
        },
        updateAccount(state, data) {
            //Operation
        },
        deleteAccount(state, data) {
            //Operation
        },
    },
    actions: {
        resetState({ commit }) {
            commit('resetState')
        },
        async addAccount({ }, data) {
            //context.commit("addAccount", data);
            try {
                const response = await axios.post('/.netlify/functions/account/add', data, {
                    headers: { Authroization: `bearer ${index.state.auth.currentUser.token.toString()}` },
                });
                return response.data;
            } catch (e) {
                console.log(e);
                return helper.methods.handleError(e);
            }
        },
        updateAccount(context, data) {
            context.commit("updateAccount", data);
        },
        deleteAccount(context, data) {
            context.commit("deleteAccount", data);
        },
    }
}