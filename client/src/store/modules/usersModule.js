import axios from 'axios';

export default {
  namespaced: true,
  state: {
    currentUser: {},
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload;
      // console.log(payload)
    }
  },
  actions: {
    /** GETS a user from db if exists, otherwise POSTS new user
     * 
     * @param {Object} param0 - Destructured into commit, dispatch, state.
     * @param {Object} user - The user object retrieved from Auth0.
     * @returns {Promise} A promise after the user is loaded or created.
     */
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
          await dispatch('getUserData', state.currentUser._id);
        }
      } catch (err) {
        return console.error(err);
      }
    },
    /** Dispatches actions to get data from db when user logs in
     * 
     * @param {Object} param0 - Dispatches into commit.
     * @param {string} id - The user id to retrieve data with.
     * @returns {Promise} A promise after the user info is retrieved from the mongo db.
     */
    async getUserData({ dispatch }, id) {
      await dispatch('folders/getFolders', id, { root: true });
      await dispatch('bookmarks/getBookmarks', id, { root: true });
      await dispatch('tags/getUserTags', id, { root: true });
    }
  },
}
