<template>
  <div>
    <div class="row p-0 m-0">
      <button class="btn btn-primary btn-sm mr-2 pointer">Add Expense</button>
      <button class="btn btn-primary btn-sm pointer">Add Income</button>
    </div>
  </div>
</template>

<script>
import store from '../store';
import { computed } from 'vue';
import { useStore } from "vuex";

export default {
  name: 'Home',
  data() {
    return {
      store: useStore(),
      newExpense: {},
      newIncome: {}
    };
  },
  methods: {

  },
  mounted: function(){
    console.log(this.newExpense);
    console.log(this.newIncome);
  }
}
</script>
