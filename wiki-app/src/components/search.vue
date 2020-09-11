<template>
  <v-form>
    <v-container>
      <v-row>
        <v-img
          src="https://upload.wikimedia.org/wikipedia/commons/d/de/Wikipedia_Logo_1.0.png"
          aspect-ratio="1"
          max-width="200px"
          class="img"
        ></v-img
      ></v-row>
      <v-form>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Wiki Search"
              single-line
              solo
              id="keyword"
              v-on:keyup.enter="getData"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              @click="getData"
              v-on:key.enter="getData"
              large
              color="primary"
              >Search</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <wikigallery :wikiData="wikiData"> </wikigallery>
    <div v-if="notFound">
      <v-card>
        {{ notFound }}
      </v-card>
    </div>
  </v-form>
</template>

<script>
import WikiGallery from "./wiki-gallery";

export default {
  components: {
    wikigallery: WikiGallery,
  },
  data: () => ({
    notFound: null,
    wikiData: null,
  }),
  mounted() {},
  methods: {
    getData: function() {
      //   event.stopPropagation();
      this.keyword = document.getElementById("keyword").value;
      let url = `http://localhost:3000/search/${this.keyword}`;
      this.$http
        .get(url, {
          headers: {},
        })
        .then((result) => {
          console.log(result);
          if (result.data.wikiItems.matchedkeywords.length === 0)
            this.notFound = "No Results Found";
          else this.notFound = null;
          this.wikiData = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.img {
  margin-top: 10%;
  margin-left: 18%;
}
.container {
  margin-left: 28%;
}
h1 {
  text-align: center;
}
</style>
