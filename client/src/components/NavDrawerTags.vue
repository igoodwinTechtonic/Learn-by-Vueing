<template>
  <v-list width="230" nav dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          All Bookmarks
        </v-list-item-title>
        <v-list-item-subtitle>
          Click to filter bookmarks by tags.
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
        :to="{ name: 'Bookmarks', params: { tag: tag.toLowerCase() } }"
        @click="setSelectedTag(tag)"
        link
      >
        <v-chip>
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
// import * as mdijs from '@mdi/js';

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
    // sortedTags(tags) {
    //   if (tags.length === 0) return [];
    //   else if (tags.length === 1) return tags;
    //   else {
    //     // Prevents infinite loop because of changing tags by reference
    //     const sortedTags = [...tags];
    //     sortedTags.sort((a, b) => {
    //       let tagA = a.toUpperCase();
    //       let tagB = b.toUpperCase();
    //       return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
    //     });
    //     return sortedTags;
    //   }
    // },
  },
};
</script>

<style></style>
