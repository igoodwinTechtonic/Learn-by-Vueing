import axios from 'axios';

// Tags are stored under the user endpoint as an array of objects with a "name" and "count" properties

export default {
  namespaced: true,
  state: {
    list: [],
    selectedTag: {},
    currentBookmarkTags: [],
  },
  mutations: {
    // Orders tags by name, ascending alphabetically, then sets state.list
    setTags(state, tags) {
      if (tags.length === 1) state.list = tags;
      else {
        const sortedTags = [...tags];
        sortedTags.sort((a, b) => a.toUpperCase() > b.toUpperCase() ? 1 : -1)
        state.list = sortedTags;
      }
    },
    // When a tag is selected in the left-hand nav drawer, the UI renders Bookmarks with bookmarks that have this tag
    setSelectedTag(state, payload) {
      state.selectedTag = payload
    },
    // Contains a list of tags selected in the AddBookmark component view
    setCurrentBookmarkTags(state, payload) {
      state.currentBookmarkTags = payload
    },
    resetState(state) {
      state.list = []
      state.selectedTag = {}
      state.currentBookmarkTags = []
    }
  },
  actions: {
    /** GETS tags by querying all user's bookmarks, updates local module state.list
     * 
     * @param {Object} param0 - Destructed into commit.
     * @param {string} user_id - The user id.
     * @returns {Promise} A promise after the tags state is updated.
     */
    getUserTags({ commit }, user_id) {
      return axios.get('/api/tags?id=' + user_id)
        .then((res) => {
          let tagList = [];
          res.data.forEach((i) => {
            i.tags.forEach(tag => {
              // Does not add duplicate tags to list
              if (!tagList.includes(tag)) return tagList.push(tag)
            })
          })
          commit('setTags', tagList)
        })
        .catch((err) => console.error(err))
    },
  }
}