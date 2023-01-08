<template>
    <div class="bottomBar row p-0 m-0">
        <div class="col col-3 bottomBar_item unselectable"><span class="large-font-size"><font-awesome-icon icon="fa-sack-dollar" /></span><span
                class="ms-3 icon_text">BUDGET</span></div>
        <div class="col col-3 bottomBar_item unselectable"><span class="large-font-size"><font-awesome-icon icon="fa fa-line-chart" /></span><span
                class="ms-3 icon_text">ANALYSIS</span></div>
        <div class="col col-3 bottomBar_item unselectable"><span class="large-font-size"><font-awesome-icon icon="fa-credit-card" /></span><span
                class="ms-3 icon_text">ACCOUNTS</span></div>
        <div class="col col-3 bottomBar_item unselectable"><span class="large-font-size"></span><font-awesome-icon icon="fa-id-badge" /><span
                class="ms-3 icon_text">USER</span></div>
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

.bottomBar_item {
    padding: 15px;
    font-weight: 600;
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