<script setup lang="ts">
import { computed } from 'vue';
import { NButton, NPopselect } from "naive-ui";

interface Props {
  keyType: 'number' | 'string' | 'boolean' | 'selection';
}

const props = defineProps<Props>();
const operator = defineModel('operator')

const operatorOptionsMap: Record<Props['keyType'], Array<{ label: string; value: string }>> = {
  number: [
    { label: 'Equals', value: '_eq' },
    { label: 'Not Equals', value: '_neq' },
    { label: 'Less Than', value: '_lt' },
    { label: 'Less Than or Equal', value: '_lte' },
    { label: 'Greater Than', value: '_gt' },
    { label: 'Greater Than or Equal', value: '_gte' },
    { label: 'Between', value: '_between' },
    { label: 'Not Between', value: '_nbetween' },
    { label: 'In', value: '_in' },
    { label: 'Not In', value: '_nin' },
    { label: 'Is Null', value: '_null' },
    { label: 'Is Not Null', value: '_nnull' },
  ],
  string: [
    { label: 'Equals', value: '_eq' },
    { label: 'Not Equals', value: '_neq' },
    { label: 'Contains', value: '_contains' },
    { label: 'Does Not Contain', value: '_ncontains' },
    { label: 'Starts With', value: '_starts_with' },
    { label: 'Does Not Start With', value: '_nstarts_with' },
    { label: 'Ends With', value: '_ends_with' },
    { label: 'Does Not End With', value: '_nends_with' },
    { label: 'Is Null', value: '_null' },
    { label: 'Is Not Null', value: '_nnull' },
  ],
  boolean: [
    { label: 'Equals', value: '_eq' },
    { label: 'Not Equals', value: '_neq' },
    { label: 'Is Null', value: '_null' },
    { label: 'Is Not Null', value: '_nnull' },
  ],
  selection: [
    { label: 'In', value: '_in' },
    { label: 'Not In', value: '_nin' },
    { label: 'Is Null', value: '_null' },
    { label: 'Is Not Null', value: '_nnull' },
  ],
};

const operatorOptions = computed(() => {
  return operatorOptionsMap[props.keyType] || [];
});

const operatorLabel = computed(() => {
  const option = operatorOptions.value.find((o) => o.value === operator.value);
  return option ? option.label : '-- Operator --';
});
</script>

<template>
  <n-popselect v-model:value="operator" scrollable :options="operatorOptions">
    <n-button icon-placement="right" size="small" type="primary" :bordered="false" tertiary>
      {{ operatorLabel }}
      <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="10" stroke-dashoffset="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l-5 -5M12 15l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="10;0"/></path></svg>
        </template>
    </n-button>
  </n-popselect>
</template>
