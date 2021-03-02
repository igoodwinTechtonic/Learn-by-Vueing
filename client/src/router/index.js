import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
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
  {
    path: '/folder/:name',
    name: 'Folder',
    component: Folder,
  },
  {
    path: '/folder/:name/add',
    name: 'AddBookmark',
    component: AddBookmark,
  },
  {
    path: '/bookmarks/:tag',
    name: 'Bookmarks',
    component: Bookmarks,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({ routes })

export default router
