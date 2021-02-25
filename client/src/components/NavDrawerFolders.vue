<template>
  <v-list width="230" nav dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Folders
        </v-list-item-title>
        <v-list-item-subtitle>
          Cilck to see your bookmarks.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <AddFolderDialog />
      </v-list-item-content>
    </v-list-item>

    <v-list-item
      v-for="folder in folders"
      :key="folder.name"
      :to="{ name: 'Folder', params: { name: folder.name.toLowerCase() } }"
      @click="setSelectedFolder(folder)"
      link
    >
      <!-- <v-list-item-action>
        <v-icon>{{ mdi(folder.icon) }}</v-icon>
      </v-list-item-action> -->
      <v-list-item-icon>
        <v-icon>{{ mdi(folder.icon) }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ folder.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import * as mdijs from '@mdi/js';
import { mapActions } from 'vuex';

import AddFolderDialog from './AddFolderDialog.vue';

export default {
  name: 'NavDrawerFolders',
  components: {
    AddFolderDialog,
  },
  data() {
    return {
      drawer: null,
    };
  },

  created() {
    this.getFolders();
  },

  computed: {
    folders() {
      return this.$store.state.folders.list;
    },
  },
  methods: {
    ...mapActions('folders', ['getFolders']),
    // changeTheme() {
    //   this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    // },
    mdi(icon) {
      return mdijs[icon];
    },
    setSelectedFolder(folder) {
      this.$store.commit('setSelectedFolder', folder);
    },
  },
};
</script>

<style></style>
