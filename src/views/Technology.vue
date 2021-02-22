<template>
  <v-container>
    <h2>{{ category }}</h2>
    <!-- Button to add a new Tip -->
    <v-divider />

    <!-- Render all bookmark here with a v-for -->
    <div class="spacer"></div>
    <v-list class="container--grid">
      <v-list-item class="card" v-for="(bookmark, idx) in bookmarks" :key="idx">
        <BookmarkCard :bookmark="bookmark" />
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import BookmarkCard from './BookmarkCard.vue';

export default {
  name: 'Technology',
  props: {
    name: { type: String },
  },
  components: {
    BookmarkCard,
  },
  computed: {
    category() {
      const { name } = this;
      return name;
    },
    bookmarks() {
      // Filter bookmarks based on tags from name
      return this.$store.state.bookmarks.filter((bookmark) => bookmark.tags.includes(this.name));
    },
  },
};
</script>

<style lang="scss" scoped>
.spacer {
  padding: 0.5rem;
}
.container--grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  margin-bottom: 2rem;
  max-width: 300px;
  // width: auto;
}
// @media screen and (min-width: 960px) {
//   .container--grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//   }
// }
// @media screen and (min-width: 1264px) {
//   .container--grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//   }
// }
// @media screen and (min-width: 1904px) {
//   .container--grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr 1fr;
//   }
// }
</style>
