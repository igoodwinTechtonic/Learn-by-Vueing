<template>
  <v-app id="learn-by-vueing">
    <NavDrawer v-if="$auth.isAuthenticated" />

    <v-app-bar app clipped-left>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <!-- <div class="d-flex align-center" style="width: 300px;">
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
      </div> -->

      <div class="d-flex align-center" style="width: 300px;">
        <h2>{{ $auth.user.name }}</h2>
      </div>

      <!-- Search bar should search all topics or just within the chosen technology? -->
      <!-- <v-row align="center"> -->
      <v-text-field
        style="flex: 20 1 auto"
        placeholder="Add bookmark or search..."
        hint="Paste a link to add a bookmark or begin typing to search."
        persistent-hint
        v-if="$auth.isAuthenticated"
        v-model="search"
        @keyup="searchBookmarks(search)"
        @paste="onPaste"
      ></v-text-field>

      <v-spacer></v-spacer>
      <!-- <v-card class="elevation-12 pa-4"> -->
      <!-- <v-card-title>Log in with Auth0 </v-card-title> -->
      <v-btn class="success" v-if="!$auth.isAuthenticated" @click="login">Log in</v-btn>
      <v-btn v-if="$auth.isAuthenticated" @click="logout">Log out</v-btn>
      <!-- </v-card> -->

      <!-- append-icon="mdi-magnify" -->
      <!-- </v-row> -->

      <!-- <v-switch inset @mousedown="changeTheme()" color="success"></v-switch> -->

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container fluid class="container--flex">
        <!-- <Home v-if="!$auth.isAuthenticated" /> -->
        <!-- <router-view v-if="$auth.isAuthenticated && !$auth.isLoading" /> -->
        <router-view />
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"> </v-progress-circular>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import NavDrawer from './components/NavDrawer.vue';

export default {
  name: 'App',
  components: {
    NavDrawer,
  },
  data() {
    return {
      search: '',
      disabled: false,
    };
  },
  computed: {
    ...mapState(['overlay']),
  },
  methods: {
    searchBookmarks() {
      // Ignores updating search term if the previous input is the same as the new input
      // or if the input is a link that matches the regex pattern
      if (this.search !== this.$store.state.searchKeywords && !this.search.match(/^(https?|www)/)) {
        this.$store.commit('setSearchKeywords', this.search);
      }
    },
    onPaste(event) {
      const link = event.clipboardData.getData('text/plain');
      // Some logic to prevent pushing to /add or folder/vue/add/add paths
      if (!this.$store.state.folders.selectedFolder.name) {
        console.log('Please select a folder first before adding a new bookmark');
        return;
      }
      if (link.match(/^(https?|www)/)) {
        this.$store.dispatch('scrapeUrl', { link }).then(() => {
          const toThisFolder = this.$store.state.folders.selectedFolder.name.toLowerCase().replace(/\s/g, '-');
          this.$router.push({ name: 'AddBookmark', params: { name: toThisFolder } });
          this.$store.commit('setOverlay', false);
          this.search = '';
        });
      }
    },
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      // this.$store.commit('setOverlay', true);
      this.$auth.logout(); //.then(() => this.$store.commit('setOverlay', false));
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style lang="scss">
// .container {
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// }
</style>
