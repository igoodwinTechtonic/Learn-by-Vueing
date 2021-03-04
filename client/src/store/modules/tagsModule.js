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
        sortedTags.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
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
      console.log(state.currentBookmarkTags)
    },
  },
  actions: {
    // GETS tags, updates local module state.list
    getTags({ commit }) {
      return axios.get('/api/users/tags')
        .then((res) => commit('setTags', res.data.tags))
        .catch((err) => console.error(err))
    },
    // POSTS new tags and/or UPDATES count of existing tags from the AddBookmark.vue dialog
    updateTagList({ commit, state, rootState }) {
      let updatedTags = [...state.currentBookmarkTags];
      state.list.forEach(tagInState => {
        if (!(updatedTags.map(tag => tag.name).includes(tagInState.name))) {
          // If a tag in state is not in currentBookmarkTags, keep it the same and readd to list
          updatedTags = [...updatedTags, tagInState]
        }
      })
      commit('setTags', updatedTags)

      const putTags = {
        _id: rootState.users.currentUser._id,
        tags: updatedTags
      }

      return axios
        .put('/api/users/tags', putTags)
        .then(() => commit('setTags', updatedTags))
        .catch((err) => console.error(err));
    },
    // Deletes a tag
    deleteTag({ commit, state }, id) {
      const tags = state.list.filter(tag => tag._id !== id);
      return axios
        .delete('/api/users/tags' + id)
        .then(() => commit('setTags', tags))
        .catch((err) => console.error(err));
    }
  }
}