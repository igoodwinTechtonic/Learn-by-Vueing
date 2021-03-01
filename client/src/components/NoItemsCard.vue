<template>
  <v-container class="no-items-container">
    <v-card class="no-items-card mx-auto">
      <h2 style="text-align: center;">You don't have any bookmarks in {{ selectedFolder.name }} yet.</h2>
      <v-divider style="margin: 1rem;"></v-divider>
      <h3 style="text-align: center;">
        To add a bookmark, paste a link into the search field at the top of the page.
      </h3>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'NoItemsCard',
  computed: {
    selectedFolder() {
      return this.$store.state.selectedFolder;
    },
  },
};
</script>

<style lang="scss" scoped>
.no-items-container {
  justify-content: center;
  align-items: center;
}
.no-items-card {
  padding: 1rem;
  margin-bottom: 5rem;
}
</style>
