<template> </template>

<script>
export default {
  name: 'Callback',
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' });
    });
  },
};
</script>
