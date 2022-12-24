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
          <router-link class="nav-item text" to="/categories"><a class="nav-link" href="#"><span
                class="me-2 d-md-none"></span> EXPENSES</a></router-link>
          <router-link class="nav-item text" to="/sale"><a class="nav-link" href="#"><span
                class="me-2 d-md-none"></span> INCOME</a></router-link>
          <router-link class="nav-item text" to="/sale"><a class="nav-link" href="#"><span
                class="me-2 d-md-none"></span> BUDGET</a></router-link>
          <router-link class="nav-item text" to="/sale"><a class="nav-link" href="#"><span
                class="me-2 d-md-none"></span> ANALYSIS</a></router-link>
          <!-- <router-link class="nav-item" to="/users"><a class="nav-link" href="#">Users</a></router-link> -->
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item text" data-bs-toggle="modal" data-bs-target="#balanceModal"><a class="nav-link" href="#"><span class="me-2 d-md-none"></span>
              BALANCE {{ user.currency }} {{ user.balance }}</a></li>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fa fa-user d-none d-md-flex"></i><label class="d-md-none"><span class="me-2 d-md-none"></span>
                  ACCOUNT</label>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#">{{ user ? user.name : "" }}</a></li>
                <li><a class="dropdown-item" aria-current="page" @click="this.$store.dispatch('logout')"
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
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="number" class="form-control form-control-sm" id="balance" placeholder="Your current balance" v-model="user.balance" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Update</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import store from "../store";
import { useStore } from "vuex";
export default {
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
    };
  },
  watch: {
    user: function () {
      if (!this.user) this.$router.push("/");
    },
  },
  methods: {
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