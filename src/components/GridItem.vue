<script setup lang="ts">
import VueDraggableResizable from 'vue-draggable-resizable'
import MultiAxisChart from "@/components/MultiAxisChart.vue";
import AreaChart from "@/components/AreaChart.vue";
import {useLayoutStore} from "@/stores/layoutStore";

const {dragged, resized, handles, elementPositions, getCoords, status} = useLayoutStore()
</script>

<template>
  <div
    :style="{
      position: 'relative',
      backgroundColor: '#2e8020',
      background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
      backgroundSize: '20px 20px, 20px 20px',
      height: '100vh',
      width: '100vw'
    }"
  >
    <vue-draggable-resizable
      :parent="true"
      :handles="handles"
      :x="elementPositions[1].x"
      :y="elementPositions[1].y"
      :w="elementPositions[1].width"
      :h="elementPositions[1].height"
      @-drag="(x,y) => dragged(x,y,1)"
      @-resize="(x,y,width,height) => resized(x,y,width,height,1)"
    >
      <slot />
    </vue-draggable-resizable>
  </div>
</template>

<style>
@import "vue-draggable-resizable/style.css";
</style>
