<template>
  <v-container>
    <v-card class="error-card mx-auto" v-if="errorView">
      <h2 style="text-align: center;">404 - Oops!</h2>
      <h2 style="text-align: center;">Looks like someone either deleted this folder or it's empty.</h2>
    </v-card>
    <div v-if="!errorView">
      <h2 class="folder-name" v-if="!$auth.isAuthenticated">
        <v-icon>{{ icon }}</v-icon>
        {{ selectedFolder.name }}
      </h2>
      <v-text-field
        dense
        filled
        placeholder="Type to filter bookmarks"
        v-model="filter"
      ></v-text-field>
      <!-- <hr /> -->
      <Bookmarks />
    </div>
  </v-container>
</template>

<script>
// PublicFolder.vue view displays all bookmarks in a selected folder in v-main
// Router path: /public/:name/:id
import * as mdijs from '@mdi/js';
import { mapState } from 'vuex';

import Bookmarks from './Bookmarks.vue';

export default {
  name: 'PublicFolder',
  components: {
    Bookmarks,
  },
  data() {
    return {
      errorView: false,
      filter: ''
    }
  },
  async created() {
    if (this.$route.params.id && !this.$auth.isAuthenticated) {
      this.authenticatedUser = false
      await this.$store.dispatch('bookmarks/getBookmarksFromPublicFolder', this.$route.params.id)
      if (this.$store.state.bookmarks.list.length === 0 ||
          Object.keys(this.$store.state.folders.selectedFolder).length === 0) {
        this.errorView = true;
      }
    }
  },
  computed: {
    // Uses a mapState shorthand to grab selectedFolder from folders module
    ...mapState('folders', ['selectedFolder']),
    // Lists all bookmakrs that have the same folder id as the selected folder
    bookmarks() {
      let list = this.$store.state.bookmarks.list.filter(
        (bookmark) => bookmark.folder_id === this.$store.state.folders.selectedFolder._id
      )
      if (this.filter) {
        const filteredBookmarks = list.filter(bookmark => bookmark.title.includes(this.filter))
        list = filteredBookmarks
      }
      return list
    },
    icon() {
      return mdijs[this.selectedFolder.icon]
    }
  },
  methods: {
    filterBookmarks() {
      
    }
  }
};
</script>

<style>
.error-card {
  margin-top: 5rem;
  padding: 2rem;
}
.folder-name {
  text-align: center;
  padding-bottom: 1rem;
}
</style>
