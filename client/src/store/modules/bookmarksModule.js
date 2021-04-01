import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: [],
    bookmarkToAdd: {},
    searchResults: [],
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
    },
    resetState(state) {
      state.list = []
      state.bookmarkToAdd = {}
      state.searchResults = []
    }
  },
  actions: {
    /** GETS all bookmarks from db given a user id
     * 
    * @param {Object} param0 - Destructured into commit.
    * @param {string} user_id - The user id from the users collection.
    * @returns {Promise} A promise containing the user's bookmarks.
    */
    getBookmarks({ commit }, user_id) {
      return axios.get('/api/bookmarks?id=' + user_id)
        .then((res) => commit('setBookmarks', res.data))
        .catch((err) => console.error(err));
    },
    /** Searches bookmarks given a keyword entered from the search menu
     * 
     * @param {Object} param0 - Destructed into commit and rootState.
     * @param {string} keywords - The user's inputted search keywords.
     * @returns {Promise} A promise containing the queried bookmarks.
     */
    searchBookmarks({ commit, rootState }, keywords) {
      if (keywords === '') return;
      return axios.get(`api/bookmarks?id=${rootState.users.currentUser._id}&search=${keywords}`)
        .then((res) => commit('searchResults', res.data))
        .catch((err) => console.error(err))
    },
    /** POSTS a new bookmark to db and updates bookmark list
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} bookmarkToAdd - The bookmark to add to the user's account.
     * @returns {Promise} A promise after inserting the bookmark.
     */
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
    /** PUTS / UPDATES a bookmark to db and updates bookmarks list
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} bookmarkToEdit - The bookmark to edit in the user's account.
     * @returns {Promise} A promise after reinserting the bookmark.
     */
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
    /** DELETES a single bookmark and updates bookmarks list
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} bookmarkToDelete - The bookmark to delete in the user's account.
     * @returns {Promise} A promise after deleting the bookmark.
     */
    deleteBookmark({ commit, state }, bookmarkToDelete) {
      const bookmarkList = state.list.filter(bookmark => bookmark._id !== bookmarkToDelete.id);
      return axios
        .delete('/api/bookmarks/' + bookmarkToDelete.id)
        .then(() => commit('setBookmarks', bookmarkList))
        .catch((err) => console.error(err));
    },
    /** DELETES all bookmarks from a folder when a folder is deleted, given folder id
     * Dispatches getBookmarks to re-get all user's bookmarks to refresh folder state.
     * 
     * @param {Object} param0 - Destructured into dispatch and rootState.
     * @param {string} folderId - The folder id to delete.
     * @returns {Promise} A promise after the bookmark is deleted.
     */
    deleteAllBookmarksInFolder({ dispatch, rootState }, folderId) {
      return axios
        .delete('/api/bookmarks/all/' + folderId)
        .then(() => dispatch('getBookmarks'), rootState.users.currentUser._id)
        .catch((err) => console.error(err));
    }
  }
}
