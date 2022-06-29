<template>
  <div>
    <div class="row p-0 m-0">
      <button class="btn btn-primary btn-sm mr-2 pointer" data-toggle="modal" data-target="#homeModal" @click="addExpenseModal()">Add Expense</button>
      <button class="btn btn-primary btn-sm pointer" data-toggle="modal" data-target="#homeModal" @click="addIncomeModal()">Add Income</button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="homeModal" tabindex="-1" role="dialog" aria-labelledby="homeModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="homeModalTitle"></h5>
            <button type="button" class="close pointer" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="homeModalBody p-3">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary pointer" data-dismiss="modal">Cancel</button>
            <button type="button" id="saveBtn" class="btn btn-primary pointer" @click="save()"
              data-dismiss="modal">Save</button>
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

export default {
  name: 'Home',
  data() {
    return {
      store: useStore(),
      newExpense: {},
      newIncome: {},
      modalComponent: 'expense',
      modalType: 'add'
    };
  },
  methods: {
    save: function(){

    }
  },
  mounted: function () {
  }
}
</script>
