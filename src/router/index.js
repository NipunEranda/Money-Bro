import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Index from '../views/Index.vue';
import Income from '../views/Income.vue';
import Expenses from '../views/Expenses.vue';
import Analysis from '../views/Analysis.vue';
import Accounts from '../views/Accounts.vue';
import Settings from '../views/Settings.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: Expenses
  },
  {
    path: '/income',
    name: 'income',
    component: Income
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: Analysis
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  if(!store.state.auth.currentUser && to.name !== "index" || (!axios.defaults.headers.common['Authorization'] && to.name !== "index"))
    return '/';
});

export default router;
