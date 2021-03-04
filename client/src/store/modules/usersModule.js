import axios from 'axios';

// Tags are stored under the user endpoint as an array of objects with a "name" and "count" properties

export default {
  namespaced: true,
  state: {
    currentUser: {},
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload;
      console.log(payload)
    }
  },
  actions: {
    async getUser({ commit, dispatch, state }, user) {
      try {
        // Check if user exists in db with GET using email
        const res = await axios.get('/api/users/' + user.email);
        // POST new user
        if (res.status === 202 && user.email) {
          await axios.post('/api/users', { name: user.name, email: user.email, tags: [] })
          return commit('setUser', { name: user.name, email: user.email, tags: [] })
        }
        // User was successfully received from db
        if (res.status === 200 || res.status === 304) {
          commit('setUser', res.data); // Also receives tags
          commit('tags/setTags', res.data.tags, { root: true });
          await dispatch('getUserData', state.currentUser._id);
        }
      } catch (err) {
        return console.error(err);
      }
    },
    async getUserData({ dispatch }, id) {
      await dispatch('folders/getFolders', id, { root: true });
      await dispatch('bookmarks/getBookmarks', id, { root: true });
      // await dispatch('tags/getTags', id, { root: true });
    }
  },
}
