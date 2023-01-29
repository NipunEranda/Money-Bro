<template>
    <div class="flex-container">
        <div class="row operations p-0 m-0 mt-2">
            <div class="col col-10 pe-0">
                <input class="form-control form-control-sm" type="text" name="search" id="search"
                    placeholder=" &#x1F50E; search..." />
            </div>
            <div class="col col-2">
                <button class="btn btn-sm btn-primary w-100" @click="addTransaction()">
                    <span>
                        <font-awesome-icon icon="fa-plus" class="me-1" /><span class="d-none d-sm-inline">Add</span>
                    </span>
                </button>
            </div>
        </div>

        <div class="expenses mt-2 p-3">
            <Transaction v-for="(transaction, i) in transactions" :key="i" :transaction="transaction"
                :editTransaction="editTransaction" :removeTransaction="removeTransaction" :user="user._id" />
        </div>

        <!-- Modal -->
        <div class="modal fade" id="transactionModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered"
                :class="{ 'modal-md': modalOperation == 'delete', 'modal-lg': !(modalOperation == 'delete') }">
                <div class="modal-content">
                    <div class="modal-header unselectable">
                        <h5 class="modal-title" id="transactionModalLabel"></h5>
                        <span class="pointer" data-bs-dismiss="modal" aria-label="Close"><font-awesome-icon
                                icon="fa-close" /></span>
                    </div>
                    <div class="modal-body">
                        <div v-if="modalOperation == 'add' || modalOperation == 'edit'">
                            <!-- Transaction Name -->
                            <label for="name" class="fieldLabel">Name</label>
                            <input type="text" class="form-control form-control-sm fieldInput" id="name"
                                placeholder="Expense Name" v-model="transaction.name" />

                            <!-- Transaction Type -->
                            <label for="type" class="fieldLabel">Type</label>
                            <select id="type" class="form-control form-control-sm fieldInput"
                                v-model="transaction.type">
                                <option value="0">Select an option</option>
                                <option v-for="(expenseType, e) in this.user.expenseTypes" :value="expenseType._id"
                                    :key="e" v-text="expenseType.name"></option>
                            </select>

                            <!-- Transaction Account -->
                            <label for="type" class="fieldLabel">Account</label>
                            <select id="type" class="form-control form-control-sm fieldInput"
                                v-model="transaction.account">
                                <option value="0">Select an option</option>
                                <option v-for="(account, a) in accounts" :value="account._id" :key="a"
                                    v-text="account.name + ' - (' + formatToCurrency(account.amount, this.user.currency) + ')'">
                                </option>
                            </select>

                            <!-- Transaction amount -->
                            <label for="amount" class="fieldLabel">Amount</label>
                            <input type="text" class="form-control form-control-sm fieldInput" id="amount"
                                placeholder="Amount" v-model="transaction.amount" />
                        </div>
                        <div v-if="modalOperation == 'delete'"
                            v-text="'Are you sure, you want to remove ' + transaction.name + ' transaction?'">
                        </div>
                    </div>
                    <div class="modal-footer pt-1 pb-1">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="transactionModalActionBtn" type="button" class="btn btn-sm btn-primary"
                            @click="modalOperationFunction()">Add</button>
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
import Transaction from '../components/Transaction.vue';
export default {
    data() {
        return {
            store: useStore(),
            user: store.getters.getCurrentUser,
            modalOperation: 'add',
            transactions: [
                {
                    _id: 1,
                    name: 'Bill',
                    type: 2,
                    amount: 1000,
                    created: '2022-01-01'
                },
                {
                    _id: 2,
                    name: 'Bill',
                    type: 2,
                    amount: 1000,
                    created: '2022-12-31'
                }
            ],
            transaction: {
                name: '',
                account: 0,
                type: 0,
                amount: 0
            },
            accounts: [],
        }
    },
    methods: {
        addTransaction: function () {
            this.modalOperation = 'add';
            $('#transactionModalLabel').text('Add Expense');
            $('#transactionModalActionBtn').removeClass("btn-danger").addClass("btn-primary").text("Add");
            $('#transactionModal').modal("show");
        },
        editTransaction: function (id) {
            this.transaction = this.transactions.filter(t => t._id == id)[0];
            this.modalOperation = 'edit';
            $('#transactionModalLabel').text('Edit Expense');
            $('#transactionModalActionBtn').removeClass("btn-danger").addClass("btn-primary").text("Edit");
            $('#transactionModal').modal("show");
        },
        removeTransaction: function (id) {
            this.transaction = this.transactions.filter(t => t._id == id)[0];
            this.modalOperation = 'delete';
            $('#transactionModalLabel').text('Remove Expense');
            $('#transactionModalActionBtn').removeClass("btn-primary").addClass("btn-danger").text("Delete");
            $('#transactionModal').modal("show");
        },
        modalOperationFunction: async function (id, modalOperation) {
            console.log(id, modalOperation);
        },
        formatToCurrency: function (amount, currency) {
            return utils.currencyFormatter(amount, currency);
        }
    },
    mounted: async function () {
        this.accounts = await store.getters.getAccounts;
        console.log(this.accounts);
    },
    components: {
        Transaction
    }
}

</script>