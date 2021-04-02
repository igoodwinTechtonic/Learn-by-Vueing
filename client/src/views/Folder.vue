<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          :disabled="selectedFolder.shareable"
          :rules="validateName"
          :value="selectedFolder.name"
          @change="updateFolderName"
          solo
        >
        </v-text-field>
      </v-col>
      <v-col v-if="selectedFolder.shareable" style="flex-grow: 0;">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="snackbar = true; copyLink();" v-on="on" v-bind="attrs" style="height: 48px;">
              <v-icon>{{ copyIcon }}</v-icon>
            </v-btn>
          </template>
          <span>Copy link to clipboard</span>
        </v-tooltip>
        <v-snackbar
          v-model="snackbar"
          timeout="2000"
          rounded="pill"
        >
          Link copied to clipboard!
          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
    <NoItemsCard v-if="bookmarks.length === 0" />
    <Bookmarks v-else />
    <DeleteFolderDialog />
  </v-container>
</template>

<script>
// Folder.vue view displays all bookmarks in a selected folder in v-main
// Router path: /folder/:name/:id
import * as mdijs from '@mdi/js';
import { mapState } from 'vuex';

import Bookmarks from './Bookmarks.vue';
import DeleteFolderDialog from '../components/DeleteFolderDialog.vue';
import NoItemsCard from '../components/NoItemsCard.vue';

export default {
  name: 'Folder',
  components: {
    Bookmarks,
    DeleteFolderDialog,
    NoItemsCard,
  },
  data() {
    return {
      // Validates folder name > 0 chars, displays red message
      snackbar: false,
      validateName: [(name) => (name && name.length > 0) || 'Required.'],
      copyIcon: mdijs.mdiClipboardEditOutline
    };
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
    // Copies public folder link to clipboard
    copyLink() {
      navigator.clipboard.writeText(`${window.location.origin}/public/${this.$route.params.name}/${this.$store.state.folders.selectedFolder._id}`)
    },
    // Displays the trash icon in the delete folder button
    displayIcon(item) {
      return mdijs[item];
    },
    // Updates the folder name
    updateFolderName(newFolderName) {
      if (newFolderName.length > 0) {
        const updatedFolder = { ...this.$store.state.folders.selectedFolder, name: newFolderName };
        this.$store.dispatch('folders/updateFolderName', updatedFolder);
      }
    },
  },
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

