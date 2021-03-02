<template>
  <v-list three-line id="bookmarks-list">
    <v-list-item
      class="card"
      v-for="(bookmark, idx) in bookmarks"
      :key="idx"
      style="min-height: 48px;"
      :href="bookmark.url"
      target="_blank"
    >
      <v-tooltip bottom transition="v-fade-transition">
        <template v-slot:activator="{ on, attrs }">
          <span class="bookmark-item" v-bind="attrs" v-on="on">
            <v-list-item-avatar v-if="displayImage || displayFavicon" size="30" style="margin: 0 1rem 0 0;">
              <v-img v-if="displayImage" :src="bookmark.images[0]"></v-img>
              <v-img v-else-if="displayFavicon" :src="bookmark.favicons[0]"></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-if="displayTitle" v-html="bookmark.title"></v-list-item-title>
          </span>
        </template>

        <span>
          <v-list-item-subtitle v-if="displayDescription" v-html="bookmark.description"></v-list-item-subtitle>
          <v-list-item-subtitle v-if="displayUrl" v-html="bookmark.url"></v-list-item-subtitle>
          <v-list v-if="displayTags" style="background: none;">
            <v-chip v-for="(tag, idx) in sortedTags(bookmark.tags)" :key="idx" style="margin-right: 0.2rem;">{{
              tag
            }}</v-chip>
          </v-list>
        </span>
      </v-tooltip>

      <v-divider></v-divider>

      <!-- <v-btn @click="deleteBookmark(bookmark._id)" style="z-index: 1;">
        <v-icon>{{ trashIcon }}</v-icon>
      </v-btn> -->
    </v-list-item>
  </v-list>
</template>

<script>
import { mdiTrashCan } from '@mdi/js';

export default {
  name: 'Bookmark',
  computed: {
    bookmarks() {
      if (this.$route.params.name) {
        return this.$store.state.bookmarks.list.filter((bookmark) => bookmark.folderId);
      } else if (this.$route.params.tag) {
        return this.$store.state.bookmarks.list.filter((bookmark) => bookmark.tags.includes(this.$route.params.tag));
      }
      return {};
    },
    trashIcon() {
      return mdiTrashCan;
    },
    displayTitle() {
      return this.$store.state.displaySettings.title;
    },
    displayUrl() {
      return this.$store.state.displaySettings.url;
    },
    displayImage() {
      return this.$store.state.displaySettings.image;
    },
    displayFavicon() {
      return this.$store.state.displaySettings.favicon;
    },
    displayDescription() {
      return this.$store.state.displaySettings.description;
    },
    displayTags() {
      return this.$store.state.displaySettings.tags;
    },
  },
  methods: {
    deleteBookmark() {
      this.$store.dispatch('bookmarks/deleteBookmark', this.bookmark._id);
    },
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
  },
};
</script>

<style lang="scss" scoped>
// .v-card {
//   transition: opacity 0.4s ease-in-out;
// }
// .v-card:not(.on-hover) {
//   opacity: 0.8;
// }
.bookmark-item {
  display: flex;
}
.narrow-icon {
}
</style>
