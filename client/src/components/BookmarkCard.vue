<template>
  <!-- Use a v-card for each individual resource -->
  <v-hover v-slot="{ hover }">
    <v-card :class="{ 'on-hover': hover }" :elevation="hover ? 12 : 2">
      <a target="_blank" :href="{ link }">
        <v-img class="white--text align-end" height="200px" :src="item.link">
          <v-card-title>{{ item.title }}</v-card-title>
        </v-img>
      </a>

      <!-- <v-card-subtitle class="pb-0" v-for="(tag, idx) in item.tags" :key="idx">{{ tag }}</v-card-subtitle> -->
      <!-- <v-card-subtitle class="pb-0">{{ tags }}</v-card-subtitle> -->

      <v-card-text class="text--primary">{{ item.description }}</v-card-text>

      <v-chip v-for="(tag, idx) in tags" :key="idx">{{ tag }}</v-chip>
    </v-card>
  </v-hover>
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
      return this.bookmark.tags;
    },
    link() {
      // console.log(this.bookmark.link);
      return this.bookmark.link;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>
