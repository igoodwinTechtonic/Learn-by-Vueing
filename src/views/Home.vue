<template>
  <div class="home">
    <h1 class="website-name">Learn By Vueing</h1>
    <img class="logo" alt="Vue logo" src="../assets/logo.png" />

    <div class="home-content">
      <h2>About</h2>
      <p>Click on a link in the navigation view to display coding resources for each technology.</p>

      <h2>Searching</h2>
      <p>In the home page, you can search for any resource from any technology.</p>
      <p>
        If you click a technology, the search bar narrows its scope to search for resources just within that technology.
      </p>
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
