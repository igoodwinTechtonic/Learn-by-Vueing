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
     * Updates axios headers to include JSON web token received from server
     * 
     * @param {Object} param0 - Destructured into commit, dispatch, state.
     * @param {Object} user - The user object retrieved from Auth0.
     * @returns {Promise}
     */
    async getUser({ commit, dispatch, state }, user) {
      try {
        const res = await axios.post('/api/users/', { name: user.name, email: user.email })
        // Return user to home screen with error message if 401 forbidden is returned
        commit('setUser', res.data)
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        await dispatch('getUserData', state.currentUser._id)

        return false // if successful

      } catch (err) {
        // Handle unauthorized user error
        // console.log(err.response)
        if (err.response.status === 401) {
          return err.response // if failed
        }
        // const { response } = err;
        // const { request, ...errorObject } = response; // take everything but 'request'
        // console.log(request, errorObject);
      }
    },
    /** Dispatches actions to get data from db when user logs in
     * 
     * @param {Object} param0 - Dispatches into commit.
     * @param {string} id - The user id to retrieve data with.
     * @returns {Promise}
     */
    async getUserData({ dispatch }, id) {
      await dispatch('folders/getFolders', id, { root: true })
      await dispatch('bookmarks/getBookmarks', id, { root: true })
      await dispatch('tags/getUserTags', id, { root: true })
    },
    /** Commits actions to clear all app state when logging out
     * 
     * @param {Object} param0 - Commit function
     * @returns {Promise}
     */
    clearUserData({ commit }) {
      commit('bookmarks/resetState', {}, { root: true })
      commit('folders/resetState', {}, { root: true })
      commit('tags/resetState', {}, { root: true })
      commit('setUser', {})
    },
    /** Deletes user session when logout button is clicked
     * 
     * @param {Object} param0 - State
     * @returns {Promise}
     */
    async deleteUserSession({ state }) {
      await axios.delete('/api/sessions/' + state.currentUser.email)
    }
  },
}
