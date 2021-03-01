<template>
  <v-container>
    <h1 style="display: none;">{{ selectedFolder.name }}</h1>
    <div class="folder-header">
      <v-text-field :rules="validateName" :value="selectedFolder.name" @change="updateFolderName" solo> </v-text-field>
    </div>

    <!-- <div class="spacer"></div> -->

    <v-list class="container--grid" style="flex: 1;">
      <v-list-item v-if="bookmarks.length === 0">
        <NoItemsCard />
      </v-list-item>
      <v-list-item v-else class="card" v-for="(bookmark, idx) in bookmarks" :key="idx">
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
import BookmarkCard from '../components/BookmarkCard.vue';
import DeleteFolderDialog from '../components/DeleteFolderDialog.vue';
import NoItemsCard from '../components/NoItemsCard.vue';
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
    NoItemsCard,
  },

  computed: {
    ...mapState(['selectedFolder']),
    bookmarks() {
      return this.$store.state.bookmarks.list.filter((bookmark) => {
        return bookmark.folder
          .toLowerCase()
          .replace(/\s/, '-')
          .match(this.$route.params.name);
      });
    },
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
