<template>
  <v-row>
    <v-col v-for="item in items" :key="item.id" cols="12" md="4">
      <v-card outlined class="mx-auto">
        <v-img class="white--text align-end" height="200px" :src="item.src">
          <v-card-title>{{ item.title }}</v-card-title>
        </v-img>
        <v-card-subtitle class="pb-0">{{ item.subtitle }}</v-card-subtitle>
        <v-card-text class="text--primary">
          <div>{{ item.description }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text>More</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "wiki_gallery",

  data: () => ({
    items: [
      {
        id: 1,
        title: "Top western road trips",
        subtitle: "1,000 miles of wonder",
        description:
          "His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.",
        src:
          "https://post.greatist.com/wp-content/uploads/sites/3/2020/02/325466_1100-1100x628.jpg",
      },
      {
        id: 2,
        title: "Christmas tales to read",
        subtitle: "2,000 miles of wonder",
        description:
          "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
        src:
          "https://post.greatist.com/wp-content/uploads/sites/3/2020/02/325466_1100-1100x628.jpg",
      },
      {
        id: 3,
        title: "20 movies not to miss in 2020",
        subtitle: "3,000 miles of wonder",
        description:
          "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
        src:
          "https://post.greatist.com/wp-content/uploads/sites/3/2020/02/325466_1100-1100x628.jpg",
      },
    ],
  }),
};
</script>
