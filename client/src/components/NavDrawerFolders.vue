<template>
  <v-list width="230" nav dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Folders
        </v-list-item-title>
        <v-list-item-subtitle>
          Click to see your bookmarks.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list>
      <v-list-item v-if="folders.length === 0">
        <v-list-item-content>
          <v-list-item-title>
            You don't have any folders yet.
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        style="margin-bottom: 0;"
        v-for="folder in folders"
        :key="folder.name"
        :to="{ name: 'Folder', params: { name: folder.name.toLowerCase().replace(/\s/g, '-') } }"
        @click="setSelectedFolder(folder)"
        link
      >
        <v-list-item-icon style="margin-right: 1rem;">
          <v-icon>{{ displayIcon(folder.icon) }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ folder.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-list>
</template>

<script>
// NavDrawerFolders.vue displays a nav drawer that contains a list of folder links.
// When a folder link is clicked, the folders's bookmarks are displayed in the main
// router-view in the Bookmarks.vue view
import * as mdijs from '@mdi/js';
import { mapActions } from 'vuex';

export default {
  name: 'NavDrawerFolders',
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    // Displays folders in alphabetical order
    folders() {
      let sortedFolders = this.$store.state.folders.list;
      sortedFolders.sort((a, b) => {
        let folderA = a.name.toUpperCase();
        let folderB = b.name.toUpperCase();
        return folderA < folderB ? -1 : folderA > folderB ? 1 : 0;
      });
      return sortedFolders;
    },
  },
  methods: {
    ...mapActions('folders', ['getFolders']),

    displayIcon(icon) {
      return mdijs[icon];
    },
    // Sets currently selected folder when clicked
    setSelectedFolder(folder) {
      this.$store.commit('folders/setSelectedFolder', folder);
    },
  },
};
</script>

<style></style>
