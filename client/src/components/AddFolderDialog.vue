<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn--small" v-bind="attrs" v-on="on"
        ><v-icon>{{ displayIcon('mdiFolderPlus') }}</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title class="dialog__title">Add a new folder</v-card-title>

      <v-text-field
        class="dialog__input"
        v-model="name"
        label="Name"
        hint="A container for your bookmarks."
        :prepend-inner-icon="displayIcon(icon)"
        :rules="validateName"
        persistent-hint
        clearable
      ></v-text-field>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            class="dialog__input"
            v-model="input"
            label="Search for an icon"
            hint="The icon cannot be changed once the folder has been added."
            @keyup="searchIcons(input)"
            persistent-hint
            clearable
            v-bind="attrs"
            v-on="on"
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
import * as mdijs from '@mdi/js';
import { mapState } from 'vuex';

export default {
  name: 'AddFolderDialog',
  data() {
    return {
      dialog: false,
      name: '',
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
    submit() {
      if (this.name) {
        const newFolder = {
          user_id: this.$store.state.users.currentUser._id,
          name: this.name,
          icon: this.icon,
        };
        this.$store.commit('setOverlay', true);
        this.$store.dispatch('folders/addFolder', newFolder).then(() => {
          this.dialog = false;
          this.$store.commit('setOverlay', false);
          // this.$store.commit('setSelectedFolder', newFolder);
          this.$router.push({ name: 'Folder', params: { name: this.name.toLowerCase().replace(/\s/g, '-') } });
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
.dialog {
  &__title {
    background-color: lightgrey;
  }
  &__input {
    margin: 1rem;
  }
}
</style>
