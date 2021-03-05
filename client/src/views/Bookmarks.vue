<template>
  <v-list class="container--grid" style="flex: 1;">
    <NoItemsCard v-if="bookmarks.length === 0" />
    <v-list v-else three-line id="bookmarks-list">
      <Bookmark v-for="(bookmark, idx) in bookmarks" :key="idx" :bookmark="bookmark" />
    </v-list>
  </v-list>
</template>

<script>
// Tags.vue displays all bookmarks with a tag
// Router path: /bookmarks/:name
import NoItemsCard from '../components/NoItemsCard.vue';
import Bookmark from '../components/Bookmark.vue';

export default {
  name: 'Tags',
  components: {
    Bookmark,
    NoItemsCard,
  },
  computed: {
    // Displays bookmarks based on route parameter, either a folder or tag name
    bookmarks() {
      if (this.$route.params.name) {
        return this.$store.state.bookmarks.list.filter(
          (bookmark) => bookmark.folder_id === this.$store.state.folders.selectedFolder._id
        );
      } else if (this.$route.params.tag) {
        return this.$store.state.bookmarks.list.filter((bookmark) => bookmark.tags.includes(this.$route.params.tag));
      }
      return {};
    },
  },
};
</script>

<style></style>
