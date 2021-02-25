<template>
  <v-container>
    <h1 style="display: none;">{{ selectedFolder.name }}</h1>
    <div class="folder-header">
      <v-text-field :rules="validateName" :value="selectedFolder.name" @change="updateFolderName" solo> </v-text-field>
    </div>

    <div class="spacer"></div>

    <v-list class="container--grid">
      <v-list-item class="card" v-for="(bookmark, idx) in bookmarks" :key="idx">
        <BookmarkCard :bookmark="bookmark" />
      </v-list-item>
    </v-list>

    <v-col class="btn-container">
      <v-row class="btn-row">
        <v-col>
          <v-btn
            ><v-icon>{{ displayIcon('mdiFormatListBulletedSquare') }}</v-icon></v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            ><v-icon>{{ displayIcon('mdiViewDashboard') }}</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>

    <DeleteFolderDialog />
  </v-container>
</template>

<script>
import BookmarkCard from './BookmarkCard.vue';
import DeleteFolderDialog from '../components/DeleteFolderDialog.vue';
import { mapState } from 'vuex';

import * as mdijs from '@mdi/js';

export default {
  name: 'Folder',
  data() {
    return {
      validateName: [(name) => (name && name.length > 0) || 'A folder must have a name.'],
    };
  },
  components: {
    BookmarkCard,
    DeleteFolderDialog,
  },

  computed: {
    bookmarks() {
      // Filter bookmarks based on tags from name
      return this.$store.state.bookmarks.list.filter((bookmark) => bookmark.tags.includes(this.name));
    },
    ...mapState(['selectedFolder']),
    // selectedFolderName() {
    //   return this.$store.state.selectedFolder.name;
    // },
  },

  methods: {
    updateFolderName(newFolderName) {
      const updatedFolder = { ...this.$store.state.selectedFolder, name: newFolderName };
      this.$store.dispatch('folders/updateFolderName', updatedFolder);
    },
    displayIcon(item) {
      return mdijs[item];
    },
  },
};
</script>

<style lang="scss" scoped>
.spacer {
  padding: 0.5rem;
}
.container--grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  margin-bottom: 2rem;
  max-width: 300px;
}
.btn-container {
  position: fixed;
  bottom: 1rem;
  padding: 0;
}
.btn-row {
  flex-wrap: nowrap;

  > .col {
    flex-grow: 0;
  }
}
</style>
