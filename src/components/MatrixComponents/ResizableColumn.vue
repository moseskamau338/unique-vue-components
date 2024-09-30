<template>
  <div class="resizable-column" :style="columnStyle">
    <slot></slot>
    <div class="resize-handle" @mousedown="startResizing"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  initialWidth: {
    type: Number,
    default: 100
  },
  colIndex: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['resize'])

const columnWidth = ref(props.initialWidth)
const isResizing = ref(false)

const columnStyle = computed(() => ({
  width: `${columnWidth.value}px`,
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'top',
}))

function startResizing(event) {
  isResizing.value = true
  document.addEventListener('mousemove', resizeColumn)
  document.addEventListener('mouseup', stopResizing)
}

function resizeColumn(event) {
  if (!isResizing.value) return
  const newWidth = event.clientX - event.target.getBoundingClientRect().left
  if (newWidth > 50) { // Prevent the column from becoming too small
    columnWidth.value = newWidth
    emit('resize', newWidth, props.colIndex) // Emit with column index
  }
}

function stopResizing() {
  isResizing.value = false
  document.removeEventListener('mousemove', resizeColumn)
  document.removeEventListener('mouseup', stopResizing)
}
</script>

<style scoped>
.resizable-column {
  border-right: 1px solid #e0e0e0;
}

.resize-handle {
  width: 5px;
  height: 100%;
  background-color: transparent;
  cursor: col-resize;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
