<template>
<v-container>
  <v-layout
    wrap
    justify-center
  >
    <v-flex
      xs12 md9
    >
      <v-layout justify-center>
        <Canvas
          :brushColor="brushColor"
          :brushSize="brushSize"
          :mode="mode"
          ref="Canvas"
        />
      </v-layout>
    </v-flex>
    <v-flex
      xs12 md3
      wrap
    >
      <v-layout wrap>
        <v-switch 
          v-model="mode"
          label="brush"
        />
        <v-color-picker 
          class="ma-2"
          hide-inputs
          v-model="brushColor"
        />
        <v-slider
          v-model="brushSize"
          append-icon="mdi-minus"
          prepend-icon="vmdi-puls"
          min=1
          max=40
          label="Size"
        />
        <v-btn
          @click="undo"
        >
          <v-icon>undo</v-icon>
        </v-btn>
        <v-btn
          @click="redo"
        >
          <v-icon>redo</v-icon>
        </v-btn>
        <v-btn
          @click="save"
        >
          save
        </v-btn>
        <v-btn
          @click="clearCanvas"
        >
          clear
        </v-btn>

        <a
          v-if="imageLink"
          :href="imageLink"
        >ダウンロード</a>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import Canvas from "./canvas.vue";

export default {
  name: "HandWrite",
  components: {
    Canvas,
  },
  data: () => ({
    mode: true,
    brushColor: '#0000FF',
    brushSize: 5,
    imageLink: '',
  }),
  mounted: function() {
    this.init();
  },
  methods: {
    clearCanvas: function () {
      this.$refs.Canvas.onClearCanvas();
      this.init();
    },
    undo: function () {
      this.$refs.Canvas.undo();
    },
    redo: function () {
      this.$refs.Canvas.redo();
    },
    save: function () {
      this.imageLink = this.$refs.Canvas.saveImage();
    }
  }
};
</script>