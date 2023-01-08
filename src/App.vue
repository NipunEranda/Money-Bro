<template>
  <!-- <div>
    <div class="container-loader hidden"><div class="loader"></div></div>
    <Header v-if="showHeader"></Header>
    <Sidebar v-if="showHeader"></Sidebar>
    <router-view class="container-body" />
  </div> -->

  <Header class="appHeader d-none" v-if="showHeader"></Header>
  <div class="box">
    <div class="leftSide">
      <Sidebar v-if="showHeader"></Sidebar>
    </div>
    <div class="rightSide">
      <div class="container-loader hidden">
        <div class="loader"></div>
      </div>
      <router-view class="container-body" />
    </div>
    <Bottombar class="w-100" id="bottomBar" style="display: none;"></Bottombar>
  </div>

</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Bottombar from "./components/Bottombar.vue";
import store from './store';
import { useStore } from "vuex";
export default {
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
      showHeader: false,
    };
  },
  watch: {
    $route: function (to, from) {
      if (to.name === "index") this.showHeader = false;
      else this.showHeader = true;
    },
  },
  components: {
    Header,
    Sidebar,
    Bottombar
  },
};
</script>

<style scoped>
.container-body {
  margin: 0;
  padding: 0;
}

.leftSide {
  flex: 350px 0 0 0;
}

.rightSide {
  flex: 1;
  margin-left: 350px;
}

.box {
  display: flex;
}

@media (max-width: 992px) {
  .rightSide {
    margin: 0 !important;
  }

  .bottomBar {
    display: inline-flex !important;
  }

  .appHeader {
    display: block !important;
  }
}

@import url('./assets/css/index.css');
</style>