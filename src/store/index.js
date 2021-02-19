import Vue from 'vue'
import Vuex from 'vuex'

import data from './bookmarks.json'

import {
  mdiAngularjs,
  mdiLanguageCss3,
  mdiLanguageHtml5,
  mdiLanguageJava,
  mdiLanguageJavascript,
  mdiNodejs,
  mdiLanguagePython,
  mdiReact,
  mdiLanguageTypescript,
  mdiVuejs,
  mdiVuetify
} from '@mdi/js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // A tech can have multiple bookmarks
    techs: [
      { name: 'Angular', icon: mdiAngularjs, numResources: 0 },
      { name: 'CSS', icon: mdiLanguageCss3, numResources: 0 },
      { name: 'HTML', icon: mdiLanguageHtml5, numResources: 0 },
      { name: 'Java', icon: mdiLanguageJava, numResources: 0 },
      { name: 'JavaScript', icon: mdiLanguageJavascript, numResources: 0 },
      { name: 'Node', icon: mdiNodejs, numResources: 0 },
      { name: 'Python', icon: mdiLanguagePython, numResources: 0 },
      { name: 'React', icon: mdiReact, numResources: 0 },
      { name: 'TypeScript', icon: mdiLanguageTypescript, numResources: 0 },
      { name: 'Vue', icon: mdiVuejs, numResources: 0 },
      { name: 'Vuetify', icon: mdiVuetify, numResources: 0 },
    ],
    // Must keep separate because a resource can have multiple tags
    // bookmarks state is updated when a user clicks a technology
    bookmarks: data.bookmarks || [],
    // Pull this object from a db to reflect the currently chosen technology, follows this format for each resource
    // { title: '', author: '', tech: '', description: '', link: '', image: '', createdDate: '', lastEdited: '', deleted: false },

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
