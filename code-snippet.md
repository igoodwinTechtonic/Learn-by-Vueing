# Thought I was going to use this, but didn't

## Now I want to hold onto this logic cuz it took me forever to figure out

Getting tags to update in a silly but complicated way:

```js
// In tags module:
getTags({ commit }) {
  return axios.get('/api/users/tags')
    .then((res) => commit('setTags', res.data.tags))
    .catch((err) => console.error(err))
},
POSTS new tags and/or UPDATES count of existing tags from the AddBookmark.vue dialog
updateTagList({ commit, state, rootState }) {
  let updatedTags = [...state.currentBookmarkTags];
  state.list.forEach(tagInState => {
    if (!(updatedTags.map(tag => tag.name).includes(tagInState.name))) {
      // If a tag in state is not in currentBookmarkTags, keep it the same and readd to list
      updatedTags = [...updatedTags, tagInState]
    }
  })
  commit('setTags', updatedTags)

  const putTags = {
    _id: rootState.users.currentUser._id,
    tags: updatedTags
  }

  return axios
    .put('/api/users/tags', putTags)
    .then(() => commit('setTags', updatedTags))
    .catch((err) => console.error(err));
},

```

The other half of the logic to mess with tags:

```js
// Set tag list in state, tags are posted to db in parent component, AddBookmark, when bookmark is submitted
setTags() {
  const updatedTags = this.chips.map((tag) => {
    if (this.items.includes(tag)) {
      let tagCountToIncrement = this.$store.state.tags.list.find((tagInState) => tagInState.name === tag).count;
      // If the tag is in state.list, don't add, increase count by 1
      return { name: tag, count: (tagCountToIncrement += 1) };
    }
    // If the tag is not in state.list, add a new object { name: tag, count: 1 }
    return { name: tag, count: 1 };
  });
  this.$store.commit('tags/setCurrentBookmarkTags', this.chips);
```

Sorts tags alphabetically by name

```js
sortedTags(tags) {
  if (tags.length === 0) return [];
  else if (tags.length === 1) return tags;
  else {
    // Prevents infinite loop because of changing tags by reference
    const sortedTags = [...tags];
    sortedTags.sort((a, b) => {
      let tagA = a.toUpperCase();
      let tagB = b.toUpperCase();
      return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
    });
    return sortedTags;
  }
},
```

Sets a ref and focus on the add/edit button when the component loads

```js
mounted() {
  this.$refs.btn.$el.focus();
},
updated() {
  this.$refs.btn.$el.focus();
},
```
