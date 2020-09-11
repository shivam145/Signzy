<template>
  <div id="pad-card">
    <v-row v-if="wikiData">
      <v-col
        v-for="item in wikiData.data.wikiItems.matchedkeywords.length"
        :key="item"
        cols="3"
      >
        <v-card outlined class="mx-auto">
          <v-img
            class="white--text align-end"
            height="200px"
            v-if="wikiData.data.wikiItems.body[item - 1].originalimage"
            :src="wikiData.data.wikiItems.body[item - 1].originalimage.source"
          >
          </v-img>
          <v-img
            class="white--text align-end"
            height="200px"
            v-else
            :src="imgErr"
          >
          </v-img>

          <v-card-subtitle class="pb-0">{{
            wikiData.data.wikiItems.matchedkeywords[item - 1]
          }}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              {{
                wikiData.data.wikiItems.body[item - 1].extract
                  .substr(
                    0,
                    100 -
                      wikiData.data.wikiItems.matchedkeywords[item - 1].length
                  )
                  .concat("....")
              }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="
                showDetails(
                  wikiData.data.wikiItems.matchedkeywords[item - 1],
                  wikiData.data.wikiItems.body[item - 1]
                )
              "
              >More</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <!-- <v-icon>mdi-close</v-icon> -->
        </v-btn>
        <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="search">
          <v-text-field label="Find" outlined id="findTextBox"></v-text-field>

          <v-btn icon>
            <v-icon @click="displaytext">mdi-magnify</v-icon>
          </v-btn>
        </div>

        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab>
              Information
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-card>
        <div class="img">
          <v-img :src="pageImage" max-width="300px" class="imgbox"> </v-img>
        </div>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text v-text="pageExtract" id="context"> </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
    <!-- <div>
      <p>
        {{ wikiData }}
      </p>
    </div> -->
    <!-- <moredetails :pageData="pageData"> </moredetails> -->
  </div>
</template>

<script>
//import MoreDetails from "./moreDetails";

export default {
  name: "wiki_gallery",
  props: ["wikiData"],

  // components: {
  //   moredetails: MoreDetails,
  // },
  data: () => ({
    tab: null,
    imgErr:
      "https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg",
    pageData: null,
    dialog: false,
    pageTitle: null,
    pageImage: null,
    pageExtract: null,
  }),

  methods: {
    showDetails: function(pageTitle, pageDetails) {
      console.log(pageDetails.extract);
      this.dialog = true;
      this.pageTitle = pageTitle;
      if (pageDetails.originalimage)
        this.pageImage = pageDetails.originalimage.source;
      else this.pageImage = this.imgErr;
      this.pageExtract = pageDetails.extract;
    },
    displaytext: function() {
      var keyword = document.getElementById("findTextBox").value;
      window.find(keyword);
    },
  },
};
</script>

<style scoped>
#pad-card {
  padding-left: 1rem;
  padding-right: 1rem;
}
.text--primary {
  text-align: justify;
}
.search {
  display: flex;
  padding-top: 3rem;
}

.img {
  width: 100%;
  display: flex;
  justify-content: center;
}

.imgbox {
  margin-top: 3rem;
  border-radius: 15rem;
}
</style>
