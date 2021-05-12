<template>
  <v-list class="container--grid" style="flex: 1;">
    <NoItemsCard v-if="bookmarks.length === 0" />
    <v-list v-else three-line id="bookmarks-list">
      <Bookmark v-for="(bookmark, idx) in bookmarks" :key="idx" :bookmark="bookmark" />
    </v-list>
  </v-list>
</template>

<script>
// Tags.vue displays all bookmarks with a tag
// Router path: /:folder|tags/:name
import NoItemsCard from '../components/NoItemsCard.vue'
import Bookmark from '../components/Bookmark.vue'

export default {
  name: 'Tags',
  components: {
    Bookmark,
    NoItemsCard,
  },
  computed: {
    // Displays bookmarks based on route parameter, either a folder or tag name
    bookmarks() {
      if (this.$route.params.name) {
        const filteredBookmarks = this.$store.state.bookmarks.list.filter((bookmark) =>
          bookmark.folder_id === this.$store.state.folders.selectedFolder._id
        );
        return this.sortedBookmarks(filteredBookmarks)
      }
      else if (this.$route.params.tag) {
        const filteredBookmarks = this.$store.state.bookmarks.list.filter((bookmark) => 
          bookmark.tags.includes(this.$route.params.tag))
        return this.sortedBookmarks(filteredBookmarks)
      }
      return {}
    },
  },
  methods: {
    sortedBookmarks(bookmarks) {
      if (bookmarks.length === 0) return []
      else if (bookmarks.length === 1) return bookmarks
      else {
        // Prevents infinite loop because of changing tags by reference
        const sortedBookmarks = [...bookmarks]
        sortedBookmarks.sort((a, b) => {
          let tagA = a.title.toUpperCase()
          let tagB = b.title.toUpperCase()
          return tagA < tagB ? -1 : tagA > tagB ? 1 : 0
        });
        return sortedBookmarks
      }
    }
  }
}
</script>
