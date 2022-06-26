<template>
  <div>
    <Header></Header>
    <router-view class="container-body" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header,
  },
};
</script>

<style>
  .container-body{
    padding: 20px 50px 20px 50px;
  }

  @import url('./assets/css/index.css');
</style>