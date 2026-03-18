import { createRouter, createWebHistory } from 'vue-router'

import CreateAccountView from '../views/CreateAccountView.vue'
import HomeView from '../views/HomeView.vue'
import LeaguesView from '../views/LeaguesView.vue'
import MemberLoginView from '../views/MemberLoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: LeaguesView,
    },
    {
      path: '/member-login',
      name: 'member-login',
      component: MemberLoginView,
    },
    {
      path: '/create-account',
      name: 'create-account',
      component: CreateAccountView,
    },
  ],
})

export default router
