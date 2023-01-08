<template>
    <div class="sidebar">
        <div class="title w-100">
            <img src="../assets/logo.png" width="25" height="25" class="d-inline-block align-top" alt="" />
            <span class="d-none d-sm-none d-md-none d-lg-inline ms-2">MONEYBRO</span>
        </div>
        <div class="sidebar_item">
            <span class="me-2 large-font-size"><font-awesome-icon icon="fa-wallet" /></span><span class="d-none d-sm-none d-md-none d-lg-inline">EXPENSES</span>
        </div>
        <div class="sidebar_item">
            <span class="me-2 large-font-size"><font-awesome-icon icon="fa-circle-dollar-to-slot" /></span><span class="d-none d-sm-none d-md-none d-lg-inline">INCOME</span>
        </div>
        <div class="sidebar_item">
            <span class="me-2 large-font-size"><font-awesome-icon icon="fa fa-line-chart" /></span><span class="d-none d-sm-none d-md-none d-lg-inline">ANALYSIS</span>
        </div>
        <div class="sidebar_item">
            <span class="me-2 large-font-size"><font-awesome-icon icon="fa-credit-card" /></span><span class="d-none d-sm-none d-md-none d-lg-inline">ACCOUNTS</span>
        </div>
        <div class="sidebar_item">
            <span class="me-2 large-font-size"><font-awesome-icon icon="fa-user-tie" /></span><span class="d-none d-sm-none d-md-none d-lg-inline">USER</span>
        </div>
        <div class="sidebar_item sidebar_end" @click="this.$store.dispatch('logout')">
            <span class="me-2 large-font-size"><font-awesome-icon icon="fa-user-tie" /></span><span class="d-none d-sm-none d-md-none d-lg-inline" >LOGOUT</span>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    width: 350px;
    position: absolute;
    bottom: 0;
    top: 0;
    background-color: #212529 !important;
    color: white;
    height: auto;
}

.title {
    padding: 25px;
    letter-spacing: 8px;
    font-weight: 600;
    font-size: 25px;
}

.sidebar_item {
    padding: 25px;
    widows: 100%;
    font-weight: 600;
}

.sidebar_item:hover {
    cursor: pointer;
    background-color: white;
    color: #2e2e2e;
    transition: 0.3s;
}

.sidebar_end{
    position: absolute;
    width: 100%;
    bottom: 0;
}

@media only screen and (max-width: 992px) {
    .sidebar{
        width: 75px !important;
    }
}

</style>
