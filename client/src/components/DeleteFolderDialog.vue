<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="subtitle" v-bind="attrs" v-on="on"
        ><v-icon>{{ trashcanIcon }}</v-icon
        >Delete Folder</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="dialog__title">Are you sure you want to delete {{ name }}?</v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="deleteFolder()">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>

<script>
import { mdiTrashCanOutline } from '@mdi/js';

export default {
  name: 'DeleteFolderDialog',
  data: () => ({
    dialog: false,
    overlay: false,
    trashcanIcon: mdiTrashCanOutline,
  }),
  computed: {
    name() {
      return this.$store.state.selectedFolder.name;
    },
  },
  methods: {
    deleteFolder() {
      const id = this.$store.state.selectedFolder._id;
      // Turn on loading
      this.overlay = true;
      this.$store.dispatch('folders/deleteFolder', id).then(() => {
        // Turn off loading
        this.overlay = false;
        this.dialog = false;
        this.$router.push('/');
      });
    },
  },
};
</script>

<style></style>
