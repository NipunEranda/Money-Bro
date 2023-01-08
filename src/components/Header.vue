<template>
    <div class="flex-container">
        <div class="row nav p-0 m-0">
            <div class="col col-6 title">
                <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                <span class="text" style="letter-spacing: 8px"> MONEYBRO</span>
            </div>
            <div class="col col-6 title pointer" style="text-align: right;">
                <span data-bs-toggle="modal" data-bs-target="#balanceModal" @click="modalOpen()"> {{
                    formatToCurrency(user.balance, user.currency)
                }}</span>
            </div>
        </div>


        <!-- Modal -->
        <div class="modal fade" id="balanceModal" tabindex="-1" aria-labelledby="balanceModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="balanceModalLabel">Update Balance</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="ModalClear()"></button>
                    </div>
                    <div class="modal-body">
                        <label for="name" class="fieldLabel">Currency</label>
                        <input type="text" class="form-control form-control-sm fieldInput" id="currency"
                            placeholder="Your currency Eg: USD, EUR, JPY, LKR" v-model="user.currency" />

                        <label for="name" class="fieldLabel">Amount</label>
                        <input type="number" class="form-control form-control-sm fieldInput" id="balance"
                            placeholder="Your current balance" v-model="user.balance" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="ModalClear()">Close</button>
                        <button type="button" class="btn btn-primary" @click="ModalOperation()">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
.nav {
    background-color: #212529 !important;
    color: white;
}

.text {
    /*font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
    font-family: 'Roboto', sans-serif;
    font-weight: bolder;
    font-style: normal;
}

.title {
    padding: 15px 15px;
}

.balance {
    vertical-align: middle;
}
</style>

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
            store.dispatch("updateUserBalance", this.user.balance);
            $('#balanceModal').modal("hide");
        },
        formatToCurrency: function (amount, currency) {
            return utils.currencyFormatter(amount, currency);
        }
    },
};
</script>