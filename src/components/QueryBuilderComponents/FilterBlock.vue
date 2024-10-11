<template>
  <div class="flex flex-row space-x-4 items-center group/filter mb-2">
    <div class="flex flex-row space-x-4 items-center border border-slate-200 p-2 rounded-xl">
    <!-- Key Selector -->
    <KeySelector
      v-model:selectedKey="selectedKey"
      :default-value="availableKeys[0]['value']"
      :entries="availableKeys"
    />

    <!-- Operator Selector -->
    <OperatorSelector
      v-model:operator="selectedOperator"
      :keyType="keyType"
    />

    <!-- Value Input -->
      <template v-if="selectedOperator !== '_between' && selectedOperator !== '_nbetween'">
        <component
            v-if="selectedOperator !== '_nnull' && selectedOperator !== '_null'"
            :disabled="!selectedOperator || !selectedOperator.length"
          :is="valueInputComponent"
        />
      </template>
      <NumberRange
          v-else-if="selectedOperator !== '_nnull' && selectedOperator !== '_null'" :range="inputValue || {min:0, max:10}"
          @update:range="(val) => {
            inputValue = val
          }" />
    </div>

    <!-- Remove Filter Button (Optional) -->
    <n-button @click="removeFilter" type="error" size="tiny" quaternary class="opacity-0 group-hover/filter:opacity-100">
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"/></svg>
      </template>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import {computed, watch, ref, h, nextTick} from 'vue';
import { NButton, NInput as TextInput, NCheckbox as BooleanInput, NSelect as SelectInput, NInputNumber as NumberInput } from 'naive-ui';
import KeySelector from './KeySelector.vue';
import OperatorSelector from './OperationSelector.vue';
import type {FieldFilter} from "@/types/query_types";
import NumberRange from "@/components/QueryBuilderComponents/NumberRange.vue";

interface Props {
  availableKeys: Array<{ label: string; value: string; type: 'string' | 'number' | 'boolean' | 'selection';
  options?: Array<{ label: string; value: any }> }>;
}

const {availableKeys} = defineProps<Props>();
const emit = defineEmits(['remove'])
const filter = defineModel<FieldFilter>('filter', {default: {}})

const selectedKey = ref<string>('');
const selectedOperator = ref<string>('');
const inputValue = ref<any>(null);

async function setValue(value){
  if(typeof filter.value === 'object' && !Object.keys(filter.value).length){
    console.log('filter is empty----')
    filter.value[selectedKey.value] = {}
  }
  await nextTick(() => {
    filter.value[selectedKey.value] = {[selectedOperator.value]: value}
  })
}

// Watch for changes to update modelValue
watch(selectedKey, () => {
  if (selectedKey.value && selectedKey.value.length) {
    filter.value = {
      [selectedKey.value]: {},
    }
  } else {
    filter.value = {}
  }
});

watch(selectedOperator, () => {
  if (selectedOperator.value) {
    filter.value = {
      [selectedKey.value]: {},
    }
    //if nulling checks are applied, set end value to {}
    if(selectedOperator.value === '_nnull' || selectedOperator.value === '_null'){
      inputValue.value = null
    }
    setValue(inputValue.value)
  } else {
    filter.value = {}
  }
});

watch(inputValue, () => {
  setValue(inputValue.value)
});

// Determine keyType based on selectedKey
const keyType = computed(() => {
  const key = availableKeys.find((k) => k.value === selectedKey.value);
  return key ? key.type : 'string';
});

// Options for selection type
const valueOptions = computed(() => {
  const key = availableKeys.find((k) => k.value === selectedKey.value);
  return key && key.options ? key.options : [];
});

// Dynamic component selection based on keyType
const valueInputComponent = computed(() => {
  switch (keyType.value) {
    case 'number':
      return h(NumberInput, {
        value:inputValue.value,
        placeholder:`Enter ${selectedKey.value || 'value'}`,
        "onUpdate-value":(val) => inputValue.value = val
      });
    case 'boolean':
      return h(BooleanInput, {
        value:inputValue.value,
        "onUpdate-checked":(val) => inputValue.value = val
      });
    case 'selection':
      return h(SelectInput, {
        value:inputValue.value,
        style:{width: '180px'},
        options: valueOptions.value,
        multiple: true,
        maxTagCount:1,
        placeholder:`Enter ${selectedKey.value || 'value'}`,
        "onUpdate-value":(val) => inputValue.value = val
      });
    default:
      return h(TextInput, {
        value:inputValue.value,
        placeholder:`Enter ${selectedKey.value || 'value'}`,
        "onUpdate-value":(val) => inputValue.value = val
      });
  }
});

// Remove filter handler
const removeFilter = () => {
  emit('remove');
};
</script>

<style scoped>
</style>
