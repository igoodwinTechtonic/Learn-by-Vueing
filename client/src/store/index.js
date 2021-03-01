import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import foldersModule from './modules/foldersModule.js'
import tagsModule from './modules/tagsModule.js'
import bookmarksModule from './modules/bookmarksModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    overlay: false,
    selectedFolder: {},
    selectedBookmark: {},
    selectedTags: [],
    searchKeywords: '',
    linkToAdd: '',
  },
  modules: {
    folders: foldersModule,
    tags: tagsModule,
    bookmarks: bookmarksModule
  },
  mutations: {
    setOverlay(state, payload) { state.overlay = payload },
    setSelectedFolder(state, payload) { state.selectedFolder = payload },
    setSelectedBookmark(state, payload) { state.selectedBookmark = payload },
    setSelectedTags(state, payload) { state.selectedTags = payload },
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
        .then((res) => commit('setSelectedBookmark', res.data))
    }
  }
})
