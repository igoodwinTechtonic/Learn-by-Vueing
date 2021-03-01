<template>
  <v-list class="container--grid" style="flex: 1;">
    <v-list-item v-if="bookmarks.length === 0">
      <NoItemsCard />
    </v-list-item>
    <v-list-item v-else class="card" v-for="(bookmark, idx) in bookmarks" :key="idx">
      <BookmarkCard :bookmark="bookmark" />
    </v-list-item>
  </v-list>
</template>

<script>
// Display all bookmarks when navigating to this component
export default {
  name: 'AllBookmarksList',
  computed: {
    bookmarks() {
      return this.$store.state.bookmarks.list;
    },
  },
};
</script>

<style></style>
