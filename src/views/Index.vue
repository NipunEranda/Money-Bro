<template>
  <!-- <div class="container">
    <center>
      <img class="login-logo" src="../assets/logo.png" width="200" />
      <div class="container">
        <div id="googleBtn" style="margin: auto"></div>
      </div>
    </center>
  </div> -->
  <div class="flex-container">
    <div class="row" style="padding-top: 150px; padding-bottom: 40px">
      <div class="col-12">
        <img class="login-logo" src="../assets/logo.png"  />
      </div>
    </div>
    <div class="container">
      <div id="googleBtn" style="margin: auto"></div>
    </div>
  </div>
</template>

<style scoped>
.login-logo {
  width: 200px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
.container {
  text-align: center;
  display: grid;
}
.flex-container{
  height: 100vh;
}
</style>

<script>
import router from "../router";
import { useStore } from "vuex";
import store from "../store";
export default {
  setup: () => { },
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
    };
  },
  methods: {},
  mounted: function () {
    if (this.user) {
      if (this.user.token) this.$router.push("/home");
    } else {
      google.accounts.id.initialize({
        client_id:
          process.env.VUE_APP_GOOGLE_ID,
        callback: onSignIn,
      });
      google.accounts.id.prompt();
      google.accounts.id.renderButton(document.getElementById("googleBtn"), {
        theme: "outline",
        size: "large",
        text: "signin_with",
        type: "standard",
        shape: "pill",
        logo_alignment: "left",
      });
      function onSignIn(googleUser) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleUser.credential}`
          )
          .then((response) => {
            axios
              .post(`/.netlify/functions/auth/google`, response.data)
              .then((res) => {
                if (!res.data.error) {
                  axios.defaults.headers.common['Authorization'] = `bearer ${res.data.data.token}`;
                  store.dispatch("updateCurrentUser", {
                    id: res.data.data.user._id,
                    email: response.data.email,
                    name: response.data.name,
                    sub: response.data.sub,
                    balance: res.data.data.user.balance,
                    currency: res.data.data.user.currency,
                    accountTypes: res.data.data.user.accountTypes,
                    expenseTypes: res.data.data.user.expenseTypes,
                    incomeTypes: res.data.data.user.incomeTypes,
                    avatar: response.data.picture,
                    loggedIn: new Date(),
                  });
                  if (store.getters.getRedirectUrl)
                    router.push(store.getters.getRedirectUrl);
                  else router.push("/home");
                }
              });
          });
      }
    }
  },
};
</script>
