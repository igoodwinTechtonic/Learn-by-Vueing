<template>
  <v-list width="230" nav dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          All Bookmarks
        </v-list-item-title>
        <v-list-item-subtitle>
          Cilck to filter bookmarks by tags.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <!-- <v-list-item>
      <v-list-item-content>
        <AddTagDialog />
      </v-list-item-content>
    </v-list-item> -->

    <v-list-item
      v-for="tag in tags"
      :key="tag.name"
      :to="{ name: 'Bookmarks', params: { name: tag.name.toLowerCase() } }"
      @click="setSelectedTag(tag)"
      link
    >
      <!-- <v-list-item-action>
        <v-icon>{{ mdi(folder.icon) }}</v-icon>
      </v-list-item-action> -->
      <v-list-item-icon>
        <v-icon>{{ mdi(tag.icon) }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ tag.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import * as mdijs from '@mdi/js';
import { mapActions } from 'vuex';

// import AddTagDialog from './AddTagDialog.vue';

export default {
  name: 'NavDrawerFolders',
  components: {
    // AddTagDialog,
  },
  data() {
    return {
      drawer: null,
    };
  },

  created() {
    this.getTags();
  },

  computed: {
    tags() {
      return this.$store.state.tags.list;
    },
  },
  methods: {
    ...mapActions('tags', ['getTags']),
    // changeTheme() {
    //   this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    // },
    mdi(icon) {
      return mdijs[icon];
    },
    setSelectedFolder(tag) {
      this.$store.commit('setSelectedTag', tag);
    },
  },
};
</script>

<style></style>
