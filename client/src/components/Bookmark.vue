<template>
  <v-list three-line style="padding: 0;">
    <v-list-item class="card" style="min-height: 48px;" :href="bookmark.url" target="_blank" @contextmenu="show">
      <v-tooltip bottom transition="v-fade-transition">
        <!-- This is the actual bookmark content -->
        <template v-slot:activator="{ on, attrs }">
          <span class="bookmark-item" v-bind="attrs" v-on="on">
            <v-list-item-avatar size="30" style="margin: 0 1rem 0 0;">
              <!-- <v-img src="bookmark.images[0]"></v-img> -->
              <v-img :src="bookmark.favicons[0]"></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-html="bookmark.title"></v-list-item-title>
          </span>
        </template>

        <!-- This exists in the tooltip -->
        <span>
          <v-list-item-subtitle v-html="bookmark.description"></v-list-item-subtitle>
          <v-list-item-subtitle v-html="bookmark.url"></v-list-item-subtitle>
          <v-list style="background: none;">
            <v-chip v-for="(tag, idx) in sortedTags(bookmark.tags)" :key="idx" style="margin-right: 0.2rem;">{{
              tag
            }}</v-chip>
          </v-list>
        </span>
      </v-tooltip>

      <v-divider></v-divider>

      <!-- This exists in the custom right-click menu -->
      <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
        <v-list>
          <v-list-item v-for="(item, idx) in rightClickItems" :key="idx" @click="item.event">
            <v-icon style="margin-right: 4px;">{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item>
  </v-list>
</template>

<script>
// Displays one bookmark, includes logic for editing, deleting, and click a bookmark
import { mdiContentCopy, mdiSquareEditOutline, mdiTrashCan } from '@mdi/js';

export default {
  name: 'Bookmark',
  props: {
    bookmark: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      rightClickItems: [
        { title: 'Copy URL', icon: mdiContentCopy, event: this.copyUrl },
        { title: 'Edit', icon: mdiSquareEditOutline, event: this.editBookmark },
        { title: 'Delete', icon: mdiTrashCan, event: this.deleteBookmark },
      ],
    };
  },
  methods: {
    // Copies url of selected bookmark to clipboard
    copyUrl() {
      navigator.clipboard.writeText(this.bookmark.url);
    },
    // Reopens AddBookmark vue with data to update the bookmark
    editBookmark() {
      console.log('edit bookmark', this.bookmark);
    },
    // DELETES a bookmark and removes tags if it's the last bookmark with the tag
    deleteBookmark() {
      console.log(this.bookmark);
      this.$store.dispatch('bookmarks/deleteBookmark', { id: this.bookmark._id, tags: this.bookmark.tags });
    },
    // Sorts tags alphabetically by name
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
    // Shows / hides the custom right-click menu
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
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
</style>
