<template>
  <v-app id="learn-by-vueing">
    <NavDrawer v-if="$auth.isAuthenticated" />

    <v-app-bar app clipped-left>
      <div class="d-flex align-center" style="width: 300px;">
        <h2 v-if="$auth.isAuthenticated">{{ $auth.user.name }}</h2>
      </div>

      <!-- Search bar should search all topics or just within the chosen technology? -->
      <v-text-field
        style="flex: 20 1 auto"
        placeholder="Add bookmark or search..."
        hint="Paste a link to add a bookmark or begin typing to search."
        persistent-hint
        v-if="$auth.isAuthenticated"
        v-model="search"
        @keyup="searchBookmarks(search)"
        @paste="onPaste"
        :disabled="disabledSearch"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn class="success" v-if="!$auth.isAuthenticated" @click="login">Log in</v-btn>
      <v-btn v-if="$auth.isAuthenticated" @click="logout">Log out</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="container--flex">
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
    disabledSearch() {
      if (this.$route.params.action === 'add' || this.$route.params.action === 'edit') {
        return true;
      }
      return false;
    },
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
      this.$auth.logout();
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style></style>
