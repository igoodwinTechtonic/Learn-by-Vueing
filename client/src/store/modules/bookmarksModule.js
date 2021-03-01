import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    setBookmarks(state, bookmarks) {
      state.list = bookmarks;
    }
  },
  actions: {
    getBookmarks({ commit }) {
      axios.get('/api/bookmarks')
        .then((res) => commit('setBookmarks', res.data))
        .catch((err) => console.error(err));
    },
    addBookmark({ commit, state }, bookmark) {
      const bookmarkList = [...state.list, bookmark];
      return axios
        .post('/api/bookmarks', bookmark)
        .then(() => commit('setBookmarks', bookmarkList))
    },
  }
}
