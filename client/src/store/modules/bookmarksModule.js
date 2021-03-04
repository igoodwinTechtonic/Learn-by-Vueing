import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: [],
    searchResults: [],
    bookmarkToAdd: {},
  },
  mutations: {
    setBookmarks(state, bookmarks) {
      state.list = bookmarks;
    },
    setBookmarkToAdd(state, bookmark) {
      state.bookmarkToAdd = bookmark;
    }
  },
  actions: {
    getBookmarks({ commit }, user_id) {
      return axios.get('/api/bookmarks?id=' + user_id)
        .then((res) => commit('setBookmarks', res.data))
        .catch((err) => console.error(err));
    },
    searchBookmarks({ commit }, keywords) {
      return axios.get('api/bookmarks?search=' + keywords)
        .then((res) => commit('searchResults', res.data))
        .catch((err) => console.error(err))
    },
    addBookmark({ commit, state }, bookmarkToAdd) {
      return axios
        .post('/api/bookmarks', bookmarkToAdd)
        .then((res) => {
          const addedBookmark = res.data.ops[0]
          const bookmarkList = [...state.list, addedBookmark];
          commit('setBookmarks', bookmarkList)
        })
        .catch((err) => console.error(err));
    },
    deleteBookmark({ commit, state }, bookmarkToDelete) {
      // console.log(bookmarkToDelete)
      // Also delete tag if this is the last bookmark that has tags
      // Search all other bookmarks if this bookmark's tags exist in other bookmarks, if not, delete tag
      // If this tag exists in other bookmarks, reduce count by one for all tags of this bookmark 
      // console.log(rootState.tags.list)

      // const tagsToDecrement = bookmarkToDelete.tags.forEach((tag) => {

      // })

      const bookmarkList = state.list.filter(bookmark => bookmark._id !== bookmarkToDelete.id);
      return axios
        .delete('/api/bookmarks/' + bookmarkToDelete.id)
        .then(() => commit('setBookmarks', bookmarkList))
        .catch((err) => console.error(err));
    }
  }
}
