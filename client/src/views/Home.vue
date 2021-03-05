<template>
  <div class="home">
    <h1 class="website-name">Learn By Vueing</h1>

    <v-row class="home-content" md8 sm6>
      <v-col v-if="!$auth.isAuthenticated">
        <h2>Getting Started</h2>
        <p>
          Log in with Google using the button in the top right hand of the page!
        </p>
        <p>
          You can organize your bookmarks with <b>folders</b> and <b>tags</b>. Each bookmark lives in one folder and can
          have multiple tags.
        </p>

        <h2>Navigation</h2>
        <p>
          Click on a icon in the navigation view to display your account, all folders, all bookmarks, all public
          bookmarks, and your personalized settings.
        </p>

        <h2>Searching</h2>
        <p>From any page, you can search for any bookmark.</p>
      </v-col>
      <v-col v-if="$auth.isAuthenticated">
        <h2>Welcome to Learn by Vueing</h2>
        <p>
          You can organize your bookmarks with <b>folders</b> and <b>tags</b>. Each bookmark lives in one folder and can
          have multiple tags.
        </p>

        <h2>Navigation</h2>
        <p>
          Click on a icon in the navigation view to display your account, all folders, all bookmarks, all public
          bookmarks, and your personalized settings.
        </p>

        <h2>Searching</h2>
        <p>From any page, you can search for any bookmark.</p>
      </v-col>
      <v-col md4 sm6>
        <img class="logo" alt="Vue logo" src="../assets/logo.png" sm6 />
      </v-col>
    </v-row>
  </div>
</template>

<script>
// Home.vue view displays app landing page and details once logged in
// Router path: /
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
.home {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.website-name {
  margin-bottom: 50px;
}
.logo {
  margin-bottom: 50px;
}
</style>
