<template>
  <v-container>
    <v-card class="insert-bookmark-card">
      <v-row>
        <v-col class="inner-grid">
          <v-card-title
            ><v-text-field :placeholder="title" :rules="validateField" v-model="customTitle"></v-text-field
          ></v-card-title>
          <div class="img-link-grid">
            <v-img v-if="favicon" :src="favicon" max-height="40" max-width="40" style="align-self: center;"></v-img>
            <v-card-subtitle>{{ url }}</v-card-subtitle>
          </div>
          <v-card-text><v-textarea :placeholder="description" v-model="customDesc"></v-textarea></v-card-text>
          <TagSelector />
        </v-col>
      </v-row>
      <v-card-actions style="justify-content: center; padding-bottom: 2rem;">
        <v-btn ref="btn" @click="submit()"
          ><v-icon style="padding-right: 1rem;">mdi-bookmark</v-icon>{{ action }} Bookmark</v-btn
        >
      </v-card-actions>
      <!-- <v-card-actions style="justify-content: center; padding-bottom: 2rem;">
        <v-card-title
          >{{ action2 }} <v-icon style="padding: 0 4px;">{{ selectedFolderIcon }}</v-icon>
          {{ selectedFolder.name }} folder
        </v-card-title>
      </v-card-actions> -->
    </v-card>
  </v-container>
</template>

<script>
// AddBookmark.vue displays a bookmark to add after a link has been pasted into the search field
// or displays a bookmark to edit. Router :action parameter is 'add' or 'edit'.
// Router path: /bookmarks/:name/:action
import * as mdijs from '@mdi/js';

import TagSelector from '../components/TagSelector.vue';

export default {
  name: 'AddBookmark',
  components: {
    TagSelector,
  },
  data() {
    return {
      customTitle: this.$store.state.bookmarks.bookmarkToAdd.title,
      customDesc: this.$store.state.bookmarks.bookmarkToAdd.description,
      validateField: [(field) => (field && field.length > 0) || 'Required.'],
    };
  },
  created() {
    if (this.$route.params.action === 'edit') {
      this.$store.commit('tags/setCurrentBookmarkTags', this.$store.state.bookmarks.bookmarkToAdd.tags);
    }
    if (this.$route.params.action === 'add') this.$store.commit('tags/setCurrentBookmarkTags', []);
  },
  computed: {
    // action and action2 display different words based on route parameters
    action() {
      if (this.$route.params.action === 'add') return 'Add';
      return 'Edit';
    },
    action2() {
      if (this.$route.params.action === 'add') return 'to';
      return 'in';
    },
    // Displays currently selected bookmark's parts and displays them in <template>
    title() {
      return this.$store.state.bookmarks.bookmarkToAdd.title;
    },
    description() {
      return this.$store.state.bookmarks.bookmarkToAdd.description;
    },
    url() {
      return this.$store.state.bookmarks.bookmarkToAdd.url;
    },
    // image() {
    //   const images = this.$store.state.bookmarks.bookmarkToAdd.images;
    //   return images && images.length != 0 && images[0];
    // },
    favicon() {
      const favicons = this.$store.state.bookmarks.bookmarkToAdd.favicons;
      return favicons && favicons.length != 0 && favicons[0];
    },
    // Displays the currently selected folder's parts and displays them in <template>
    selectedFolder() {
      return this.$store.state.folders.selectedFolder;
    },
    selectedFolderIcon() {
      return this.displayIcon(this.$store.state.folders.selectedFolder.icon);
    },
  },
  methods: {
    async submit() {
      const newBookmark = {
        ...this.$store.state.bookmarks.bookmarkToAdd,
        title: this.customTitle,
        description: this.customDesc,
        user_id: this.$store.state.users.currentUser._id,
        folder_id: this.$store.state.folders.selectedFolder._id,
        tags: this.$store.state.tags.currentBookmarkTags,
        dateCreated: new Date(),
      };
      // POST bookmark if adding
      if (this.$route.params.action === 'add') {
        await this.$store.dispatch('bookmarks/addBookmark', newBookmark);
      }
      // UPDATE bookmark if editing
      else if (this.$route.params.action === 'edit') {
        await this.$store.dispatch('bookmarks/editBookmark', newBookmark);
      }
      // GET tags and update list
      await this.$store.dispatch('tags/getUserTags', this.$store.state.users.currentUser._id);
      // Push to folder once async actions are completed
      this.$router.push({
        name: 'Folder',
        params: { name: this.$store.state.folders.selectedFolder.name.toLowerCase().replace(/\s/g, '-') },
      });
      // Clear selected tags from state
      this.$store.commit('tags/setCurrentBookmarkTags', []);
    },
    // Display icon for selected folder icon in <template>
    displayIcon(icon) {
      return mdijs[icon];
    },
  },
};
</script>

<style scoped>
.insert-bookmark-card {
  margin: 3rem;
}
.img-link-grid {
  padding-left: 2rem;
  display: grid;
  grid-template-columns: 50px 1fr;
}
.inner-grid > * {
  padding: 0 1rem;
}
</style>
