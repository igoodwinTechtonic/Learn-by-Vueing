<template>
  <v-list class="container--grid" style="flex: 1;">
    <NoItemsCard v-if="bookmarksWithTag.length === 0" />
    <Bookmark v-else />
  </v-list>
</template>

<script>
// Display all bookmarks when navigating to this component
import NoItemsCard from '../components/NoItemsCard.vue';
import Bookmark from '../components/Bookmark.vue';

export default {
  name: 'AllBookmarksList',
  components: {
    Bookmark,
    NoItemsCard,
  },
  // props: ['tag'],
  computed: {
    bookmarks() {
      return this.$store.state.bookmarks.list;
    },
    bookmarksWithTag() {
      // console.log(this.$route.params.tag);
      return this.$store.state.bookmarks.list.filter((bookmark) => bookmark.tags.includes(this.$route.params.tag));
    },
  },
};
</script>

<style></style>
