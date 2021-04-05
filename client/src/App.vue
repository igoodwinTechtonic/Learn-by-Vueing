<template>
  <v-app id="learn-by-vueing">
    <NavDrawer v-if="$auth.isAuthenticated" />

    <v-app-bar app clipped-left>
      <div class="d-flex align-center" style="width: 300px;">
        <h2 v-if="$auth.isAuthenticated">{{ $auth.user.name }}</h2>
        <h2 v-if="!$auth.isAuthenticated" style="margin-left: 10vw">Bookmarkd</h2>
      </div>

      <v-text-field
        style="flex: 20 1 auto"
        placeholder="Add bookmark or search..."
        hide-details="auto"
        v-if="$auth.isAuthenticated"
        v-model="search"
        @click="navToSearch()"
        @keyup="searchBookmarks(search)"
        @paste="onPaste"
        :disabled="disabledSearch"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn
        id="login-btn"
        class="success"
        style="min-width: auto;"
        v-if="!$auth.isAuthenticated"
        @click="login"
      >
      Log in
      </v-btn>

      <div class="app-funcs-container" v-if="$auth.isAuthenticated">
        <v-btn style="margin-right: 1rem;" @click="logout">Log out</v-btn>
        <v-switch
          style="display: flex; justify-content: center;"
          v-model="$vuetify.theme.dark"
          inset
          hide-details="true"
        >
        </v-switch>
        <v-icon>{{ themeIcon }}</v-icon>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
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
import { mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js';
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
      debounce: null,
    };
  },
  updated() {
    if (!this.$auth.isAuthenticated) {
      this.$store.dispatch('users/clearUserData');
    }
  },
  computed: {
    ...mapState(['overlay']),
    disabledSearch() {
      if (this.$route.params.action === 'add' || this.$route.params.action === 'edit' || this.$route.fullPath === '/') {
        return true;
      }
      return false;
    },
    themeIcon() {
      if (this.$vuetify.theme.dark) return mdiWeatherNight;
      return mdiWhiteBalanceSunny;
    }
  },
  methods: {
    navToSearch() {
      if (this.$route.fullPath !== '/search') this.$router.push({ name: 'Search' });
    },
    searchBookmarks() {
      // Ignores updating search term if the previous input is the same as the new input
      // or if the input is a link that matches the regex pattern
      if (this.search !== this.$store.state.searchKeywords && !this.search.match(/^(https?|www)/)) {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.$store.commit('setSearchKeywords', this.search);
          this.$store.dispatch('bookmarks/searchBookmarks', this.search);
        }, 500);
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
        this.$store.commit('setOverlay', true);
        this.$store.dispatch('scrapeUrl', { link }).then(() => {
          const toThisFolder = this.$store.state.folders.selectedFolder.name.toLowerCase().replace(/\s/g, '-');
          this.$router.push({ name: 'AddBookmark', params: { name: toThisFolder, action: 'add' } });
          this.$store.commit('setOverlay', false);
          this.search = '';
        });
      }
    },
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({ returnTo: window.location.origin });
    },
  },
};
</script>

<style>
.app-funcs-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
