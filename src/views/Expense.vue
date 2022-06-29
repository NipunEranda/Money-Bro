<template>
  <div class="container">
    <div class="row p-0 m-0">
      <button class="btn btn-primary btn-sm mr-2 pointer" data-toggle="modal" data-target="#expenseModal"
        @click="addUpdateExpenseModal('add')">Add Expense</button>
    </div>

    <div class="row p-0 m-0 mt-3">
      <table class="table table-sm table-borderless table-hover" v-if="newExpenseList">
        <thead class="tableHead">
          <tr>
            <th>Type</th>
            <th>Cost</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(expense, e) in newExpenseList" :key="expense.id" class="pointer">
            <td v-text="expenseTypeList.filter(t => t.id == expense.type)[0].name" @click="addUpdateExpenseModal('update', expense, e)" data-toggle="modal" data-target="#expenseModal"></td>
            <td v-text="expense.cost" @click="addUpdateExpenseModal('update', expense, e)" data-toggle="modal" data-target="#expenseModal"></td>
            <td v-text="expense.date" @click="addUpdateExpenseModal('update', expense, e)" data-toggle="modal" data-target="#expenseModal"></td>
            <td class="text-right"><i class="fa fa-trash" data-toggle="modal" data-target="#actionModal"
                @click="deleteModal(expense, e)"></i></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="expenseModal" tabindex="-1" role="dialog" aria-labelledby="expenseModal"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="expenseModalTitle"></h5>
            <button type="button" class="close pointer" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="expenseModalBody p-3">

            <div class="form-group">
              <label class="form-text-name" for="expenseTypes">Expense Type</label>
              <select class="form-control form-control-sm pointer" id="expenseTypes" v-model="newExpense.type">
                <option value=0>Select an option</option>
                <option v-for="(expenseType) in expenseTypeList" :key="expenseType.id" :value="expenseType.id"
                  v-text="expenseType.name">
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-text-name" for="expenseTypes">Date</label>
              <input type="date" class="form-control form-control-sm pointer" id="expenseDate" name="expenseDate"
                v-model="newExpense.date" />
            </div>

            <div class="form-group">
              <label class="form-text-name" for="expenseTypes">Cost</label>
              <input type="text" class="form-control form-control-sm" id="cost" v-model="newExpense.cost"
                @keyup="Cost()" />
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary pointer" data-dismiss="modal">Cancel</button>
            <button type="button" id="saveBtn" class="btn btn-sm btn-primary pointer" @click="save()"
              data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Modal -->
    <div class="modal fade" id="actionModal" tabindex="-1" role="dialog" aria-labelledby="actionModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="actionModalTitle">Delete Expense</h5>
            <button type="button" class="close pointer" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="actionModalBody"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary pointer" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger pointer" data-dismiss="modal" @click="deleteExpense()">Delete</button>
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
  name: 'Home',
  data() {
    return {
      store: useStore(),
      expenseTypeList: store.getters.getExpenseTypes,
      newExpense: {
        type: 0,
        cost: '',
        date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
      },
      newExpenseList: store.getters.getExpenses,
      modalType: 'add',
      deleteIndex: 0,
    };
  },
  methods: {
    deleteModal: function (expense, e) {
      $('#actionModalTitle').text('Delete Expense');
      $('#actionModalBody').text(`Do you want to remove this ${this.expenseTypeList.filter(t => t.id == expense.type)[0].name} expense?`);
      this.deleteIndex = e;
    },
    save: function () {
      if(this.modalType == 'add'){
        store.dispatch("addExpense", this.newExpense);
        this.newExpenseList = store.getters.getExpenses;
      }else{
        store.dispatch("updateExpense", this.newExpense);
        this.newExpenseList = store.getters.getExpenses;
      }
      $('#balance').text(`${store.getters.getBalance} ${store.getters.getCurrency}`);
    },
    addUpdateExpenseModal: function (type, obj, index) {
      this.modalType = type;
      if (this.modalType == 'add') {
        this.newExpense = { type: 0, cost: '', date: `${new Date().getFullYear()}-${(new Date().getMonth() < 10) ? `0${new Date().getMonth()}` : `${new Date().getMonth()}`}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`}` };
        $('#expenseModalTitle').text('Add Expense');
        $('#saveBtn').text('Save');
      } else {
        this.newExpense = { id: index, type: obj.type, cost: obj.cost, date: obj.date };
        $('#expenseModalTitle').text('Update Expense');
        $('#saveBtn').text('Update');
      }
    },
    Cost: function () {
      this.newExpense.cost = util.convertPrice(this.newExpense.cost.split(',').join(''));
    },
    deleteExpense: function(){
      store.dispatch("removeExpense", this.newExpenseList[this.deleteIndex]);
      this.newExpenseList.splice(this.deleteIndex, 1);
      store.dispatch("updateExpenses", this.newExpenseList);
      $('#balance').text(`${store.getters.getBalance} ${store.getters.getCurrency}`);
    }
  },
}
</script>
