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

      <v-row class="filter-options">
        <v-col>
          <v-text-field
            dense
            filled
            placeholder="Type to filter bookmarks"
            v-model="filter"
          ></v-text-field>
        </v-col>
          <!-- Expand the checkbox menu on click on mobile -->
          <!-- Display automatically on desktop -->
        <v-col style="flex-grow: 0;">
          <v-menu top :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                <v-icon>{{ hamIcon }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <!-- <v-list-item v-for="(item, idx) in items" :key="idx">
                <v-checkbox class="checkbox-pos" hide-details="auto" :label="item.label" :v-model="item.model"></v-checkbox>
              </v-list-item> -->
              <v-list-item>
                <h3>Filter by:</h3>
              </v-list-item>
              <v-list-item>
                <v-checkbox
                  class="checkbox-pos"
                  label="Title"
                  v-model="checkboxTitle"
                  hide-details="auto"
                ></v-checkbox>
              </v-list-item>
              <v-list-item>
                <v-checkbox
                  class="checkbox-pos"
                  label="Description"
                  v-model="checkboxDesc"
                  hide-details="auto"
                ></v-checkbox>
              </v-list-item>
              <v-list-item>
                <v-checkbox
                  class="checkbox-pos"
                  label="URL"
                  v-model="checkboxURL"
                  hide-details="auto"
                ></v-checkbox>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>

      <v-list three-line id="bookmarks-list">
        <Bookmark v-for="(bookmark, idx) in bookmarks" :key="idx" :bookmark="bookmark" />
      </v-list>
    </div>
  </v-container>
</template>

<script>
// PublicFolder.vue view displays all bookmarks in a selected folder in v-main
// Router path: /public/:name/:id
import * as mdijs from '@mdi/js';
import { mapState } from 'vuex';

import Bookmark from '../components/Bookmark';

export default {
  name: 'PublicFolder',
  components: {
    Bookmark
  },
  data() {
    return {
      errorView: false,
      filter: '',
      hamIcon: mdijs.mdiFilterVariant,
      // items: [
      //   { label: "Title", model: {checkboxTitle: true} },
      //   { label: "Description", model: {checkboxDesc: true} },
      //   { label: "URL", model: {checkboxURL: true} },
      // ]
      checkboxTitle: true,
      checkboxDesc: true,
      checkboxURL: true
    }
  },
  async created() {
    if (this.$route.params.id && !this.$auth.isAuthenticated) {
      await this.$store.dispatch('bookmarks/getBookmarksFromPublicFolder', this.$route.params.id)
      if (this.$store.state.bookmarks.list.length === 0 ||
          Object.keys(this.$store.state.folders.selectedFolder).length === 0) {
        this.errorView = true;
      }
    }
  },
  updated() {
    if (this.$route.params.id && this.$route.params.name && this.$auth.isAuthenticated) {
      this.$router.push({ name: "Folder", params: {name: this.$route.params.name, id: this.$route.params.id} })
    }
  },
  computed: {
    // Uses a mapState shorthand to grab selectedFolder from folders module
    ...mapState('folders', ['selectedFolder']),
    // Lists all bookmakrs that have the same folder id as the selected folder
    bookmarks() {
      let list = this.$store.state.bookmarks.list.filter((bookmark) =>
        bookmark.folder_id === this.$store.state.folders.selectedFolder._id
      )
      if (this.filter) {
        const filteredBookmarks = list.filter(bookmark => 
          this.checkboxTitle && bookmark.title.toLowerCase().includes(this.filter.toLowerCase()) ||
          this.checkboxDesc && bookmark.description.toLowerCase().includes(this.filter.toLowerCase()) ||
          this.checkboxURL && bookmark.url.toLowerCase().includes(this.filter.toLowerCase())
        )
        list = filteredBookmarks
      }
      return this.sortBookmarksByTitle(list)
    },
    icon() {
      return mdijs[this.selectedFolder.icon]
    }
  },
  methods: {
    sortBookmarksByTitle(bookmarks) {
      if (bookmarks.length === 0) return [];
      else if (bookmarks.length === 1) return bookmarks;
      else {
        // Prevents infinite loop because of changing tags by reference
        const sortedBookmarks = [...bookmarks];
        sortedBookmarks.sort((a, b) => {
          let tagA = a.title.toUpperCase();
          let tagB = b.title.toUpperCase();
          return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
        });
        return sortedBookmarks;
      }
    }
  }
};
</script>

<style lang="scss">
.error-card {
  margin-top: 5rem;
  padding: 2rem;
}
.folder-name {
  text-align: center;
  padding-bottom: 1rem;
}
.checkbox-pos {
  margin: 0;
}
</style>
