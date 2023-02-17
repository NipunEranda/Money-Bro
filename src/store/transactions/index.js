import index from '..';
import helper from '@/mixin/helper';

const getDefaultState = () => {
    return {
        expenses: [],
        icomes: []
    }
}

export default {
    state() {
        return getDefaultState();
    },
    getters: {
        async getExpenses(state) {
            try {
                const response = await axios.get('/.netlify/functions/transaction/expenses/get', {
                    headers: { Authroization: `bearer ${index.state.auth.currentUser.token.toString()}` },
                });
                state.expenses = response.data.data;
            } catch (e) {
                console.log(e);
            }
            return state.expenses;
        },
        async getIncomes(state) {
            try {
                const response = await axios.get('/.netlify/functions/transaction/incomes/get', {
                    headers: { Authroization: `bearer ${index.state.auth.currentUser.token.toString()}` },
                });
                state.icomes = response.data.data;
            } catch (e) {
                console.log(e);
            }
            return state.icomes;
        },
    },
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        setExpenses(state, data) {
            state.expenses = data;
        },
        setIncomes(state, data) {
            state.incomes = data;
        },
    },
    actions: {
        resetState({ commit }) {
            commit('resetState')
        },
        async addExpense(context, data) {
            try {
                const response = await axios.post('/.netlify/functions/transaction/expenses/add', data, {
                    headers: { Authroization: `bearer ${index.state.auth.currentUser.token.toString()}` },
                });
                context.commit("setExpenses", response.data.data.expenses);
                return response.data;
            } catch (e) {
                console.log(e);
                return helper.methods.handleError(e);
            }
        },
        async deleteExpense(context, data) {
            try{
                const response = await axios.delete(`/.netlify/functions/transaction/expenses/delete?id=${data._id}`, {
                    headers: { Authroization: `bearer ${index.state.auth.currentUser.token.toString()}` },
                });
                context.commit("setExpenses", response.data.data.expenses);
                return response.data;
            } catch (e) {
                console.log(e);
                return helper.methods.handleError(e);
            }
        }
    }
}