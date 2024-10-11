<script setup lang="ts">
import type {FieldFilter} from '@/types/query_types'
import {NButton} from "naive-ui";
import {ref} from "vue";
import QueryGroup from "@/components/QueryBuilderComponents/QueryGroup.vue";

const filterValue = ref<Record, FieldFilter[]>({});
const availableKeys = [
  { label: 'Name', value: 'name', type: 'string' },
  { label: 'Age', value: 'age', type: 'number' },
  { label: 'Is Active', value: 'isActive', type: 'boolean' },
  {
    label: 'Category',
    value: 'category',
    type: 'selection',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
];
</script>

<template>
<div class="grid grid-cols-2 divide-x divide-slate-200">
  <div>
    <n-button class="!w-fit">Query Builder</n-button>
    <div class="mt-4">
      <QueryGroup v-model:group="filterValue" :available-keys="availableKeys" />
    </div>
  </div>
  <div class="px-4">
    Results
<pre class="bg-slate-100 p-2">
{{JSON.stringify(filterValue, null, 2)}}
</pre>
  </div>
</div>
</template>

<style scoped>

</style>
