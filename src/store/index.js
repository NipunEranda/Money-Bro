import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import util from '../utils';
const store = createStore({
  state() {
    return {
      balance: "0",
      currency: 'LKR',
      expenses: {
        types:
          [
            { id: 1, name: 'Food' },
            { id: 2, name: 'Travel' },
            { id: 3, name: 'Bills' },
            { id: 4, name: 'Education' },
            { id: 5, name: 'Office' },
            { id: 6, name: 'Gift' }
          ],
        list: []
      },
      incomes: {
        types:
          [
            { id: 1, name: 'Salary' },
            { id: 2, name: 'Gift' },
            { id: 3, name: 'Refunds' }
          ],
        list: []
      },
    }
  },
  getters: {
    getBalance(state) {
      return state.balance;
    },
    getCurrency(state) {
      return state.currency;
    },
    getExpenseTypes(state) {
      return state.expenses.types;
    },
    getIncomeTypes(state) {
      return state.incomes.types;
    },
    getExpenses(state) {
      return state.expenses.list;
    },
    getIncomes(state) {
      return state.incomes.list;
    }
  },
  mutations: {
    updateBalance(state, data) {
      state.balance = data;
    },
    updateCurrency(state, data) {
      state.balance = data;
    },
    updateExpenseTypes(state, data) {
      state.expenses.types = [...data];
    },
    updateIncomeTypes(state, data) {
      state.incomes.types = [...data];
    },
    updateExpenses(state, data) {
      state.expenses.list = [...data];
    },
    updateIncomes(state, data) {
      state.incomes.list = [...data];
    },
    addExpenseType(state, data) {
      state.expenses.types.push(data);
    },
    addIncomeType(state, data) {
      state.incomes.types.push(data);
    },
    addExpense(state, data) {
      state.balance = util.convertPrice(Number(state.balance.split(",").join("")) - Number(data.cost.split(",").join("")));
      if(data)
        state.expenses.list.push(data);
    },
    updateExpense(state, data){
      state.balance = util.convertPrice(Number(state.balance.split(",").join("")) + Number(state.expenses.list[data.id].cost.split(",").join("")));
      state.balance = util.convertPrice(Number(state.balance.split(",").join("")) - Number(data.cost.split(",").join("")));
      if(data)
        state.expenses.list[data.id] = { type: data.type, cost: data.cost, date: data.date };
    },
    removeExpense(state, data){
      state.balance = util.convertPrice(Number(state.balance.split(",").join("")) + Number(data.cost.split(",").join("")));
      if(data)
        state.expenses.list = data;
    },
    addIncome(state, data) {
      state.balance = Number(state.balance) + Number(data.value);
      if(data)
        state.incomes.list.push(data);
    }
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
    },
    updateExpenseTypes(context, data) {
      context.commit("updateExpenseTypes", data);
    },
    updateIncomeTypes(context, data) {
      context.commit("updateIncomeTypes", data);
    },
    updateExpenses(context, data) {
      context.commit("updateExpenses", data);
    },
    updateIncomes(context, data) {
      context.commit("updateIncomes", data);
    },
    addExpenseType(context, data) {
      context.commit("addExpenseType", data);
    },
    addIncomeType(state, data) {
      context.commit("addIncomeType", data);
    },
    addExpense(context, data) {
      context.commit("addExpense", data);
    },
    updateExpense(context, data) {
      context.commit("updateExpense", data);
    },
    removeExpense(context, data) {
      context.commit("removeExpense", data);
    },
    addIncome(state, data) {
      context.commit("addIncome", data);
    }
  },
  plugins: [createPersistedState()]

});

export default store;