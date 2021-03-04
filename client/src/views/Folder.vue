<template>
  <v-container>
    <h1 style="display: none;">{{ selectedFolder.name }}</h1>
    <div>
      <v-text-field :rules="validateName" :value="selectedFolder.name" @change="updateFolderName" solo> </v-text-field>
    </div>
    <NoItemsCard v-if="bookmarks.length === 0" />
    <Bookmarks v-else />
    <DeleteFolderDialog />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Bookmarks from './Bookmarks.vue';
import DeleteFolderDialog from '../components/DeleteFolderDialog.vue';
import NoItemsCard from '../components/NoItemsCard.vue';

import * as mdijs from '@mdi/js';

export default {
  name: 'Folder',
  data() {
    return {
      validateName: [(name) => (name && name.length > 0) || 'A folder must have a name.'],
    };
  },
  components: {
    Bookmarks,
    DeleteFolderDialog,
    NoItemsCard,
  },
  computed: {
    ...mapState('folders', ['selectedFolder']),
    bookmarks() {
      return this.$store.state.bookmarks.list.filter(
        (bookmark) => bookmark.folderId === this.$store.state.folders.selectedFolder._id
      );
    },
  },

  methods: {
    updateFolderName(newFolderName) {
      const updatedFolder = { ...this.$store.state.folders.selectedFolder, name: newFolderName };
      this.$store.dispatch('folders/updateFolderName', updatedFolder);
    },
    displayIcon(item) {
      return mdijs[item];
    },
  },
};
</script>

<style></style>
