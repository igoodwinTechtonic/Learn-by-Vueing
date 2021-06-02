import axios from 'axios'

export default {
  namespaced: true,
  state: {
    currentUser: {}
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    /** GETS a user from db if exists, otherwise POSTS new user
     * 
     * @param {Object} param0 - Destructured into commit, dispatch, state.
     * @param {Object} user - The user object retrieved from Auth0.
     * @returns {Void}
     */
    async getUser({ commit, dispatch, state }, user) {
      try {
        const res = await axios.post('/api/users/', { name: user.name, email: user.email })
        commit('setUser', res.data)
        await dispatch('getUserData', state.currentUser._id)
      } catch (err) {
        console.error(err)
      }
    },
    /** Dispatches actions to get data from db when user logs in
     * 
     * @param {Object} param0 - Dispatches into commit.
     * @param {string} id - The user id to retrieve data with.
     * @returns {Void}
     */
    async getUserData({ dispatch }, id) {
      await dispatch('folders/getFolders', id, { root: true })
      await dispatch('bookmarks/getBookmarks', id, { root: true })
      await dispatch('tags/getUserTags', id, { root: true })
    },
    /** Commits actions to clear all app state
     * 
     * @param {Object} param0 - Commit function
     * @returns {Void}
     */
    clearUserData({ commit }) {
      commit('bookmarks/resetState', {}, { root: true })
      commit('folders/resetState', {}, { root: true })
      commit('tags/resetState', {}, { root: true })
      commit('setUser', {})
    }
  },
}
