<template>
  <v-app id="learn-by-vueing">
    <v-navigation-drawer app v-model="drawer" clipped hide-overlay permanent>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Folders
            </v-list-item-title>
            <v-list-item-subtitle>
              Cilck to see bookmarks.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn
              class="subtitle"
              @click="
                {
                }
              "
            >
              Add Folder
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="folder in folders"
          :key="folder.name"
          :to="{ name: 'Technology', params: { id: folder.name.toLowerCase(), name: folder.name } }"
          link
        >
          <v-list-item-action>
            <v-icon>{{ mdi(folder.icon) }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ folder.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dense clipped-left>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <!-- Search bar should search all topics or just within the chosen technology? -->
      <v-row align="center" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        ></v-text-field>
      </v-row>

      <!-- <v-switch inset @mousedown="changeTheme()" color="success"></v-switch> -->

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container fluid class="container--flex">
        <!-- A navigation bar that shows the level of depth and current field? ie -->
        <!-- React --- Router --- History -->
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as mdijs from '@mdi/js';

export default {
  name: 'App',

  data: () => ({
    drawer: null,
  }),

  computed: {
    folders() {
      return this.$store.state.folders;
    },
  },

  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    mdi(icon) {
      return mdijs[icon];
    },
  },

  created() {
    // this.$vuetify.theme.dark = true;
    // console.log(this.$store.state.techs);
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
