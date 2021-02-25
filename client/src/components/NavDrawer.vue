<template>
  <v-navigation-drawer app clipped hide-overlay permanent width="300">
    <v-row class="fill-height" no-gutters>
      <v-col>
        <!-- Right Nav drawer: Account, Folders, Bookmarks, Public, Settings -->
        <v-navigation-drawer dark permanent mini-variant mini-variant-width="70">
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
            </v-list-item-avatar>
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
      <v-col v-if="selectedItem == 'Folders'">
        <NavDrawerFolders />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import * as mdijs from '@mdi/js';
import NavDrawerFolders from './NavDrawerFolders.vue';

export default {
  name: 'NavDrawer',
  components: {
    NavDrawerFolders,
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
      this.selectedItem = item.title;
    },
  },
};
</script>

<style></style>
