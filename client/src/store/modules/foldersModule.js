import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    setFolders(state, folders) {
      state.list = folders;
      // console.log(folders)
    }
  },
  actions: {
    getFolders({ commit }) {
      axios.get('/api/folders')
        .then((res) => commit('setFolders', res.data))
        .catch((err) => console.error(err))
    },
    addFolder({ commit, state }, folder) {
      const folders = [...state.list, folder];
      return axios
        .post('/api/folders', JSON.stringify(folder), {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(() => commit('setFolders', folders))
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
    },
    deleteFolder({ commit, state }, id) {
      const folders = state.list.filter(folder => folder._id !== id);
      return axios
        .delete('/api/folders/' + id)
        .then(() => commit('setFolders', folders))
    }
  }
}
