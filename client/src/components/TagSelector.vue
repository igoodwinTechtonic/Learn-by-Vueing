<template>
  <v-combobox
    v-model="chips"
    :items="items"
    chips
    clearable
    label="Tags"
    multiple
    prepend-icon="mdi-filter-variant"
    persistent-hint
    hint="Add new tags or select existing tags."
    solo
    @change="setTags"
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="remove(item)">
        <strong>{{ item }}</strong
        >&nbsp;
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
// TagSelector.vue displays a combo box where the user can select or edit tags when adding or editing a bookmark
export default {
  name: 'TagSelector',
  data() {
    return {
      // If editing a bookmark, pull in the bookmark's tags, otherwise display no chip tags
      chips: this.$store.state.tags.currentBookmarkTags || [],
    };
  },
  computed: {
    items() {
      return this.$store.state.tags.list;
    },
  },
  methods: {
    // Removes a chip from the list when the x is clicked
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
      this.setTags();
    },
    // Set tag list in state, tags are posted to db in parent component, AddBookmark, when bookmark is submitted
    setTags() {
      this.$store.commit('tags/setCurrentBookmarkTags', this.chips);
    },
  },
};
</script>

<style></style>
