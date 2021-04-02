import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from "../auth";

import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Folder from '../views/Folder.vue'
import PublicFolder from '../views/PublicFolder.vue'
import Tags from '../views/Bookmarks.vue'
import AddBookmark from '../views/AddBookmark.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    beforeEnter: authGuard
  },
  {
    path: '/public/:name/:id',
    name: 'ShareableFolder',
    component: PublicFolder,
  },
  {
    path: '/folder/:name/:id',
    name: 'Folder',
    component: Folder,
    beforeEnter: authGuard
  },
  {
    path: '/folder/:name/:action',
    name: 'AddBookmark',
    component: AddBookmark,
    beforeEnter: authGuard
  },
  {
    path: '/tags/:tag',
    name: 'Tags',
    component: Tags,
    beforeEnter: authGuard
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
