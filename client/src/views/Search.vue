<template>
  <v-container class="no-items-container">
    <v-card v-if="searchKeywords === ''" class="no-items-card mx-auto" style="margin-top: 6rem">
      <h2 style="text-align: center;">
        Start typing to search
      </h2>
      <v-divider style="margin: 1rem;"></v-divider>
      <h2 style="text-align: center;">
        Or paste a link to add a bookmark to your
      </h2>
      <h2 style="text-align: center;">
        <v-icon>{{ selectedFolderIcon }}</v-icon> {{ selectedFolderName }} folder.
      </h2>
    </v-card>

    <v-list v-else class="container--grid" style="flex: 1;">
      <v-list three-line id="bookmarks-list">
        <Bookmark v-for="(bookmark, idx) in bookmarks" :key="idx" :bookmark="bookmark" />
      </v-list>
    </v-list>
  </v-container>
</template>

<script>
// Search.vue displays search results when a user searches for bookmarks
import * as mdijs from '@mdi/js';

import Bookmark from '../components/Bookmark';

export default {
  name: 'Search',
  components: {
    Bookmark,
  },
  computed: {
    searchKeywords() {
      return this.$store.state.searchKeywords;
    },
    bookmarks() {
      return this.$store.state.bookmarks.searchResults;
    },
    selectedFolderName() {
      return this.$store.state.folders.selectedFolder.name;
    },
    selectedFolderIcon() {
      return mdijs[this.$store.state.folders.selectedFolder.icon];
    },
  },
};
</script>

<style></style>
