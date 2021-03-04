import axios from 'axios';

export default {
  namespaced: true,
  state: {
    selectedFolder: {},
    list: [],
  },
  mutations: {
    setFolders(state, folders) {
      state.list = folders;
    },
    setSelectedFolder(state, payload) {
      state.selectedFolder = payload
    },
  },
  actions: {
    // Retrieves all folders from a given user id
    getFolders({ commit }, user_id) {
      return axios.get('/api/folders?id=' + user_id)
        .then((res) => {
          commit('setFolders', res.data)
        })
        .catch((err) => console.error(err))
    },
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
    deleteFolder({ commit, state }, id) {
      const folders = state.list.filter(folder => folder._id !== id);
      return axios
        .delete('/api/folders/' + id)
        .then(() => commit('setFolders', folders))
        .catch((err) => console.error(err));
    }
  }
}
