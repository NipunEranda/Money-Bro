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
                const response = await axios.get('/.netlify/functions/account/get');
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
        setAccounts(state, data) {
            state.Accounts = data;
        },
    },
    actions: {
        resetState({ commit }) {
            commit('resetState')
        },
        async addAccount(context, data) {
            try {
                const response = await axios.post('/.netlify/functions/account/add', data);
                context.commit("setAccounts", response.data.data.Accounts);
                return response.data;
            } catch (e) {
                console.log(e);
                return helper.methods.handleError(e);
            }
        },
        async updateAccount(context, data) {
            try {
                const response = await axios.put('/.netlify/functions/account/update', data);
                console.log(response);
                context.commit("setAccounts", response.data.data.Accounts);
                return response.data;
            } catch (e) {
                console.log(e);
                return helper.methods.handleError(e);
            }
        },
        async deleteAccount(context, data) {
            try {
                const response = await axios.delete(`/.netlify/functions/account/delete?id=${data._id}`);
                context.commit("setAccounts", response.data.data.Accounts);
                return response.data;
            } catch (e) {
                console.log(e);
                return helper.methods.handleError(e);
            }
        },
    }
}