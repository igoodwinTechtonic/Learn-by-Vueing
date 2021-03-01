<template>
  <v-container>
    <v-card class="insert-bookmark-card">
      <v-row>
        <v-col class="inner-grid">
          <!-- Title -->
          <v-card-title
            ><v-text-field :placeholder="title" :value="title" :rules="validateField"></v-text-field
          ></v-card-title>
          <div class="img-link-grid">
            <!-- Image -->
            <v-img v-if="favicon" :src="favicon" max-height="40" max-width="40" style="align-self: center;"></v-img>
            <!-- Link -->
            <v-card-subtitle>{{ url }}</v-card-subtitle>
          </div>
          <!-- Desc -->
          <v-card-text><v-textarea :placeholder="description" :value="description"></v-textarea></v-card-text>
          <!-- Tags -->
          <TagSelector />
        </v-col>
      </v-row>
      <v-card-actions style="justify-content: center; padding-bottom: 2rem;">
        <v-btn ref="btn" @click="submit()"
          ><v-icon style="padding-right: 1rem;">mdi-bookmark</v-icon>Add Bookmark</v-btn
        >
        <v-card-title
          >to <v-icon style="padding: 0 4px;">{{ selectedFolderIcon }}</v-icon>
          {{ selectedFolder.name }} folder</v-card-title
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import * as mdijs from '@mdi/js';

import TagSelector from '../components/TagSelector.vue';

export default {
  name: 'AddBookmark',
  components: {
    TagSelector,
  },
  data() {
    return {
      validateField: [(field) => (field && field.length > 0) || 'Required.'],
    };
  },
  computed: {
    title() {
      return this.$store.state.selectedBookmark.title;
    },
    description() {
      return this.$store.state.selectedBookmark.description;
    },
    url() {
      return this.$store.state.selectedBookmark.url;
    },
    image() {
      const images = this.$store.state.selectedBookmark.images;
      return images && images.length != 0 && images[0];
    },
    favicon() {
      const favicons = this.$store.state.selectedBookmark.favicons;
      return favicons && favicons.length != 0 && favicons[0];
    },
    selectedFolder() {
      return this.$store.state.selectedFolder;
    },
    selectedFolderIcon() {
      return this.displayIcon(this.$store.state.selectedFolder.icon);
    },
  },
  methods: {
    submit() {
      this.$store
        .dispatch('bookmarks/addBookmark', {
          ...this.$store.state.selectedBookmark,
          folder: this.$store.state.selectedFolder.name,
          tags: this.$store.state.selectedTags,
          dateCreated: new Date(),
          public: true,
        })
        .then(() =>
          this.$router.push({
            name: 'Folder',
            params: { name: this.$store.state.selectedFolder.name.toLowerCase().replace(/\s/g, '-') },
          })
        );
    },
    displayIcon(icon) {
      return mdijs[icon];
    },
  },
  mounted() {
    this.$refs.btn.$el.focus();
  },
  updated() {
    this.$refs.btn.$el.focus();
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
  /* display: flex;
  justify-content: center;
  align-items: center; */
  padding: 0 1rem;
}
</style>
