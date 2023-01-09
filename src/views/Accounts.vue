<template>
    <div>
        <div class="row operations p-0 m-0 mt-2">
            <div class="col col-10 pe-0">
                <input class="form-control form-control-sm" type="text" name="search" id="search"
                    placeholder=" &#x1F50E; search..." />
            </div>
            <div class="col col-2">
                <button class="btn btn-sm btn-primary w-100" @click="modalOpen()">
                    <span>
                        <font-awesome-icon icon="fa-plus" class="me-1" /><span class="d-none d-sm-inline">Add</span>
                    </span>
                </button>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="accountsModal" tabindex="-1" >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header unselectable">
                        <h5 class="modal-title" id="accountsModalLabel">Add Account</h5>
                        <span class="pointer" data-bs-dismiss="modal" aria-label="Close"><font-awesome-icon icon="fa-close" /></span>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer pt-1 pb-1">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" >Close</button>
                        <button type="button" class="btn btn-sm btn-primary" @click="ModalOperation()">Update</button>
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
        };
    },
    methods: {
        modalOpen: function () {
            $('#accountsModal').modal("show");
        },
        ModalOperation: async function () {
        },
    },
};
</script>
