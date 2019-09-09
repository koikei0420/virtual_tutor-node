<template>
  <div>
    <div ref="container">
      <canvas
        :width="width/2"
        :height="height/2"
        ref="canvas">
      </canvas>
    </div>
  </div>
</template>

<script>
import Konva from 'konva';

export default {
  name: 'HandWrite',
  props: {
    mode: {
      type: String,
      default: ''
    },
    brushColor: {
      type: String,
      default: ''
    },
    brushSize: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    stage: null,
    canvas: null,
    context: null,
    drawingLayer: null,
    drawingScope: null,
    lastPointerPosition: {},
    localPos: {
      x: 0,
      y: 0
    },
    pos: null,
    isPaint: false,
    undoDataStack: [],
    redoDataStack: [],
  }),
  mounted: function () {
    var container = this.$refs.container;
    this.stage = new Konva.Stage({
      container,
      width: this.width,
      height: this.height,
    });
    this.drawingLayer = new Konva.Layer();
    this.stage.add(this.drawingLayer);

    this.canvas = this.$refs.canvas;
    this.drawingScope = new Konva.Image({
      image: this.canvas,
      x: this.width / 4,
      y: 5,
      stroke: 'black',
    });
    this.drawingLayer.add(this.drawingScope);
    this.stage.draw();

    this.context = this.canvas.getContext('2d');
    this.context.strokeStyle = this.brushColor;
    this.context.lineJoin = 'round';
    this.context.lineWidth = this.brushSize;

    this.drawingScope.on('mousedown', this.mousedown);
    this.stage.addEventListener('mouseup', this.mouseup);
    this.stage.addEventListener('mousemove', this.mousemove);
    this.drawingScope.on('touchstart', this.mousedown);
    this.stage.addEventListener('touchend', this.mouseup);
    this.stage.addEventListener('touchmove', this.mousemove);
  },
  methods: {
    mousedown: function () {
      this.isPaint = true;
      this.lastPointerPosition = this.stage.getPointerPosition();
      this.undoDataStack.push(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
    },
    mouseup: function () {
      this.isPaint = false;
    },
    mousemove: function () {
      if (!this.isPaint) {
        return;
      }
      if (this.mode) {
        this.context.globalCompositeOperation = 'source-over';
      } else {
        this.context.globalCompositeOperation = 'destination-out';
      }
      this.context.beginPath();

      this.localPos.x = this.lastPointerPosition.x - this.drawingScope.x();
      this.localPos.y = this.lastPointerPosition.y - this.drawingScope.y();

      this.context.moveTo(this.localPos.x, this.localPos.y);

      this.pos = this.stage.getPointerPosition();
      this.localPos.x = this.pos.x - this.drawingScope.x();
      this.localPos.y = this.pos.y - this.drawingScope.y();

      this.context.lineTo(this.localPos.x, this.localPos.y);
      this.context.closePath();
      this.context.stroke();
      this.drawingLayer.draw();

      this.lastPointerPosition = this.pos;
    },
    onClearCanvas: function () {
      this.undoDataStack.push(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
      this.context.globalCompositeOperation = 'destination-out';
      this.context.fillRect(0, 0, this.width, this.height);
      this.drawingLayer.draw();
      this.$emit('on-reset');
    },
    undo: function () {
      if (this.undoDataStack.length < 1) {
        return;
      }

      this.redoDataStack.push(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));

      this.context.putImageData(this.undoDataStack.pop(), 0, 0);
      this.drawingLayer.draw();
    },
    redo: function () {
      if (this.redoDataStack.length < 1) {
        return;
      }

      this.undoDataStack.push(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));

      this.context.putImageData(this.redoDataStack.pop(), 0, 0);
      this.drawingLayer.draw();
    },
    saveImage: function() {
      return this.$refs.canvas.toDataURL("image/png", 0.85);
    },
  },
  watch: {
    brushColor: function () {
      this.context.strokeStyle = this.brushColor;
    },
    brushSize: function () {
      this.context.lineWidth = this.brushSize;
    },
    mode: function() {
      if (this.mode) {
        this.context.globalCompositeOperation = 'source-over';
      } else {
        this.context.globalCompositeOperation = 'destination-out';
      }
    },
  }
}
</script>