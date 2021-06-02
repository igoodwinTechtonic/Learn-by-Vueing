import axios from 'axios'

export default {
  namespaced: true,
  // State contains the currently selected folder, displayed in the url when clicked
  // And a list of all of the user's folders pulled from the db
  state: {
    selectedFolder: {},
    list: [],
  },
  mutations: {
    // Sets all folders to state
    setFolders(state, folders) {
      state.list = folders
    },
    // Sets selected folder when user clicks on folder link in nav menu
    setSelectedFolder(state, payload) {
      state.selectedFolder = payload
    },
    resetState(state) {
      state.list = []
      state.selectedFolder = {}
    }
  },
  actions: {
    /** Retrieves all folders from a given user id
     * Sets selected folder (not required, but just in case!)
     * 
     * @param {Object} param0 - Destructed into commit.
     * @param {string} user_id - The user id.
     * @returns {Promise} A promise after the folders state is set.
     */
    async getFolders({ commit, rootState }, user_id) {
      try {
        const res = await axios.get('/api/folders?userid=' + user_id)
        commit('setFolders', res.data)
        // console.log(rootState.folders.selectedFolder)
        if (res.data.length !== 0) commit('setSelectedFolder', rootState.folders.selectedFolder)
      } catch (e) {
        return console.error(e)
      }
    },
    /** Adds a folder to the user's folders.
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} folder - The folder object to add to the user's account.
     * @returns {Promise} A promise after the folders state is updated.
     */
    async addFolder({ commit, state }, folder) {
      try {
        const res = await axios.post('/api/folders', JSON.stringify(folder), {
          headers: {
            "Content-Type": "application/json",
          }
        })
        const addedFolder = res.data
        const folders = [...state.list, addedFolder]
        commit('setSelectedFolder', addedFolder)
        commit('setFolders', folders)
      } catch (e) {
        return console.error(e)
      }
    },
    /** Updates the folder's name
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} updatedFolder - A folder with an updated name.
     * @returns {Promise} A promise after the folder and folder state is updated.
     */
    async updateFolderName({ commit, state }, updatedFolder) {
      const { _id, ...folder } = updatedFolder
      const folders = state.list.filter(folder => folder._id !== _id)
      folders.push(updatedFolder)
      try {
        await axios.put('/api/folders/' + _id, JSON.stringify(folder), {
          headers: {
            "Content-Type": "application/json",
          }
        })
        commit('setFolders', folders)
        commit('setSelectedFolder', updatedFolder)
      } catch (e) {
        console.error(e)
      }
    },
    /** Deletes a folder and all bookmarks with the same folder_id, re-gets all tags after deletion
     * 
     * @param {Object} param0 - Destructed into commit, dispatch, state, and rootState.
     * @param {String} id - The folder id to delete.
     * @returns {Promise} A promise that awaits the completion of three async calls to the db to delete a folder.
     */
    async deleteFolder({ commit, dispatch, state, rootState }, id) {
      const folders = state.list.filter(folder => folder._id !== id)
      try {
        await axios.delete('/api/folders/' + id)
        await dispatch('bookmarks/deleteAllBookmarksInFolder', id, { root: true })
        await dispatch('tags/getUserTags', rootState.users.currentUser._id, { root: true })
        commit('setFolders', folders)
      } catch (e) {
        return console.error(e)
      }
    }
  }
}
