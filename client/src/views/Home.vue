<template>
  <div class="home-wrapper">
    <v-row cols="12">
      <v-col class="home-content" v-if="!$auth.isAuthenticated" xs="12" sm="8" md="8" lg="6">
        <v-card class="website-name">
          <h1>A new and intuitive method of creating and sharing bookmarks</h1>
          <!-- <h3 class="website-description"></h3> -->
        </v-card>
        <h2>Getting Started</h2>
        <p>Log In with a Google account.</p>
        <p style="margin-bottom: 0;">Add a folder<v-icon class="icon-pos">{{ folderIcon }}</v-icon>and select an
          <a href="https://materialdesignicons.com/" target="_blank" style="color: inherit;">icon</a>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="icon-clickable"
                @click="randomIndex"
                v-bind="attrs"
                v-on="on"
              >
                {{ randomIcon }}
              </v-icon>
            </template>
            <span>Click me!</span>
          </v-tooltip>
        </p>
        <p style="padding-left: 1rem;">Make it Public<v-icon class="icon-pos">{{ publicIcon }}</v-icon>or Private</p>
        <p>Add a few bookmarks<v-icon class="icon-pos">{{ bookmarkIcon }}</v-icon>with a
          <v-chip>few</v-chip><v-chip>different</v-chip><v-chip>tags</v-chip>
          <v-icon class="icon-pos">{{ tagIcon }}</v-icon></p>
        <p>It's that simple!</p>

        <h2>More Features</h2>
        <p>Your bookmarks are safely stored in the cloud.</p>
        <p>Share a link to a public folder with your friends.</p>
      </v-col>
      <v-col v-if="$auth.isAuthenticated">
        <h2 style="margin-top: 2rem;">Welcome to Bookmarkd!</h2>
        <p>
          Organize your bookmarks with <b>folders</b>
          <v-icon class="icon-pos">{{ folderIcon }}</v-icon>and <b>tags</b>
          <v-icon class="icon-pos">{{ tagIcon }}</v-icon>. Each bookmark lives in one folder and can
          have multiple tags. By default, bookmarks are sorted alphabetically, ascending.
        </p>
        <p>Create a folder by clicking the Add Folder icon<v-icon class="icon-pos">{{ addFolderIcon }}</v-icon>on the left.</p>

        <h2>Navigation</h2>
        <p>
          Click on a icon in the navigation view to display all folders, all tags, all public
          folders, and your personalized settings.
        </p>

        <h2>Adding or Editing a Bookmark</h2>
        <ol>
          <li>Click on the folder you want to add the bookmark to</li>
          <li>Paste a link into the search field</li>
          <li>Change the bookmark's title, description, or add a few tags</li>
          <li>Click Add Bookmark</li>
          <!-- <v-btn><v-icon style="padding-right: 1rem;">{{ bookmarkIcon }}</v-icon>Add Bookmark</v-btn> -->
        </ol>
        <p>Right-click a bookmark to open the edit view, delete it, or copy the url.</p>

        <h2>Searching</h2>
        <p>Search for any bookmark at any time by clicking and typing into the search bar at the top of the page.</p>
      </v-col>
      <v-col class="right-columm" xs="12" sm="4" md="4" lg="6" v-if="!$auth.isAuthenticated">
        <img class="logo" alt="Vue logo" src="../assets/logo.png"/>
        <v-btn id="login-btn" class="success" @click="login">Log in</v-btn>
      </v-col>
    </v-row>
    <img class="logo" alt="Vue logo" src="../assets/logo.png" v-if="$auth.isAuthenticated"/>
  </div>
</template>

<script>
// Home.vue view displays app landing page and details once logged in
// Router path: /
import * as mdijs from '@mdi/js';

export default {
  name: 'Home',
  data() {
    return {
      addFolderIcon: mdijs.mdiFolderPlus,
      bookmarkIcon: mdijs.mdiBookmark,
      folderIcon: mdijs.mdiFolder,
      googleIcon: mdijs.mdiGoogle,
      publicIcon: mdijs.mdiWeb,
      tagIcon: mdijs.mdiTag,
      icons: Object.keys(mdijs),
      idx: 0,
    }
  },
  computed: {
    randomIcon() {
      // The mdi/js paackage has 5955 icons as of version 5.9.55
      return mdijs[this.icons[this.idx]];
    }
  },
  methods: {
    randomIndex() {
      this.idx = Math.floor(Math.random() * 5955);
    },
    login() {
      this.$auth.loginWithRedirect();
    }
  }
};
</script>

<style lang="scss">
#login-btn {
  font-size: 1.2rem;
  min-width: 50%;
}
.home-wrapper {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10vw;
}
.home-content {
  & > p {
    font-size: 1.2rem;
  }
}
.icon-pos {
  padding: 0 2px 4px 2px;
}
.icon-clickable {
  padding: 5px;
}
.website-name {
  padding: 1rem;
  margin: 50px 0;
}
.website-description {
  margin: 0;
  padding-top: 1rem;
  font-style: italic;
  font-weight: 400;
}
.right-columm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.logo {
  max-width: 200px;
  margin-bottom: 50px;
}
</style>
