import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import bookmarksModule from './modules/bookmarksModule.js'
import foldersModule from './modules/foldersModule.js'
import tagsModule from './modules/tagsModule.js'
import usersModule from './modules/usersModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    overlay: false,
    searchKeywords: '',
    linkToAdd: '',
    displaySettings: {
      title: true,
      url: true,
      image: true,
      favicon: false,
      description: true,
      tags: true,
    }
  },
  modules: {
    bookmarks: bookmarksModule,
    folders: foldersModule,
    tags: tagsModule,
    users: usersModule,
  },
  mutations: {
    setOverlay(state, payload) { state.overlay = payload },
    setSearchKeywords(state, payload) { state.searchKeywords = payload },
    setLinkToAdd(state, payload) { state.linkToAdd = payload },
  },
  actions: {
    scrapeUrl({ commit }, link) {
      return axios.post('/scrape', JSON.stringify(link), {
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => commit('bookmarks/setBookmarkToAdd', res.data))
    }
  },
  plugins: [createPersistedState()]
})
