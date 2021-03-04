<template>
  <v-list class="container--grid" style="flex: 1;">
    <NoItemsCard v-if="bookmarks.length === 0" />
    <v-list v-else three-line id="bookmarks-list">
      <Bookmark v-for="(bookmark, idx) in bookmarks" :key="idx" :bookmark="bookmark" />
    </v-list>
  </v-list>
</template>

<script>
// Display all bookmarks from either a selected folder or tag
import NoItemsCard from '../components/NoItemsCard.vue';
import Bookmark from '../components/Bookmark.vue';

export default {
  name: 'AllBookmarksList',
  components: {
    Bookmark,
    NoItemsCard,
  },
  computed: {
    bookmarks() {
      if (this.$route.params.name) {
        return this.$store.state.bookmarks.list.filter((bookmark) => bookmark.folderId);
      } else if (this.$route.params.tag) {
        return this.$store.state.bookmarks.list.filter((bookmark) => bookmark.tags.includes(this.$route.params.tag));
      }
      return {};
    },
  },
};
</script>

<style></style>
