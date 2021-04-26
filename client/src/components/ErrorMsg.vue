<template>
  <v-snackbar
    v-model="snackbar"
    rounded="pill"
    timeout="-1"
    top
  >
    ERROR: {{ status }} : {{ error }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="red"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'ErrorMsg',
  data() {
    return {
      status: this.$store.state.error.data.status,
      error: this.$store.state.error.data.message,
      snackbar: false,
    }
  },
  created() {
    this.snackbar = true
  },
}
</script>
