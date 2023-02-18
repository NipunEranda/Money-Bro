<template>
    <div class="bottomBar row p-0 m-0">
        <router-link class="text col col-2 p-0 m-0 " to="/expenses">
            <div class="bottomBar_item unselectable">
                <div>
                    <span class="large-font-size"><font-awesome-icon icon="fa-wallet" /></span>
                </div>
                <div>
                    <span class="icon_text">Expenses</span>
                </div>
            </div>
        </router-link>
        <router-link class="text col col-2 p-0 m-0 " to="/income">
            <div class="bottomBar_item unselectable">
                <div>
                    <span class="large-font-size"><font-awesome-icon icon="fa-sack-dollar" /></span>
                </div>
                <div>
                    <span class="icon_text">Income</span>
                </div>
            </div>
        </router-link>
        <router-link class="text col col-2 p-0 m-0 " to="/analysis">
            <div class="bottomBar_item unselectable">
                <div>
                    <span class="large-font-size"><font-awesome-icon icon="fa fa-line-chart" /></span>
                </div>
                <div>
                    <span class="icon_text">ANALYSIS</span>
                </div>
            </div>
        </router-link>
        <router-link class="text col col-2 p-0 m-0 " to="/accounts">
            <div class="bottomBar_item unselectable">
                <div>
                    <span class="large-font-size"><font-awesome-icon icon="fa-credit-card" /></span>
                </div>
                <div>
                    <span class="icon_text">ACCOUNTS</span>
                </div>
            </div>
        </router-link>
        <router-link class="text col col-2 p-0 m-0 " to="/settings">
            <div class="bottomBar_item unselectable">
                <div>
                    <span class="large-font-size"><font-awesome-icon icon="fa-gear" /></span>
                </div>
                <div>
                    <span class="icon_text">SETTINGS</span>
                </div>
            </div>
        </router-link>
        <div class="col col-2 bottomBar_item unselectable" @click="this.$store.dispatch('logout')">
            <div>
                <span class="large-font-size"><font-awesome-icon icon="fa-power-off" /></span>
            </div>
            <div>
                <span class="icon_text">Logout</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bottomBar {
    position: absolute;
    bottom: 0;
    background-color: #212529 !important;
    color: white;
    text-align: center;
}

.text {
    text-decoration: none;
    color: white;
}

.bottomBar_item {
    padding: 15px;
    font-weight: 600;
}

.bottomBar_item div {
    text-align: center;
}

.bottomBar_item:hover {
    cursor: pointer;
    background-color: white;
    color: #2e2e2e;
    transition: 0.3s;
}

@media (max-width: 610px) {
    .icon_text {
        display: none;
    }
}
</style>