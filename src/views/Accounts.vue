<template>
    <div>
        <div class="row operations p-0 m-0 mt-2">
            <div class="col col-10 pe-0">
                <input class="form-control form-control-sm" type="text" name="search" id="search"
                    placeholder=" &#x1F50E; search..." />
            </div>
            <div class="col col-2">
                <button class="btn btn-sm btn-primary w-100" @click="modalOpen('add')">
                    <span>
                        <font-awesome-icon icon="fa-plus" class="me-1" /><span class="d-none d-sm-inline">Add</span>
                    </span>
                </button>
            </div>
        </div>

        <div class="accounts mt-2">
            <div class="row p-0 m-0">
                <div class="col col-6" v-for="account in accounts" :key="account.id">
                    <!-- <label v-text="account"></label> -->
                    <div class="accountCard mb-3">
                        <div class="accountName">
                            <!-- <span style="font-size: 30px;"><font-awesome-icon :icon="user.accountTypes.filter(at => at.id == account.accountType)[0].icon" /></span> -->
                            <div class="mb-2" v-text="account.name"></div>
                            <div v-text="account.number" ></div>
                        </div>
                        <div class="accountAmount">
                            <span><span style="vertical-align:middle" v-text="formatToCurrency(account.amount, user.currency)"></span><button style="float: right;vertical-align:middle;" class="btn btn-sm btn-danger" @click="ModalOperation('delete')">Delete</button></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="accountsModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header unselectable">
                        <h5 class="modal-title" id="accountsModalLabel">Add Account</h5>
                        <span class="pointer" data-bs-dismiss="modal" aria-label="Close"><font-awesome-icon
                                icon="fa-close" /></span>
                    </div>
                    <div class="modal-body">
                        <!-- Account Name -->
                        <label for="name" class="fieldLabel">Name</label>
                        <input type="text" class="form-control form-control-sm fieldInput" id="currency"
                            placeholder="Saving Account" v-model="account.name" />

                        <label for="name" class="fieldLabel">Account Number</label>
                        <input type="text" class="form-control form-control-sm fieldInput" placeholder="xxxx xxxx xxxx xxxx" v-model="formattedAccountNumber" @input="formatAccountNumber($event)" maxlength="19">

                        <!-- Account type -->
                        <label for="name" class="fieldLabel">Account Type</label>
                        <select class="form-control form-control-sm" v-model="account.accountType">
                            <option value="0">Select an option</option>
                            <option v-for="(accountType, a) in this.user.accountTypes" :value="accountType.id" :key="a"
                                v-text="accountType.name"></option>
                        </select>

                        <!-- Initial Amount in account -->
                        <label for="name" class="fieldLabel">Initial Amount</label>
                        <input type="number" class="form-control form-control-sm fieldInput" id="currency"
                            placeholder="Amount" v-model="account.amount" />

                    </div>
                    <div class="modal-footer pt-1 pb-1">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-sm btn-primary" @click="ModalOperation()">Add</button>
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
            accounts: [],
            formattedAccountNumber: '',
            account: {
                name: '',
                number: '',
                accountType: 0,
                amount: 0,
            },
            modalOperation: 'add',
        };
    },
    methods: {
        modalOpen: function (operation) {
            this.modalOperation = operation;
            this.account = { name: '', accountType: 0, amount: 0 };
            $('#accountsModal').modal("show");
        },
        ModalOperation: async function (mode) {
            if(mode){
                if(this.modalOperation == 'add'){
                    this.account.number = this.formattedAccountNumber;
                    const response = await store.dispatch("addAccount", this.account);
                    this.accounts = response.data.accounts;
                    await store.dispatch("updateUserBalance", response.data.user.balance);
                }
            }else if(mode == 'delete'){
                const response = await store.dispatch("deleteAccount", this.account);
            }
            $('#accountsModal').modal("hide");
        },
        formatAccountNumber: function(event){
            if(event.inputType != 'deleteContentBackward'){
                if(this.formattedAccountNumber.replace(/\s/g, '').split("").length == 0){
                    this.formattedAccountNumber = '';
                    this.account.number = '';
                }else{
                    this.account.number = this.formattedAccountNumber.replace(/\s/g, '');
                    if(Number.isInteger(this.account.number.split("").length / 4)){
                        if(this.formattedAccountNumber.split("").length != 19)
                        this.formattedAccountNumber += " ";
                    }
                }
            }
        },
        formatToCurrency: function (amount, currency) {
            return utils.currencyFormatter(amount, currency);
        }
    },
    mounted: async function () {
        this.accounts = await store.getters.getAccounts;
        console.log(this.accounts);
    }
};
</script>

<style scoped>

    .accountCard{
        border: 1px solid #f7f7f7;
    }

    .accountCard .accountName{
        padding: 20px;
        background-color: #ebebeb;
        border-radius: 10px 10px 0 0;
    }

    .accountCard .accountAmount{
        padding: 10px;
        background-color: #f7f7f7;
        border-radius: 0 0 10px 10px;
    }

</style>