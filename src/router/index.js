import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../modules/home/home.vue'
import LoginPage from '../modules/login/login.vue';
import { UserRole, TokenKey } from '../core/config';
import store from '../core/store';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      beforeEnter: AuthGuard,
      meta: {
        allowRoles: [UserRole.Admin, UserRole.PM]
      },
    },
    {
      path: '/404',
      name: '404',
      component: require('../modules/404/404.vue').default
    },
    {
      path: '*',
      redirect: '404'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const authRequired = to.meta.authRequired == true;
//   const allowRoles = to.meta.allowRoles;
//   const loggedIn = localStorage.getItem(TokenKey.AuthToken);

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// })

let entryUrl = "";
function AuthGuard(to, from, next) {
  if (store.state.auth.authToken) {
    if (entryUrl) {
      const url = entryUrl;
      entryUrl = null;
      return next(url); // go to stored url
    } else {
      return next();
    }
  }
  // await store.dispatch('checkAuth');
  // we use await as this async request has to finish 
  // before we can be sure

  if (store.state.auth.authToken) {
    next();
  } else {
    entryUrl = to.path; // store entry url before redirect
    next('/login');
  }
}