<template>
  <!-- Use a v-card for each individual resource -->
  <v-card :href="{ link }" target="_blank">
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{ item.title }}</v-card-title>
    </v-img>

    <!-- <v-card-subtitle class="pb-0" v-for="(tag, idx) in item.tags" :key="idx">{{ tag }}</v-card-subtitle> -->
    <v-card-subtitle class="pb-0">{{ tags }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ item.description }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BookmarkCard',
  props: {
    bookmark: { type: Object, required: true },
  },
  computed: {
    item() {
      return this.bookmark;
    },
    tags() {
      return this.bookmark.tags.join(', ');
    },
    link() {
      // console.log(this.bookmark.link);
      return this.bookmark.link;
    },
  },
};
</script>

<style lang="scss"></style>
