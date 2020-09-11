<template>
  <div id="app">
    <v-app id="inspire">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{ pageData.pageTitle }}</v-toolbar-title>

              <v-spacer></v-spacer>

              <div class="search">
                <v-text-field
                  label="Find"
                  outlined
                  id="findTextBox"
                ></v-text-field>

                <v-btn icon class="searchButtonClickText_h">
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

            <div class="img">
              <v-img
                :src="pageData.pageDetails.originalimage.source"
                max-width="300px"
                class="imgbox"
              >
              </v-img>
            </div>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card flat>
                  <v-card-text
                    v-text="pageData.pageDetails.extract"
                    id="context"
                  >
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
export default {
  props: ["pageData"],
  data: () => ({
    dialog: false,
  }),

  methods: {
    displaytext: function() {
      var keyword = document.getElementById("findTextBox").value;
      window.find(keyword);
      //   var context = document.getElementById("context").value;
      //   console.log(context);
      //   var instance = new Mark(context);
      //   instance.mark(keyword);
      //   console.log(document.getElementById("context"));
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  padding-top: 5rem;
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

<!--<v-card>
    <v-toolbar color="cyan" dark flat>
      <v-toolbar-title>{{ pageData.pageTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="search">
        <v-text-field label="Find" outlined></v-text-field>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
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
    <div class="img">
      <v-img
        :src="pageData.pageDetails.originalimage.source"
        max-width="300px"
        class="imgbox"
      >
      </v-img>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text v-text="pageData.pageDetails.extract"> </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>-->
