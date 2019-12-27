<script>
import { authMethods } from '../../core/helpers';
import { mapGetters } from 'vuex';
import { JwtHelper } from '../../core/jwt-helper';
import { TokenKey } from '../../core/config';
import Footer from '../_layouts/footer';
export default {
  data() {
    return {
      userName: '',
      passWord: '',
      submitted: false,
      isRemember: false,
      authErrorMsg: '',
      isLoggingIn: false
    };
  },
  components: {
    Footer
  },
  beforeCreate() {
    if (JwtHelper.isAuthenticated()) {
      this.$router.push(this.$route.query.redirect || '/');
    }
  },
  computed: {
    placeHolders() {
      return {
        userName: 'Email or Username',
        passWord: 'Password'
      };
    }
  },
  created() {},
  methods: {
    ...authMethods,
    hanlderSubmit(e) {
      e && e.preventDefault();
      this.submitted = true;
      if (!!this.userName && !!this.passWord) {
        this.isLoggingIn = true;
        return this.logIn({
          username: this.userName,
          password: this.passWord
        })
          .then(res => {
            this.isLoggingIn = false;
            this.$router.push(this.$route.query.redirect || '/');
          })
          .catch(err => {
            this.isLoggingIn = false;
            this.authErrorMsg =
              err.details || 'Username or password is not correct.';
          });
      }
    }
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-logo"></div>
      <div class="login-form">
        <h2 class="title">Sign In</h2>
        <form @submit.prevent="hanlderSubmit">
          <div class="form-input">
            <label for="userName">Username</label>
            <input
              type="text"
              v-model="userName"
              class
              :class="{ invalid: submitted && !userName }"
              :placeholder="placeHolders.userName"
            />
            <span class="error-msg" v-show="submitted && !userName"
              >Username is required</span
            >
          </div>
          <div class="form-input">
            <label for="userName">Password</label>
            <input
              type="password"
              v-model="passWord"
              class
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
          <div class="form-input form-checkbox">
            <input
              class="input-checkbox"
              id="rememberme"
              type="checkbox"
              name="remember-me"
              v-model="isRemember"
            />
            <label class="label-checkbox" for="rememberme">Remember me</label>
          </div>
          <div class="form-action text-center">
            <button
              type="submit"
              class="btn-login secondary"
              :disabled="isLoggingIn"
            >
              Login
            </button>
          </div>
          <div class="text-center">
            <a href="#" class="txt-white">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/theme/components/_variables.scss';

.login-page {
  width: 100%;
  height: 100vh;
  background-image: url('~@/assets/images/bg-01.jpg');
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: $text-color-white;
  &::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.9);
  }
}
.login-container {
  background: -webkit-linear-gradient(top, #7579ff, #49afcd);
  padding: 55px 55px 37px 55px;
  width: 500px;
}
.login-form {
  .title {
    text-align: center;
    font-size: 2.25rem;
    text-transform: uppercase;
  }
}
.btn-login {
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 30px;
}
</style>
