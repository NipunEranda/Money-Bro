<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark ps-0 pe-0">
    <div class="container-fluid">
      <router-link class="navbar-brand text" href="#" to="/home" style="letter-spacing: 8px">
        <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="" />
        MONEYBRO
      </router-link>
      <button class="navbar-toggler fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <router-link class="nav-item text" to="/budget"><a class="nav-link" href="#"><span
                class="me-2 d-md-none"></span> BUDGET</a></router-link>
          <router-link class="nav-item text" to="/analysis"><a class="nav-link" href="#"><span
                class="me-2 d-md-none"></span> ANALYSIS</a></router-link>
          <!-- <router-link class="nav-item" to="/users"><a class="nav-link" href="#">Users</a></router-link> -->
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" data-bs-toggle="modal" data-bs-target="#balanceModal" @click="modalOpen()"><a
              class="nav-link text" href="#"><span class="me-2 d-md-none"></span>
              {{ formatToCurrency(user.balance, user.currency) }}</a></li>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fa fa-user d-none d-md-flex"></i><label class="d-md-none text"><span
                    class="me-2 d-md-none"></span>
                  ACCOUNT</label>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item text" href="#">{{ user ? user.name : "" }}</a></li>
                <li><a class="dropdown-item text" aria-current="page" @click="this.$store.dispatch('logout')"
                    style="cursor: pointer">Logout</a></li>
              </ul>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </nav>

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
          <input type="text" class="form-control form-control-sm fieldInput"  id="currency" placeholder="Your currency Eg: USD, EUR, JPY, LKR" v-model="user.currency" />

          <label for="name" class="fieldLabel">Amount</label>
          <input type="number" class="form-control form-control-sm fieldInput" id="balance" placeholder="Your current balance"
            v-model="user.balance" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="ModalClear()">Close</button>
          <button type="button" class="btn btn-primary" @click="ModalOperation()">Update</button>
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
      await axios.put(`/.netlify/functions/user/balance`, {balance: this.user.balance, currency: this.user.currency}, {
        headers: { Authroization: `bearer ${this.user.token.toString()}` },
      });
      store.dispatch("updateUserBalance", this.user.balance);
      $('#balanceModal').modal("hide");
    },
    formatToCurrency: function(amount, currency){
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