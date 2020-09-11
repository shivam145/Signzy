<template>
  <v-app>
    <v-main class="main">
      <Search />
    </v-main>
  </v-app>
</template>

<script>
import Search from "./components/search";

export default {
  name: "App",

  components: {
    Search,
  },

  data: () => ({}),
};
</script>

<style scoped>
.main {
  background-color: black;
}
</style>
