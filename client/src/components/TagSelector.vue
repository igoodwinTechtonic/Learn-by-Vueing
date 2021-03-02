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
export default {
  name: 'TagSelector',
  data() {
    return {
      chips: this.$store.state.tags.list.filter((tag) =>
        tag.match(this.$store.state.folders.selectedFolder.name.toLowerCase())
      ),
    };
  },
  mounted() {
    this.$store.commit('tags/setCurrentBookmarkTags', this.chips);
  },
  computed: {
    items() {
      return this.$store.state.tags.list;
    },
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
      this.setTags();
    },
    // Set tags in state, tags are psoted to db in parent component
    setTags() {
      this.$store.commit('tags/setCurrentBookmarkTags', this.chips);
    },
  },
};
</script>

<style></style>
