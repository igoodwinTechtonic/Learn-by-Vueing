import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from "../auth";

import Home from '../views/Home.vue'
// import Callback from '../views/Callback.vue'÷
// import About from '../views/About.vue';
import Folder from '../views/Folder.vue'
import Bookmarks from '../views/Bookmarks.vue'
import AddBookmark from '../views/AddBookmark.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  // path: '/callback',
  // name: 'Callback',
  // component: Callback,
  // beforeEnter: authGuard
  // },
  {
    path: '/folder/:name',
    name: 'Folder',
    component: Folder,
    beforeEnter: authGuard
  },
  {
    path: '/folder/:name/add',
    name: 'AddBookmark',
    component: AddBookmark,
    beforeEnter: authGuard
  },
  {
    path: '/bookmarks/:tag',
    name: 'Bookmarks',
    component: Bookmarks,
    beforeEnter: authGuard
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
