import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    setTags(state, tags) {
      state.list = tags;
    }
  },
  actions: {
    getTags({ commit }) {
      axios.get('/api/tags')
        .then((res) => commit('setTags', res.data))
        .catch((err) => console.error(err))
    },
    addTag({ commit, state }, tag) {
      const tags = [...state.list, tag];
      return axios
        .post('/api/tags', JSON.stringify(tag), {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(() => commit('setTags', tags))
    },
    // updateTagName({ commit, state }, updatedFolder) {
    //   const { _id, ...folder } = updatedFolder;
    //   const folders = state.list.filter(folder => folder._id !== _id)
    //   folders.push(updatedFolder)
    //   return axios
    //     .put('/api/folder/' + _id, JSON.stringify(folder), {
    //       headers: {
    //         "Content-Type": "application/json",
    //       }
    //     })
    //     .then(() => commit('setTags', folders))
    // },
    deleteTag({ commit, state }, id) {
      const tags = state.list.filter(tag => tag._id !== id);
      return axios
        .delete('/api/tags/' + id)
        .then(() => commit('setTags', tags))
    }
  }
}