<template>
    <div class="sidebar">
        <router-link class="text" to="/home">
            <div class="title w-100 pointer unselectable">
                <img src="../assets/logo.png" width="40" height="40" class="d-inline-block align-top" alt="" />
                <span class="ms-2">MONEYBRO</span>
                <div class="mt-2" style="font-size: 16px;letter-spacing: 0;" @click="modalOpen($event)">{{ formatToCurrency(user.balance, user.currency) }}</div>
            </div>
        </router-link>
        <router-link class="text" to="/expenses">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon icon="fa-wallet" /></span><span>EXPENSES</span>
            </div>
        </router-link>
        <router-link class="text" to="/income">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon
                        icon="fa-circle-dollar-to-slot" /></span><span>INCOME</span>
            </div>
        </router-link>
        <router-link class="text" to="/analysis">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon
                        icon="fa fa-line-chart" /></span><span>ANALYSIS</span>
            </div>
        </router-link>
        <router-link class="text" to="/accounts">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon
                        icon="fa-credit-card" /></span><span>ACCOUNTS</span>
            </div>
        </router-link>
        <router-link class="text" to="/user">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon icon="fa-user-tie" /></span><span>USER</span>
            </div>
        </router-link>
        <div class="sidebar_item unselectable sidebar_end" @click="this.$store.dispatch('logout')">
            <span class="me-2 large-font-size"><font-awesome-icon icon="fa-power-off" /></span><span>LOGOUT</span>
        </div>

            <!-- Modal -->
        <div class="modal fade" id="balanceModalSideBar" tabindex="-1" aria-labelledby="balanceModalSideBarLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header unselectable">
                        <h5 class="modal-title" id="balanceModalSideBarLabel">Update Balance</h5>
                        <span class="pointer" data-bs-dismiss="modal" aria-label="Close" @click="ModalClear()"><font-awesome-icon icon="fa-close" /></span>
                    </div>
                    <div class="modal-body">
                        <!-- Currency Type -->
                        <label for="name" class="fieldLabel">Currency</label>
                        <input type="text" class="form-control form-control-sm fieldInput" id="currency"
                                placeholder="Your currency Eg: USD, EUR, JPY, LKR" v-model="user.currency" />

                        <!-- Complete Amount -->
                        <label for="name" class="fieldLabel">Amount</label>
                        <input type="number" class="form-control form-control-sm fieldInput" id="balance"
                            placeholder="Your current balance" v-model="user.balance" />
                    </div>
                    <div class="modal-footer pt-1 pb-1">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"
                            @click="ModalClear()">Close</button>
                        <button type="button" class="btn btn-sm btn-primary" @click="ModalOperation()">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";
import { useStore } from "vuex";
import utils from "../utils";
export default {
    data() {
        return {
            store: useStore(),
            user: store.getters.getCurrentUser,
            tempBalance: 0,
        };
    },
    watch: {
        user: function () {
            if (!this.user) this.$router.push("/");
        },
    },
    methods: {
        modalOpen: function (event) {
            event.preventDefault();
            this.tempBalance = this.user.balance;
            $('#balanceModalSideBar').modal("show");
        },
        ModalClear: function () {
            this.user.balance = this.tempBalance;
        },
        ModalOperation: async function () {
            await axios.put(`/.netlify/functions/user/balance`, { balance: this.user.balance, currency: this.user.currency }, {
                headers: { Authroization: `bearer ${this.user.token.toString()}` },
            });
            store.dispatch("updateUserBalance", this.user.balance);
            $('#balanceModalSideBar').modal("hide");
        },
        formatToCurrency: function (amount, currency) {
            return utils.currencyFormatter(amount, currency);
        },
    }
}
</script>

<style scoped>
.sidebar {
    width: 350px;
    position: absolute;
    bottom: 0;
    top: 0;
    background-color: #212529 !important;
    color: white;
    height: 100vh;
}

.title {
    padding: 15px;
    letter-spacing: 8px;
    font-weight: 600;
    font-size: 25px;
    text-align: center;
}

.text {
    text-decoration: none;
    color: white;
}

.sidebar_item {
    padding: 25px;
    width: 100%;
    font-weight: 600;
}

.sidebar_item:hover {
    cursor: pointer;
    background-color: white;
    color: #2e2e2e;
    transition: 0.3s;
}

.sidebar_end {
    position: absolute;
    width: 100%;
    bottom: 0;
}

#balanceModalSideBar{
    color: black;
}

@media only screen and (max-width: 992px) {
    .sidebar {
        display: none;
    }
}
</style>
