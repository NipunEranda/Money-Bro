<template>
    <div class="transaction">
        <div class="card mb-3 pointer">
            <div class="card-body">
                <div class="d-flex flex-start">
                    <div class="w-100">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h6 class="text-primary fw-bold mb-0" v-text="transaction.name"></h6>
                            <div>
                                <i class="pointer text-secondary me-2 small-font-size" @click="editTransaction(transaction._id)"><font-awesome-icon icon="fa-pen" /></i>
                                <i class="small pointer text-secondary" @click="removeTransaction(transaction._id)"><font-awesome-icon icon="fa-times" /></i>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="small mb-0 small-font-size">{{ formatDate(transaction.created) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helper from '../mixin/helper';
export default {
    data() {
        return {
            count: 0,
        };
    },
    props: {
        transaction: Object,
        editTransaction: { type: Function },
        removeTransaction: { type: Function },
        user: Number
    },
    methods: {
        formatDate: function (date) {
            return helper.methods.convertDateString(date);
        }
    }
};
</script>


<style scoped>
.link-grey {
    color: #aaa;
}

.link-grey:hover {
    color: #00913b;
}

.card-body {
    background-color: rgb(241, 241, 241);
    border-radius: 0.5rem;
}

.card {
    border: none;
    border-radius: 0;
}
</style>