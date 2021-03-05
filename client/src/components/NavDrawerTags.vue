<template>
  <v-list width="230" nav dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Tags
        </v-list-item-title>
        <v-list-item-subtitle>
          Click to filter bookmarks by tag.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list>
      <v-list-item v-if="tags.length === 0">
        <v-list-item-content>
          <v-list-item-title>
            You don't have any tags yet.
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="(tag, idx) in tags"
        :key="idx"
        :to="{ name: 'Tags', params: { tag } }"
        @click="setSelectedTag(tag)"
        link
      >
        <v-chip style="cursor: pointer;">
          <v-list-item-content>
            <v-list-item-title>
              {{ tag }}
            </v-list-item-title>
          </v-list-item-content>
        </v-chip>
      </v-list-item>
    </v-list>
  </v-list>
</template>

<script>
// NavDrawerTags.vue displays a nav drawer that contains chip tags
// When a chip link is clicked, the tag's bookmarks are displayed in the main router-view
// in the Bookmarks.vue view
export default {
  name: 'NavDrawerFolders',
  computed: {
    tags() {
      return this.$store.state.tags.list;
    },
  },
  methods: {
    setSelectedTag(tag) {
      this.$store.commit('tags/setSelectedTag', tag);
    },
  },
};
</script>

<style></style>
