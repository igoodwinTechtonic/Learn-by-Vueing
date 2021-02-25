<template>
  <div class="home">
    <h1 class="website-name">Learn By Vueing</h1>
    <img class="logo" alt="Vue logo" src="../assets/logo.png" />

    <div class="home-content">
      <h2>About</h2>
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
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

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
// .home-content > p {
//   text-align: center;
// }
</style>
