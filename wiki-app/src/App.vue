<template>
  <v-app>
    <v-main>
      <Search />
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

import Search from "./components/search";

export default {
  name: "App",

  components: {
    Search,
  },

  data: () => ({}),
};
</script>
