import Vue from 'vue'
import Vuex from 'vuex'

import b from './bookmarks.json'
import f from './folders.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    folders: f.folders || [],
    bookmarks: b.bookmarks || [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
