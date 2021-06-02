<template>
  <v-dialog v-model="dialog" width="500">
    <!-- <v-tooltip top> -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="delete-button" v-bind="attrs" v-on="on"
        ><v-icon>{{ trashcanIcon }}</v-icon></v-btn
      >
    </template>
    <!-- <span>Delete Folder</span>
    </v-tooltip> -->
    <v-card>
      <v-card-title style="padding-bottom: 0;">Are you sure you want to delete:</v-card-title>
      <v-card-title style="padding: 0 1.5rem 1rem 1.5rem;">{{ name }}?</v-card-title>
      <v-card-subtitle>This will delete ALL bookmarks in this folder.</v-card-subtitle>
      <v-card-subtitle>You cannot undo this action.</v-card-subtitle>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false" id="delete-folder-cancel-btn">
          Cancel
        </v-btn>
        <v-btn color="red" text @click="deleteFolder()" id="delete-folder-submit-btn">
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
// DeleteFolderDialog.vue displays a dialog when the trash can icon in the Folder.vue view is clicked
import { mdiTrashCanOutline } from '@mdi/js'

export default {
  name: 'DeleteFolderDialog',
  data() {
    return {
      dialog: false,
      overlay: false,
      trashcanIcon: mdiTrashCanOutline,
    }
  },
  computed: {
    name() {
      return this.$store.state.folders.selectedFolder.name
    },
  },
  methods: {
    deleteFolder() {
      const id = this.$store.state.folders.selectedFolder._id
      this.overlay = true
      this.$store.dispatch('folders/deleteFolder', id).then(() => {
        this.overlay = false
        this.dialog = false
        this.$router.push('/')
      })
    },
  },
};
</script>

<style>
.delete-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 50px;
}
</style>
