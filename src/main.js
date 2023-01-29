import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faWallet, faCircleDollarToSlot, faChartLine, faUserTie, faCreditCard, faSackDollar, faUser, faIdBadge, faPowerOff, faPlus, faClose, faCoins, faMoneyBill, faPiggyBank, faBuildingColumns, faVault, faPen, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';

library.add(faWallet, faCircleDollarToSlot, faChartLine, faUserTie, faCreditCard, faSackDollar, faUser, faIdBadge, faPowerOff, faPlus, faClose, faCoins, faMoneyBill, faPiggyBank, faBuildingColumns, faVault, faPen, faTimes, faHome);

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
