<template>
  <v-navigation-drawer app clipped hide-overlay permanent width="300">
    <v-row class="fill-height" no-gutters>
      <v-col style="position: fixed; height: 100%; ">
        <!-- Right Nav drawer: Account, Folders, Bookmarks, Public, Settings -->
        <v-navigation-drawer dark permanent mini-variant mini-variant-width="70">
          <v-list-item class="px-2">
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
      <v-col v-if="selectedItem == 'Folders'" style="margin-left: 70px">
        <!-- Display all folders in the drawer -->
        <NavDrawerFolders />
      </v-col>
      <v-col v-if="selectedItem == 'Bookmarks'" style="margin-left: 70px">
        <!-- Display all tags in the drawer -->
        <NavDrawerTags />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import * as mdijs from '@mdi/js';
import NavDrawerFolders from './NavDrawerFolders.vue';
import NavDrawerTags from './NavDrawerTags.vue';
import AddFolderDialog from './AddFolderDialog.vue';

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
        { title: 'Bookmarks', icon: mdijs['mdiBookmark'] },
        { title: 'Public', icon: mdijs['mdiWeb'] },
        { title: 'Settings', icon: mdijs['mdiCog'] },
      ],
    };
  },
  methods: {
    navToItem(item) {
      switch (item.title) {
        case 'Folders' && item.title != 'Folders':
          this.$router.push('/folders');
          return;
        case 'Bookmarks' && item.title != 'Bookmarks':
          this.$router.push('/bookmarks');
          return;
        case 'Public' && item.title != 'Public':
          this.$router.push('/public');
          return;
        case 'Settings' && item.title != 'Settings':
          this.$router.push('/settings');
          return;
      }
      this.selectedItem = item.title;
    },
  },
};
</script>

<style>
.title {
  padding-bottom: 0.5rem;
}
</style>
