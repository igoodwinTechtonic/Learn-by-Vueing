<template>
  <v-navigation-drawer app clipped hide-overlay permanent width="300">
    <v-row class="fill-height" no-gutters>
      <v-col style="position: fixed; height: 100%; ">
        <!-- Right Nav drawer: Account, Folders, Bookmarks, Public, Settings -->
        <v-navigation-drawer dark permanent mini-variant mini-variant-width="70">
          <v-list-item class="px-2" @click="navToHome();" :ripple="false">
            <v-list-item-avatar>
              <v-img :src="this.$auth.user.picture"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <AddFolderDialog />
          </v-list-item>

          <v-divider></v-divider>

          <v-list>
            <v-list-item v-for="(item, idx) in items" :key="idx" @click="navToItem(item)" link>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>

      <!-- Left Nav drawer: Displays whatever is clicked on in the Right navigation drawer-->
      <v-col v-if="selectedItem == 'Folders' || selectedItem == 'Public'" style="margin-left: 70px">
        <!-- Display all folders in the drawer -->
        <NavDrawerFolders :shareable="selectedItem === 'Public' ? true : false" />
      </v-col>
      <v-col v-if="selectedItem == 'Bookmarks'" style="margin-left: 70px">
        <!-- Display all tags in the drawer -->
        <NavDrawerTags />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
// NavDrawer.vue displays the main nav drawer that contains two sub nav drawers:
// NavDrawerFolders and NavDrawerTags to display bookmarks by folders or tags.
import * as mdijs from '@mdi/js'
import NavDrawerFolders from './NavDrawerFolders.vue'
import NavDrawerTags from './NavDrawerTags.vue'
import AddFolderDialog from './AddFolderDialog.vue'

export default {
  name: 'NavDrawer',
  components: {
    NavDrawerFolders,
    NavDrawerTags,
    AddFolderDialog,
  },
  data() {
    return {
      selectedItem: 'Folders',
      drawer: null,

      items: [
        { title: 'Folders', icon: mdijs['mdiFolderMultiple'] },
        { title: 'Bookmarks', icon: mdijs['mdiTag'] },
        { title: 'Public', icon: mdijs['mdiWeb'] },
        // { title: 'Settings', icon: mdijs['mdiCog'] },
      ],
    };
  },
  methods: {
    // Pushes router to route based on clicked item
    navToItem(item) {
      this.selectedItem = item.title
    },
    navToHome() {
      if (this.$route.fullPath !== '/') this.$router.push({ name: "Home" })
    }
  },
}
</script>
