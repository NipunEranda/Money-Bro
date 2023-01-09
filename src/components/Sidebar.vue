<template>
    <div class="sidebar">
        <router-link class="text" to="/home">
            <div class="title w-100 pointer unselectable">
                <img src="../assets/logo.png" width="40" height="40" class="d-inline-block align-top" alt="" />
                <span class="ms-2">MONEYBRO</span>
            </div>
        </router-link>
        <router-link class="text" to="/expenses">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon icon="fa-wallet" /></span><span>EXPENSES</span>
            </div>
        </router-link>
        <router-link class="text" to="/income">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon
                        icon="fa-circle-dollar-to-slot" /></span><span>INCOME</span>
            </div>
        </router-link>
        <router-link class="text" to="/analysis">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon
                        icon="fa fa-line-chart" /></span><span>ANALYSIS</span>
            </div>
        </router-link>
        <router-link class="text" to="/accounts">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon
                        icon="fa-credit-card" /></span><span>ACCOUNTS</span>
            </div>
        </router-link>
        <router-link class="text" to="/user">
            <div class="sidebar_item unselectable">
                <span class="me-2 large-font-size"><font-awesome-icon icon="fa-user-tie" /></span><span>USER</span>
            </div>
        </router-link>
        <div class="sidebar_item unselectable sidebar_end" @click="this.$store.dispatch('logout')">
            <span class="me-2 large-font-size"><font-awesome-icon icon="fa-power-off" /></span><span>LOGOUT</span>
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
    height: 100vh;
}

.title {
    padding: 25px;
    letter-spacing: 8px;
    font-weight: 600;
    font-size: 25px;
}

.text {
    text-decoration: none;
    color: white;
}

.sidebar_item {
    padding: 25px;
    width: 100%;
    font-weight: 600;
}

.sidebar_item:hover {
    cursor: pointer;
    background-color: white;
    color: #2e2e2e;
    transition: 0.3s;
}

.sidebar_end {
    position: absolute;
    width: 100%;
    bottom: 0;
}

@media only screen and (max-width: 992px) {
    .sidebar {
        display: none;
    }
}
</style>
