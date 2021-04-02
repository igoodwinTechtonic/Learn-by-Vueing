<template>
  <v-container>
    <v-card class="insert-bookmark-card">
      <v-row>
        <v-col class="inner-grid">
          <v-card-title
            ><v-text-field :placeholder="bookmarkToAdd.title" :rules="validateField" v-model="customTitle"></v-text-field
          ></v-card-title>
          <div class="img-link-grid">
            <v-img v-if="bookmarkToAdd.favicon" :src="bookmarkToAdd.favicon" max-height="40" max-width="40" style="align-self: center;"></v-img>
            <v-card-subtitle>{{ bookmarkToAdd.url }}</v-card-subtitle>
          </div>
          <v-card-text><v-textarea :placeholder="bookmarkToAdd.description" v-model="customDesc"></v-textarea></v-card-text>
          <TagSelector />
        </v-col>
      </v-row>
      <v-card-actions style="justify-content: center; padding-bottom: 2rem;">
        <v-btn ref="btn" @click="submit()"
          ><v-icon style="padding-right: 1rem;">mdi-bookmark</v-icon>{{ action }} Bookmark</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
// AddBookmark.vue displays a bookmark to add after a link has been pasted into the search field
// or displays a bookmark to edit. Router :action parameter is 'add' or 'edit'.
// Router path: /bookmarks/:name/:action
import * as mdijs from '@mdi/js';
import { mapState } from 'vuex';

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
    // Displays currently selected bookmark's parts and displays them in <template>
    ...mapState('bookmarks', ['bookmarkToAdd']),
    // action and action2 display different words based on route parameters
    action() {
      if (this.$route.params.action === 'add') return 'Add';
      return 'Edit';
    },
    action2() {
      if (this.$route.params.action === 'add') return 'to';
      return 'in';
    },
  },
  methods: {
    async submit() {
      
      const newBookmark = {
        ...this.$store.state.bookmarks.bookmarkToAdd,
        user_id: this.$store.state.users.currentUser._id,
        folder_id: this.$store.state.folders.selectedFolder._id,
        title: this.customTitle,
        description: this.customDesc,
        url: this.$store.state.bookmarks.bookmarkToAdd.url,
        tags: this.$store.state.tags.currentBookmarkTags,
        dateCreated: new Date()
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
        params: {
          name: this.$store.state.folders.selectedFolder.name.toLowerCase().replace(/\s/g, '-'),
          id: this.$store.state.folders.selectedFolder._id
        },
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
