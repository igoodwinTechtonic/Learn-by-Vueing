<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn--small" v-bind="attrs" v-on="on"
        ><v-icon>{{ displayIcon('mdiFolderPlus') }}</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title>Add a new folder</v-card-title>

      <form autocomplete="off">
        <v-row cols=12>
          <v-col sm="9">
            <v-text-field
              class="dialog__input"
              v-model="name"
              label="Name"
              hint="A container for your bookmarks."
              :prepend-inner-icon="displayIcon(icon)"
              :rules="validateName"
              clearable
              persistent-hint
            ></v-text-field>
          </v-col>
          <v-col sm="3">
            <v-checkbox
              v-model="shareable"
              label="Public"
            >
            </v-checkbox>
            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-checkbox
                  v-model="shareable"
                  v-on="on"
                  v-bind="attrs"
                  :label="`${shareable ? 'Public' : 'Private'}`"
                >
                </v-checkbox>
              </template>
              <span>Share a link</span>
            </v-tooltip> -->
          </v-col>
        </v-row>
        
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="dialog__input"
              v-model="input"
              v-bind="attrs"
              v-on="on"
              label="Search for an icon"
              hint="The icon cannot be changed once the folder has been added."
              @keyup="searchIcons(input)"
              clearable
              persistent-hint
            ></v-text-field>
          </template>
          <v-list>
            <v-virtual-scroll height="224" item-height="56" :bench="4" :items="filteredIcons">
              <template v-slot:default="{ item }">
                <v-list-item :key="item" @click="setIcon(item)">
                  <v-icon>{{ displayIcon(item) }}</v-icon>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-list>
        </v-menu>
      </form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="submit()">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// AddFolder.vue displays a dialog the add folder button in the main nav is clicked.
// Includes logic to search for a folder icon using the whole mdijs icon library. It's cool!
import * as mdijs from '@mdi/js';
import { mapState } from 'vuex';

export default {
  name: 'AddFolderDialog',
  data() {
    return {
      dialog: false,
      name: '',
      shareable: false,
      icon: 'mdiFolder',
      input: '',
      icons: Object.keys(mdijs),
      filteredIcons: Object.keys(mdijs),
      validateName: [(name) => (name && name.length > 0) || 'Required.'],
    };
  },
  computed: {
    ...mapState(['overlay']),
    iconList() {
      return Object.keys(mdijs);
    },
  },
  methods: {
    // POSTS a new folder and sets the currently selected folder to this new folder
    submit() {
      if (this.name) {
        const newFolder = {
          user_id: this.$store.state.users.currentUser._id,
          name: this.name,
          icon: this.icon,
          shareable: this.shareable
        };
        this.$store.commit('setOverlay', true);
        this.$store.dispatch('folders/addFolder', newFolder).then(() => {
          this.dialog = false;
          this.$store.commit('setOverlay', false);
          this.$router.push({ name: 'Folder', params: { name: this.name.toLowerCase().replace(/\s/g, '-') } });
          // Resets name and icon after a short delay
          setTimeout(() => {
            this.name = '';
            this.icon = 'mdiFolder';
          }, 200);
        });
      }
    },
    displayIcon(item) {
      return mdijs[item];
    },
    searchIcons(input) {
      this.filteredIcons = this.icons.filter((icon) =>
        icon.includes('mdi' + input.charAt(0).toUpperCase() + input.slice(1))
      );
    },
    setIcon(selectedIcon) {
      this.icon = selectedIcon;
    },
  },
};
</script>

<style lang="scss">
.dialog__input {
  margin: 1rem;
}
</style>
