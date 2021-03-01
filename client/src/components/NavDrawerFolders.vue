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
        <!-- <v-list-item-action>
        <v-icon>{{ mdi(folder.icon) }}</v-icon>
      </v-list-item-action> -->
        <v-list-item-icon>
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
import * as mdijs from '@mdi/js';
import { mapActions } from 'vuex';

// import AddFolderDialog from './AddFolderDialog.vue';

export default {
  name: 'NavDrawerFolders',
  components: {
    // AddFolderDialog,
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
    setSelectedFolder(folder) {
      this.$store.commit('setSelectedFolder', folder);
    },
  },
};
</script>

<style lang="scss">
.fixed-nav {
  // position: fixed;
  padding: 0;
  background-color: white;
  z-index: 1;

  &__head {
  }
}
</style>
