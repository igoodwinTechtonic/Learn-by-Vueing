import axios from 'axios';

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
      state.list = folders;
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
     * 
     * @param {Object} param0 - Destructed into commit.
     * @param {string} user_id - The user id.
     * @returns {Promise} A promise after the folders state is set.
     */
    getFolders({ commit }, user_id) {
      return axios.get('/api/folders?id=' + user_id)
        .then((res) => commit('setFolders', res.data))
        .catch((err) => console.error(err))
    },
    /** Adds a folder to the user's folders.
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} folder - The folder object to add to the user's account.
     * @returns {Promise} A promise after the folders state is updated.
     */
    addFolder({ commit, state }, folder) {
      return axios
        .post('/api/folders', JSON.stringify(folder), {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((res) => {
          const addedFolder = res.data.ops[0]
          const folders = [...state.list, addedFolder];
          commit('setSelectedFolder', addedFolder)
          commit('setFolders', folders)
        })
        .catch((err) => console.error(err));
    },
    /** Updates the folder's name
     * 
     * @param {Object} param0 - Destructed into commit and state.
     * @param {Object} updatedFolder - A folder with an updated name.
     * @returns {Promise} A promise after the folder and folder state is updated.
     */
    updateFolderName({ commit, state }, updatedFolder) {
      const { _id, ...folder } = updatedFolder;
      const folders = state.list.filter(folder => folder._id !== _id)
      folders.push(updatedFolder)
      return axios
        .put('/api/folders/' + _id, JSON.stringify(folder), {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(() => commit('setFolders', folders))
        .catch((err) => console.error(err));
    },
    /** Deletes a folder and all bookmarks with the same folder_id, re-gets all tags after deletion
     * 
     * @param {Object} param0 - Destructed into commit, dispatch, state, and rootState.
     * @param {*} id - The folder id to delete.
     * @returns {Promise} A promise that awaits the completion of three async calls to the db to delete a folder.
     */
    async deleteFolder({ commit, dispatch, state, rootState }, id) {
      const folders = state.list.filter(folder => folder._id !== id);
      try {
        await axios.delete('/api/folders/' + id);
        await dispatch('bookmarks/deleteAllBookmarksInFolder', id, { root: true })
        await dispatch('tags/getUserTags', rootState.users.currentUser._id, { root: true })
        commit('setFolders', folders);
      } catch (err) {
        return console.error(err);
      }
    }
  }
}
