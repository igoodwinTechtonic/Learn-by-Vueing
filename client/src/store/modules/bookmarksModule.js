import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: [],
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
    getBookmarks({ commit }) {
      return axios.get('/api/bookmarks')
        .then((res) => commit('setBookmarks', res.data))
        .catch((err) => console.error(err));
    },
    addBookmark({ commit, state }, bookmark) {
      const bookmarkList = [...state.list, bookmark];
      return axios
        .post('/api/bookmarks', bookmark)
        .then(() => commit('setBookmarks', bookmarkList))
        .catch((err) => console.error(err));
    },
    deleteBookmark({ commit, state }, id) {
      const bookmarkList = state.list.filter(bookmark => bookmark._id !== id);
      // console.log(bookmarkList, id)
      return axios
        .delete('/api/bookmarks/' + id)
        .then(() => commit('setBookmarks', bookmarkList))
        .catch((err) => console.error(err));
    }
  }
}
