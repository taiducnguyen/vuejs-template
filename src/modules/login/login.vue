<script>
import { authMethods } from "../../core/helpers";

export default {
  data() {
    return {
      userName: "",
      passWord: "",
      submitted: false,
      authErrorMsg: "",
      isLoggingIn: false
    };
  },
  computed: {
    placeHolders() {
      return {
        userName: "Email or Username",
        passWord: "Password"
      };
    }
  },
  created() {},
  methods: {
    ...authMethods,
    hanlderSubmit(e) {
      e && e.preventDefault();
      this.submitted = true;
      this.isLoggingIn = true;
      return this.loginFake({
        username: this.userName,
        password: this.passWord
      })
        .then(token => {
          this.isLoggingIn = false;
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' });
        })
        .catch(err => {
          this.isLoggingIn = false;
          this.authErrorMsg =
            err.message || "Username or password is not correct.";
        });
    }
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-logo"></div>
      <div class="login-form">
        <h2 class="title">Sign</h2>
        <form @submit.prevent="hanlderSubmit">
          <div class="form-">
            <label for="userName">Username</label>
            <input
              type="text"
              v-model="userName"
              class=""
              :class="{ invalid: submitted && !userName }"
              :placeholder="placeHolders.userName"
            />
            <span class="error-msg" v-show="submitted && !userName"
              >Username is required</span
            >
          </div>
          <div class="form-">
            <label for="userName">Username</label>
            <input
              type="text"
              v-model="passWord"
              class=""
              :class="{ invalid: submitted && !passWord }"
              :placeholder="placeHolders.passWord"
            />
            <span class="error-msg" v-show="submitted && !passWord"
              >Password is required</span
            >
          </div>
          <div v-show="!!authErrorMsg">
            <span class="error-msg">{{ authErrorMsg }}</span>
          </div>
          <div class="form-action">
            <button class="btn btn-primary" :disabled="isLoggingIn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
