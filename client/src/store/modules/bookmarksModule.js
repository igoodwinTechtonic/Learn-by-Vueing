import axios from 'axios'

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
      state.list = bookmarks
    },
    // Sets the bookmark to add or edit here
    setBookmarkToAdd(state, bookmark) {
      state.bookmarkToAdd = bookmark
    },
    // Sets the search results and displays in bookmarks view
    searchResults(state, bookmarks) {
      state.searchResults = bookmarks
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
    async getBookmarks({ commit }, user_id) {
      try {
        const res = await axios.get('/api/bookmarks?id=' + user_id)
        commit('setBookmarks', res.data)
      } catch (e) {
        console.error(e)
      }
    },
    /** GETS all bookmarks from db given a public folder id
     * 
     * @param {Object} param0 - Destructed into commit.
     * @param {string} folder_id - The folder id to get.
     */
    async getBookmarksFromPublicFolder({ commit }, folder_id) {
      try {
        const bookmarks = await axios.get('/api/bookmarks/all/' + folder_id)
        const folder = await axios.get('/api/folders/' + folder_id)
        commit('setBookmarks', bookmarks.data)
        commit('folders/setSelectedFolder', folder.data, { root: true })
      } catch (e) {
        // If 404, the folder was deleted or is empty
        console.error(e)
      }
    },
    /** Searches bookmarks given a keyword entered from the search menu
     * 
     * @param {Object} param0 - Destructed into commit and rootState.
     * @param {string} keywords - The user's inputted search keywords.
     * @returns {Promise} A promise containing the queried bookmarks.
     */
    async searchBookmarks({ commit, rootState }, keywords) {
      if (keywords === '') return
      try {
        const res = await axios.get(`api/bookmarks?id=${rootState.users.currentUser._id}&search=${keywords}`)
        commit('searchResults', res.data)
      } catch (e) {
        console.error(e)
      }
    },
    /** POSTS a new bookmark to db and updates bookmark list
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} bookmarkToAdd - The bookmark to add to the user's account.
     * @returns {Promise} A promise after inserting the bookmark.
     */
    async addBookmark({ commit, state }, bookmarkToAdd) {
      try {
        const res = await axios.post('/api/bookmarks', bookmarkToAdd)
        const addedBookmark = res.data.ops[0]
        const bookmarkList = [...state.list, addedBookmark]
        commit('setBookmarks', bookmarkList)
      } catch (e) {
        console.error(e)
      }
    },
    /** PUTS / UPDATES a bookmark to db and updates bookmarks list
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} bookmarkToEdit - The bookmark to edit in the user's account.
     * @returns {Promise} A promise after reinserting the bookmark.
     */
    async editBookmark({ commit, state }, bookmarkToEdit) {
      const { _id, ...bookmarkWithoutId } = bookmarkToEdit
      try {
        await axios.put('/api/bookmarks/' + bookmarkToEdit._id, bookmarkWithoutId)
        const bookmarkListRemove = state.list.filter(bookmark => bookmark._id !== _id)
        const bookmarkListReadd = [...bookmarkListRemove, bookmarkToEdit]
        commit('setBookmarks', bookmarkListReadd)
      } catch (e) {
        console.error(e)
      }
    },
    /** DELETES a single bookmark and updates bookmarks list
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} bookmarkToDelete - The bookmark to delete in the user's account.
     * @returns {Promise} A promise after deleting the bookmark.
     */
    async deleteBookmark({ commit, state }, bookmarkToDelete) {
      const bookmarkList = state.list.filter(bookmark => bookmark._id !== bookmarkToDelete.id)
      try {
        await axios.delete('/api/bookmarks/' + bookmarkToDelete.id)
        commit('setBookmarks', bookmarkList)
      } catch (e) {
        console.error(e)
      }
    },
    /** DELETES all bookmarks from a folder when a folder is deleted, given folder id
     * Dispatches getBookmarks to re-get all user's bookmarks to refresh folder state.
     * 
     * @param {Object} param0 - Destructured into dispatch and rootState.
     * @param {string} folderId - The folder id to delete.
     * @returns {Promise} A promise after the bookmark is deleted.
     */
    async deleteAllBookmarksInFolder({ dispatch, rootState }, folderId) {
      try {
        await axios.delete('/api/bookmarks/all/' + folderId)
        dispatch('getBookmarks', rootState.users.currentUser._id)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
