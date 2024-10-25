<script setup lang="ts">
interface Props {
  disabled: boolean
  style:any
}

defineProps<Props>()
defineEmits('onFocus')
const value = defineModel('value')
</script>

<template>
<input
    :disabled="disabled"
    type="text"
    :value="value"
    @keyup="(evt) => {
      value = evt.target.value
    }"
    :style="{
      ...style ?? {},
    }"
     class="border-[0.5px] border-gray-200 p-2 focus:outline-none focus:ring-0 focus:border-green-500 text-sm font-sans w-full"
    placeholder=""
    @focus="$emit('onFocus')" />
</template>

<style scoped>

</style>
