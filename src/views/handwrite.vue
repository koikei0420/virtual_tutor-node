<template>
<v-container>
  <v-layout
    wrap
    justify-center
  >
    <v-flex
      xs12 md9
    >
      <v-card
        v-if="$vuetify.breakpoint.smAndDown"
        height="500"
        class="ma-3 pa-6"
        outlined
        tile
        justify-center
      >
      <v-layout justify-center>
        <Canvas />
      </v-layout>
      </v-card>
      <v-card
        v-if="$vuetify.breakpoint.mdAndUp"
        max-width="1600"
        height="450"
        class="ma-3 pa-6"
        outlined
        tile
        justify-center
      >
      <v-layout justify-center>
        <Canvas />
      </v-layout>
      </v-card>
    </v-flex>
    <v-flex
      xs12 md3
      align-content-center
    >
      <v-card
        v-if="$vuetify.breakpoint.smAndDown"
        height="100"
        class="ma-3 pa-6"
        outlined
        tile
      >
        b
      </v-card>
      <v-card
        v-if="$vuetify.breakpoint.mdAndUp"
        max-width="400"
        height="450"
        class="ma-3 pa-6"
        outlined
        tile
      >
        b
      </v-card>
    </v-flex>
    <v-btn 
      type="submit" 
      dark 
      color="indigo"
    >Submit</v-btn>
    <v-btn :to="{name: 'top'}">Cancel</v-btn>
  </v-layout>
</v-container>
</template>

<script>
import { saveQuestion } from "../lib/api-service";
import Canvas from "./canvas.vue";

export default {
  name: "HandWrite",
  components: {
    Canvas,
  },
  data: () => ({
    mode: '',
    brushColor: '',
    defaultMode: 'brush',
    defaultBrushColor: '#FFFFFF'
  }),
  mounted: function() {
    this.init();
  },
  methods: {
    init: function() {
      this.mode = this.defaultMode;
      this.brushColor = this.defaultBrushColor;
    },
    async saveQuestion() {
      const body = this.body;
      const question = {
        body
      };
      await saveQuestion(question)
      this.$router.push({ name: "top" });
    },
  }
};
</script>