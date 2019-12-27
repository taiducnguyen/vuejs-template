import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../modules/home/home.vue'
import LoginPage from '../modules/login/login.vue';
import { UserRole } from '../core/config';
import { JwtHelper } from '../core/jwt-helper';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        title: 'Login Page'
      }
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      beforeEnter: AuthGuard,
      meta: {
        allowRoles: [UserRole.Admin, UserRole.PM],
        title: 'Home Page'
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Efficient Time';
  next();
})

let entryUrl = "";
function AuthGuard(to, from, next) {
  if (JwtHelper.isAuthenticated()) {
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

  if (JwtHelper.isAuthenticated()) {
    next();
  } else {
    entryUrl = to.path; // store entry url before redirect
    next('/login');
  }
}