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
  },
  actions: {
    // Scrapes URL and commits results to bookmarkToAdd in
    // bookmarks module when link is pasted into search field
    async scrapeUrl({ commit }, link) {
      try {
        // console.log(link)
        const res = await axios.post('/api/scrape', link)
        // const res = await axios.post('/api/scrape', JSON.stringify(link), {
        //   headers: {
        //     "Content-Type": "application/json",
        //   }
        // })
        // console.log(res.data)
        commit('bookmarks/setBookmarkToAdd', res.data)
      } catch (e) {
        console.error(e)
      }
    }
  },
  plugins: [createPersistedState()]
})
