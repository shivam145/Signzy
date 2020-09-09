<template>
  <v-app>
    <v-main>
      <WikiGallery />
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import WikiGallery from "./components/wiki-gallery";
export default {
  name: "App",

  components: {
    WikiGallery,
  },

  data: () => ({
    //
  }),
};
</script>
