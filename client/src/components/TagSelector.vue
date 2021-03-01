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
      chips: this.$store.state.tags.list,
    };
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
    setTags() {
      this.$store.commit(
        'setSelectedTags',
        this.chips.sort((a, b) => {
          let tagA = a.name.toUpperCase();
          let tagB = b.name.toUpperCase();
          return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
        })
      );
    },
  },
};
</script>

<style></style>
