<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {ResizeHandle} from '@/composables/ResizeHandle'

interface Props {
  width?:number
  height?:number
  enableResize?: boolean
}

const { width, height, enableResize} = withDefaults(defineProps<Props>(), {enableResize: true})
const emit = defineEmits(['updateWidth'])

const el=ref<HTMLDivElement | null>(null)
const resizerInstance=ref(null)
// Handle resizing by updating all cells in a given column
  function initializeResize(el: HTMLDivElement) {
  resizerInstance.value = new ResizeHandle(
        el,
        'left',
        {collapsable: true}
    )
}
onMounted(() => {
  if(width){
    el.value.style.width = width+'px'
  }

  if(height){
    el.value.style.height = height+'px'
  }

  initializeResize(el.value)

  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      emit('updateWidth', entry.contentRect.width)
    }
  });

  if (el.value) {
    observer.observe(el.value);
  }

  onUnmounted(() => {
    if (el.value) {
      observer.unobserve(el.value);
    }
  });
})

</script>
<template>
 <div class="flex-1 flex flex-row overflow-auto group/column">
    <div class="flex-1 overflow-auto min-w-[100px]" ref="el">
      <slot />
    </div>
    <div class="resize-handle opacity-0 group-hover/column:opacity-100" v-if="enableResize"></div>
  </div>
</template>


<style scoped>
.main {
        flex: 1;
        display: flex;
        flex-flow: row;
        margin: 0 1em 1em 1em;
        border: 1px solid #ddd;
        background-color: #fff;
        overflow: auto;
      }

      .content {
        flex: 1;
        overflow: auto;
        min-width: 200px;
      }


/* Handle */
.resize-handle.left, .resize-handle.right {
  width: 2px;
  background: #ccc;
  cursor: ew-resize;
}

.resize-handle.top, .resize-handle.bottom {
  height: 2px;
  background: #ccc;
  cursor: ns-resize;
}

.resize-handle.left:hover, .resize-handle.right:hover,
.resize-handle.top:hover, .resize-handle.bottom:hover {
  background: #aaa;
}

.handle-dragging * {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.handle-dragging.vertical * { cursor: ew-resize; }
.handle-dragging.horizontal * { cursor: ns-resize; }
</style>
