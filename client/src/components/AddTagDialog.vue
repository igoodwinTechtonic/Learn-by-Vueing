<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="subtitle" v-bind="attrs" v-on="on">Add Tag</v-btn>
    </template>
    <v-card>
      <v-card-title class="dialog__title">Add a new tag</v-card-title>

      <!-- <v-select class="dialog__input" v-model="folderIcon" :items="folderIcons" label="Icon" required></v-select> -->

      <v-text-field
        class="dialog__input"
        v-model="name"
        label="Name"
        hint="A container for your bookmarks."
        :prepend-inner-icon="folderIcon"
        :rules="validateName"
        persistent-hint
        clearable
      ></v-text-field>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            class="dialog__input"
            v-model="icon"
            label="Icon"
            hint="Search and select a folder icon."
            @change="searchIcons(input)"
            persistent-hint
            clearable
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>

        <v-list>
          <v-virtual-scroll height="336" item-height="56" :bench="4" :items="iconList">
            <template v-slot:default="{ item }">
              <v-list-item :key="item" @click="setIcon(item)">
                <!-- <v-icon></v-icon> -->
                <v-icon>{{ searchIcon(item) }}</v-icon>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-list>
      </v-menu>

      <!-- <IconSearchMenu /> -->

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

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>

<script>
import { mdiFolder } from '@mdi/js';
import * as mdijs from '@mdi/js';
// import { mapActions } from 'vuex';
// import IconSearchMenu from './IconSearchMenu.vue';

export default {
  name: 'AddTagDialog',
  components: {
    // IconSearchMenu,
  },
  data() {
    return {
      folderIcon: mdiFolder,
      dialog: false,
      overlay: false,
      name: '',
      icon: '',
      icons: [],
      validateName: [(name) => (name && name.length > 0) || 'Required.'],
    };
  },
  computed: {
    iconList() {
      return Object.keys(mdijs);
    },
    // searchIcon() {
    //   // Use regex to search mdijs for icons matching folder name
    //   // :prepend-icon="searchIcon"
    //   const regex = new RegExp(this.folderName, 'gi');
    //   const folderIcon = this.$store.state.folderIcons.find((icon) => icon.match(regex));
    //   if (!this.folderName) return mdijs['mdiFolder'];
    //   else return mdijs[folderIcon] || mdijs['mdiFolder'];
    // },
    // folderIcon() {
    //   return mdiFolder;
    //   // return this.$store.state.folderIcons.map((icon) => mdijs[icon]);
    // },
  },
  methods: {
    submit() {
      if (this.name) {
        // Turn on loading
        this.overlay = true;
        this.$store.dispatch('tags/addTag', { name: this.name, icon: this.icon }).then(() => {
          // Turn off loading
          this.overlay = false;
          this.dialog = false;
          setTimeout(() => {
            this.name = '';
            this.icon = '';
          }, 200);
        });
      }
    },
    searchIcon(item) {
      return mdijs[item];
    },
    setIcon() {},
  },
};
</script>

<style></style>
