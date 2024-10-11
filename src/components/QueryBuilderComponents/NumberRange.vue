<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import { ref, watch, defineEmits, defineProps } from 'vue'

// Define props to receive 'range' from the parent
const props = defineProps({
  range: {
    type: Object,
    default: () => ({ min: 0, max: 10 })
  }
})

// Define emits to notify the parent of changes
const emit = defineEmits(['update:range'])

// Create refs for min and max based on the props
const min = ref(props.range.min)
const max = ref(props.range.max)

// Watch for changes in min and max and emit the updated range to the parent
watch([min, max], ([newMin, newMax]) => {
  emit('update:range', { min: newMin, max: newMax })
})

</script>

<template>
  <div class="flex flex-row space-x-2 items-center">
    <n-input-number v-model:value="min" placeholder="min" :show-button="false" />
    <n-input-number v-model:value="max" placeholder="max" :show-button="false" />
  </div>
</template>

<style scoped>
</style>
