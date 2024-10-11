<script setup lang="ts">
import { NButton, NPopselect } from "naive-ui";
import {onMounted} from "vue";

interface Props {
  entries: string[];
  defaultValue: string;
}

const {entries = [], defaultValue} = defineProps<Props>();
const selectedKey = defineModel('selectedKey')

onMounted(() => {
  selectedKey.value = defaultValue
})
</script>

<template>
  <n-popselect v-model:value="selectedKey" scrollable :options="entries">
    <n-button icon-placement="right" size="small" type="primary" :bordered="false" quaternary>
      {{ selectedKey ?? '--Select key --' }}
      <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="10" stroke-dashoffset="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l-5 -5M12 15l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="10;0"/></path></svg>
        </template>
    </n-button>
  </n-popselect>
</template>
