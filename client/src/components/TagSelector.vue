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
      chips: [],
    };
  },
  mounted() {
    this.$store.commit('tags/setCurrentBookmarkTags', this.chips);
  },
  computed: {
    items() {
      return this.$store.state.tags.list.map((tag) => tag.name);
    },
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
      this.setTags();
    },
    // Set tag list in state, tags are posted to db in parent component, AddBookmark, when bookmark is submitted
    setTags() {
      const updatedTags = this.chips.map((tag) => {
        if (this.items.includes(tag)) {
          let tagCountToIncrement = this.$store.state.tags.list.find((tagInState) => tagInState.name === tag).count;
          // If the tag is in state.list, don't add, increase count by 1
          return { name: tag, count: (tagCountToIncrement += 1) };
        }
        // If the tag is not in state.list, add a new object { name: tag, count: 1 }
        return { name: tag, count: 1 };
      });
      this.$store.commit('tags/setCurrentBookmarkTags', updatedTags);
    },
  },
};
</script>

<style></style>
