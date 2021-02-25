import Vue from 'vue'
import Vuex from 'vuex'

import foldersModule from './modules/foldersModule.js'
import tagsModule from './modules/tagsModule.js'
import bookmarksModule from './modules/bookmarksModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedFolder: {},
    selectedBookmark: {},
    selectedTag: {},
    // These are all the possible folder icons that autofill for the user
    folderIcons: [
      "mdiAngularjs",
      "mdiLanguageCss3",
      "mdiLanguageHtml5",
      "mdiLanguageJava",
      "mdiLanguageJavascript",
      "mdiNodejs",
      "mdiLanguagePython",
      "mdiReact",
      "mdiLanguageTypescript",
      "mdiVuejs",
      "mdiVuetify",
    ]
  },
  modules: {
    folders: foldersModule,
    tags: tagsModule,
    bookmarks: bookmarksModule
  },
  mutations: {
    setSelectedFolder(state, payload) {
      state.selectedFolder = payload;
    },
    setSelectedTag(state, payload) {
      state.selectedTag = payload;
    },
    setSelectedBookmark(state, payload) {
      state.selectedBookmark = payload;
    }
  },
  // actions: {

  // },
})
