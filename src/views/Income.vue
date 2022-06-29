<template>
  <div>
    <div class="row p-0 m-0">
      <button class="btn btn-primary btn-sm pointer" data-toggle="modal" data-target="#incomeModal" @click="addIncomeModal()">Add Income</button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="incomeModal" tabindex="-1" role="dialog" aria-labelledby="incomeModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="incomeModalTitle"></h5>
            <button type="button" class="close pointer" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="incomeModalBody p-3">
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
      newIncome: {},
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
