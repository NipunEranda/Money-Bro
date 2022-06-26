import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Expense from '../views/Expense.vue';
import Income from '../views/Income.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/expense',
    name: 'expense',
    component: Expense
  },
  {
    path: '/income',
    name: 'income',
    component: Income
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
