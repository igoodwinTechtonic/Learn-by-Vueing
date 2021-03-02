import axios from 'axios';

// Tags are stored under the user endpoint as an array 

export default {
  namespaced: true,
  state: {
    list: [],
    selectedTag: "",
    currentBookmarkTags: [],
  },
  mutations: {
    setTags(state, tags) {
      if (tags.length === 0 || tags[0] === "") state.list = [];
      else if (tags.length === 1) state.list = tags;
      else {
        // Prevents infinite loop because of changing tags by reference
        const sortedTags = [...tags];
        sortedTags.sort((a, b) => {
          let tagA = a.toUpperCase();
          let tagB = b.toUpperCase();
          return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
        });
        state.list = sortedTags;
      }
    },
    setSelectedTag(state, payload) {
      state.selectedTag = payload
    },
    setCurrentBookmarkTags(state, payload) {
      state.currentBookmarkTags = payload
    },
    sortTags(state) {
      if (state.list.length === 0 || state.tags.length === 1) return;
      else {
        // Prevents infinite loop because of changing tags by reference
        const sortedTags = [...state.list.tags];
        sortedTags.sort((a, b) => {
          let tagA = a.toUpperCase();
          let tagB = b.toUpperCase();
          return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
        });
        this.setTags(sortedTags);
      }
    }
  },
  actions: {
    getTags({ commit }) {
      return axios.get('/api/users/tags')
        .then((res) => commit('setTags', res.data.tags))
        .catch((err) => console.error(err))
    },
    updateTagList({ commit, state }) {
      const newTagsToAdd = () => {
        let newTagsToAdd = [];
        state.currentBookmarkTags.map((tag) => {
          if (!state.list.includes(tag)) newTagsToAdd.push(tag);
        })
        return newTagsToAdd;
      };
      const allTags = [...state.list, ...newTagsToAdd()];
      console.log(allTags);
      return axios
        .put('/api/users/tags', allTags)
        .then(() => commit('setTags', allTags))
        .catch((err) => console.error(err));

    },
    deleteTag({ commit, state }, id) {
      const tags = state.list.filter(tag => tag._id !== id);
      return axios
        .delete('/api/users/tags' + id)
        .then(() => commit('setTags', tags))
        .catch((err) => console.error(err));
    }
    // const tagsList = [...state.list, tags];
    // return axios
    //   .put('/api/users/tags', JSON.stringify(tags), {
    //     headers: {
    //       "Content-Type": "application/json",
    //     }
    //   })
    //   .then(() => commit('setTags', tagsList))
    //   .catch((err) => console.error(err));
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

  }
}