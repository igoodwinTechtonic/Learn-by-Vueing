<template>
  <v-container>
    <h1 style="display: none;">{{ selectedFolder.name }}</h1>
    <v-text-field :rules="validateName" :value="selectedFolder.name" @change="updateFolderName" solo> </v-text-field>
    <NoItemsCard v-if="bookmarks.length === 0" />
    <Bookmarks v-else />
    <DeleteFolderDialog />
  </v-container>
</template>

<script>
// Folder.vue view displays all bookmarks in a selected folder in v-main
// Router path: /folder/:name
import * as mdijs from '@mdi/js';
import { mapState } from 'vuex';

import Bookmarks from './Bookmarks.vue';
import DeleteFolderDialog from '../components/DeleteFolderDialog.vue';
import NoItemsCard from '../components/NoItemsCard.vue';

export default {
  name: 'Folder',
  data() {
    return {
      // Validates folder name > 0 chars, displays red message
      validateName: [(name) => (name && name.length > 0) || 'Required.'],
    };
  },
  components: {
    Bookmarks,
    DeleteFolderDialog,
    NoItemsCard,
  },
  computed: {
    // Uses a mapState shorthand to grab selectedFolder from folders module
    ...mapState('folders', ['selectedFolder']),
    // Lists all bookmakrs that have the same folder id as the selected folder
    bookmarks() {
      return this.$store.state.bookmarks.list.filter(
        (bookmark) => bookmark.folder_id === this.$store.state.folders.selectedFolder._id
      );
    },
  },

  methods: {
    // Updates the folder name
    updateFolderName(newFolderName) {
      if (newFolderName.length > 0) {
        const updatedFolder = { ...this.$store.state.folders.selectedFolder, name: newFolderName };
        this.$store.dispatch('folders/updateFolderName', updatedFolder);
      }
    },
    // Displays the trash icon in the delete folder button
    displayIcon(item) {
      return mdijs[item];
    },
  },
};
</script>

<style></style>
