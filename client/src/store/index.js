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
    selectedNavMenu: 'Folders',
  },
  modules: {
    bookmarks: bookmarksModule,
    folders: foldersModule,
    tags: tagsModule,
    users: usersModule,
  },
  mutations: {
    // Sets loading overlay when long async actions are dispatched (app loading)
    setOverlay(state, payload) { state.overlay = payload },
    // Sets the search keywords for searching bookmarks
    setSearchKeywords(state, payload) { state.searchKeywords = payload },
    // Sets the nav, used on page reloading
    setSelectedNavMenu(state, payload) { state.selectedNavMenu = payload },
  },
  actions: {
    // Scrapes URL and commits results to bookmarkToAdd in
    // bookmarks module when link is pasted into search field
    async scrapeUrl({ commit }, link) {
      try {
        const res = await axios.post('/api/scrape', link)
        commit('bookmarks/setBookmarkToAdd', res.data)
      } catch (e) {
        console.error(e)
      }
    }
  },
  // Persists state between refresh by storing in local storage
  plugins: [createPersistedState()]
})
