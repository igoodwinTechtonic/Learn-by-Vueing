<template>
  <v-list three-line style="padding: 0;">
    <v-list-item class="card" style="min-height: 48px;" :href="bookmark.url" target="_blank" @contextmenu="show">
      <v-tooltip bottom transition="v-fade-transition">

        <!-- This is the actual bookmark content -->
        <template v-slot:activator="{ on, attrs }">
          <span class="bookmark-span" v-bind="attrs" v-on="on">
            <v-list-item-avatar class="bookmark-span__item" size="30" style="margin: 0 1rem 0 0;">
              <!-- <v-img src="bookmark.images[0]"></v-img> -->
              <v-img :src="bookmark.favicon"></v-img>
            </v-list-item-avatar>
            <v-list-item-title class="bookmark-span__item" v-html="bookmark.title"></v-list-item-title>
          </span>
        </template>

        <!-- This exists in the tooltip -->
        <span>
          <v-list-item-subtitle style="font-weight: bold;">{{ bookmark.title }}</v-list-item-subtitle>
          <v-list-item-subtitle style="white-space: pre-line;">{{ bookmark.description }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ bookmark.url }}</v-list-item-subtitle>
          <v-list style="background: none;">
            <v-chip v-for="(tag, idx) in tags" :key="idx" style="margin-right: 0.2rem;">{{ tag }}</v-chip>
          </v-list>
        </span>
      </v-tooltip>

      <!-- This exists in the custom right-click menu -->
      <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
        <v-list v-if="!$auth.isAuthenticated">
          <v-list-item @click="rightClickCOPY.event(); snackbar = true;">
            <v-icon style="margin-right: 4px;">{{ rightClickCOPY.icon }}</v-icon>
            <v-list-item-title>{{ rightClickCOPY.title }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list v-if="$auth.isAuthenticated">
          <v-list-item v-for="(item, idx) in rightClickItems" :key="idx" @click="item.event(); snackbar = true;"  >
            <v-icon style="margin-right: 4px;">{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-snackbar
        v-model="snackbar"
        timeout="2000"
        rounded="pill"
      >
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-list-item>
  </v-list>
</template>

<script>
// Bookmark.vue displays one bookmark, includes logic for editing, deleting, and click a bookmark
import { mdiContentCopy, mdiSquareEditOutline, mdiTrashCan } from '@mdi/js'

export default {
  name: 'Bookmark',
  props: {
    bookmark: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMenu: false,
      snackbar: false,
      snackbarText: '',
      x: 0,
      y: 0,
      rightClickItems: [
        { title: 'Copy URL', icon: mdiContentCopy, event: this.copyUrl, text: 'Link copied to clipboard!' },
        { title: 'Edit', icon: mdiSquareEditOutline, event: this.editBookmark, text: 'Edits saved.' },
        { title: 'Delete', icon: mdiTrashCan, event: this.deleteBookmark, text: 'Bookmark deleted.' },
      ],
    };
  },
  computed: {
    rightClickCOPY() {
      return this.rightClickItems[0]
    },
    tags() {
      return this.$store.state.tags.list.filter((tag) => this.bookmark.tags.includes(tag))
    }
  },
  methods: {
    // Copies url of selected bookmark to clipboard
    copyUrl() {
      navigator.clipboard.writeText(this.bookmark.url)
      this.snackbarText = this.rightClickItems[0].text
    },
    // Reopens AddBookmark vue with data to update the bookmark
    editBookmark() {
      this.$store.commit('bookmarks/setBookmarkToAdd', this.bookmark);
      const toThisFolder = this.$store.state.folders.selectedFolder.name.toLowerCase().replace(/\s/g, '-')
      this.$router.push({ name: 'AddBookmark', params: { name: toThisFolder, action: 'edit' } })
      this.snackbarText = this.rightClickItems[1].text
    },
    // DELETES a bookmark and removes tags if it's the last bookmark with the tag
    async deleteBookmark() {
      this.snackbarText = this.rightClickItems[2].text
      await this.$store.dispatch('bookmarks/deleteBookmark', { id: this.bookmark._id, tags: this.bookmark.tags })
      await this.$store.dispatch('tags/getUserTags', this.$store.state.users.currentUser._id)
    },
    // Shows / hides the custom right-click menu
    show(e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
  },
};
</script>

<style scoped lang="scss">

.bookmark-span {
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  overflow-x: auto;

  &_item {
    flex: 0 0 auto;
  }
}

</style>
