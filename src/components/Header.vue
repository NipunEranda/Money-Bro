<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="nav-item" to="/"><a class="nav-link" href="#">
          <img src="../assets/logo.png" width="30" height="30" alt="">
        </a></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link class="nav-item" to="/expense"><a class="nav-link" href="#">Expense</a></router-link>
          <router-link class="nav-item" to="/income"><a class="nav-link" href="#">Income</a></router-link>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" data-toggle="modal" data-target="#navModal" @click="updateBalance()">
            <a class="nav-link" href="#" id="balance">{{ newBalance }} {{ newCurrency }}</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="navModal" tabindex="-1" role="dialog" aria-labelledby="navModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="navModalTitle"></h5>
            <button type="button" class="close pointer" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body navModalBody">
            <div class="form-group m-0">
              <input type="text" id="currentBalance" class="form-control" v-model="newBalance" @keyup="NewBalance()" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary pointer" data-dismiss="modal">Cancel</button>
            <button type="button" id="balanceSaveBtn" class="btn btn-primary pointer" @click="save()" data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
import { computed } from 'vue';
import { useStore } from "vuex";
import util from '../utils';
export default {
  data() {
    return {
      store: useStore(),
      newBalance: 0,
      newCurrency: ''
    };
  },
  methods: {
    updateBalance: function () {
      if (this.newBalance == 0) {
        $('#navModalTitle').text('Initialize Balance');
        $('#balanceSaveBtn').text('Save');
      }else{
        $('#navModalTitle').text('Update Balance');
        $('#balanceSaveBtn').text('Update');
      }
    },
    save: function(){
      store.dispatch("updateBalance", this.newBalance);
    },
    NewBalance: function(){
      this.newBalance = util.convertPrice(this.newBalance.split(',').join(''));
    }
  },
  mounted: function () {
     this.newCurrency = store.getters.getCurrency;
     this.newBalance = store.getters.getBalance;
  }
};
</script>

<style>
.nav-item {
  text-decoration: none !important;
}
</style>