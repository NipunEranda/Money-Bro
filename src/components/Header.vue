<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark ps-0 pe-0">
            <div class="container-fluid">
                <router-link class="navbar-brand text" href="#" to="/home" style="letter-spacing: 8px">
                    <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <span class="ms-2 d-none d-sm-inline d-lg-inline">MONEYBRO</span>
                </router-link>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item" data-bs-toggle="modal" data-bs-target="#balanceModal" @click="modalOpen()">
                        <a class="nav-link text" href="#"><span class="me-2 d-md-none"></span>
                            {{ formatToCurrency(user.balance, user.currency) }}</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Modal -->
        <div class="modal fade" id="balanceModal" tabindex="-1" aria-labelledby="balanceModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header unselectable">
                        <h5 class="modal-title" id="balanceModalLabel">Update Balance</h5>
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
        modalOpen: function () {
            this.tempBalance = this.user.balance;
        },
        ModalClear: function () {
            this.user.balance = this.tempBalance;
        },
        ModalOperation: async function () {
            await axios.put(`/.netlify/functions/user/balance`, { balance: this.user.balance, currency: this.user.currency }, {
                headers: { Authroization: `bearer ${this.user.token.toString()}` },
            });
            store.dispatch("updateUserBalanceCurrency", this.user);
            $('#balanceModal').modal("hide");
        },
        formatToCurrency: function (amount, currency) {
            return utils.currencyFormatter(amount, currency);
        }
    },
};
</script>

<style scoped>
.text {
    /*font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-style: normal;
}

.nav-item {
    text-decoration: none !important;
}

.navbar-brand {
    font-weight: bolder;
}
</style>