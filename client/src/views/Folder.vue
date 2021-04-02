<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-if="$auth.isAuthenticated"
          :disabled="selectedFolder.shareable"
          :rules="validateName"
          :value="selectedFolder.name"
          @change="updateFolderName"
          solo
        >
        </v-text-field>
      </v-col>
      <v-col v-if="selectedFolder.shareable && $auth.isAuthenticated" style="flex-grow: 0;">
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
    <v-card class="error-card mx-auto" v-if="errorView">
      <h2 style="text-align: center;">404 - Oops!</h2>
      <h2 style="text-align: center;">Looks like someone either deleted this folder or it's empty.</h2>
    </v-card>
    <div v-if="!errorView">
      <h2 class="folder-name" v-if="!$auth.isAuthenticated">{{ selectedFolder.name }}</h2>
      <hr v-if="!$auth.isAuthenticated" />
      <NoItemsCard v-if="bookmarks.length === 0 && $auth.isAuthenticated" />
      <Bookmarks v-else />
      <DeleteFolderDialog v-if="authenticatedUser" />
    </div>
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
  components: {
    Bookmarks,
    DeleteFolderDialog,
    NoItemsCard,
  },
  data() {
    return {
      // Validates folder name > 0 chars, displays red message
      authenticatedUser: true,
      snackbar: false,
      errorView: false,
      validateName: [(name) => (name && name.length > 0) || 'Required.'],
      copyIcon: mdijs.mdiClipboardEditOutline
    };
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
