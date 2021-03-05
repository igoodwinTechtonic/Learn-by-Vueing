import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: [],
    searchResults: [],
    bookmarkToAdd: {},
  },
  mutations: {
    // Sets all user's bookmarks in state
    setBookmarks(state, bookmarks) {
      state.list = bookmarks;
    },
    // Sets the bookmark to add or edit here
    setBookmarkToAdd(state, bookmark) {
      state.bookmarkToAdd = bookmark;
    },
    // Sets the search results and displays in bookmarks view
    searchResults(state, bookmarks) {
      state.searchResults = bookmarks;
    }
  },
  actions: {
    // GETS all bookmarks from db given a user id
    getBookmarks({ commit }, user_id) {
      return axios.get('/api/bookmarks?id=' + user_id)
        .then((res) => commit('setBookmarks', res.data))
        .catch((err) => console.error(err));
    },
    // Searches bookmarks given a keyword entered from the search menu
    searchBookmarks({ commit, rootState }, keywords) {
      if (keywords === '') return;
      return axios.get(`api/bookmarks?id=${rootState.users.currentUser._id}&search=${keywords}`)
        .then((res) => commit('searchResults', res.data))
        .catch((err) => console.error(err))
    },
    // POSTS a new bookmark to db and updates bookmark list
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
    // PUTS / UPDATES a bookmark to db and updates bookmarks list
    editBookmark({ commit, state }, bookmarkToEdit) {
      const { _id, ...bookmarkWithoutId } = bookmarkToEdit
      return axios
        .put('/api/bookmarks/' + bookmarkToEdit._id, bookmarkWithoutId)
        .then(() => {
          const bookmarkListRemove = state.list.filter(bookmark => bookmark._id !== _id);
          const bookmarkListReadd = [...bookmarkListRemove, bookmarkToEdit];
          commit('setBookmarks', bookmarkListReadd)
        })
        .catch((err) => console.error(err));
    },
    // DELETES a single bookmark and updates bookmarks list
    deleteBookmark({ commit, state }, bookmarkToDelete) {
      const bookmarkList = state.list.filter(bookmark => bookmark._id !== bookmarkToDelete.id);
      return axios
        .delete('/api/bookmarks/' + bookmarkToDelete.id)
        .then(() => commit('setBookmarks', bookmarkList))
        .catch((err) => console.error(err));
    },
    // DELETES all bookmarks from a folder when a folder is deleted, given folder id
    deleteAllBookmarksInFolder({ dispatch, rootState }, folderId) {
      return axios
        .delete('/api/bookmarks/all/' + folderId)
        .then(() => dispatch('getBookmarks'), rootState.users.currentUser._id)
        .catch((err) => console.error(err));
    }
  }
}
