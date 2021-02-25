<template>
  <v-container>
    <h1 style="display: none;">{{ selectedFolder.name }}</h1>
    <div class="folder-header">
      <v-text-field :rules="validateName" :value="selectedFolder.name" @change="updateFolderName" solo> </v-text-field>
    </div>
    <!-- <v-divider /> -->

    <div class="spacer"></div>

    <v-list class="container--grid">
      <v-list-item class="card" v-for="(bookmark, idx) in bookmarks" :key="idx">
        <BookmarkCard :bookmark="bookmark" />
      </v-list-item>
    </v-list>
    <DeleteFolderDialog />
  </v-container>
</template>

<script>
import BookmarkCard from './BookmarkCard.vue';
import DeleteFolderDialog from '../components/DeleteFolderDialog.vue';
import { mapState } from 'vuex';

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
  },
};
</script>

<style lang="scss" scoped>
// .folder-header {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   // align-items: center;
//   margin-bottom: 1rem;
// }
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
</style>
