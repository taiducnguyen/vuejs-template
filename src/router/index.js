import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../modules/home/home.vue'
import LoginPage from '../modules/login/login.vue';
import { UserRole } from '../core/config';

Vue.use(Router)

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
      meta: {
        authRequired: true,
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

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const authRequired = to.meta.authRequired == true;
  const allowRoles = to.meta.allowRoles;
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
