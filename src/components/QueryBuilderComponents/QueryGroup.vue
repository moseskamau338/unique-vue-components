<script setup lang="ts">
import {NButton, NEmpty, NPopselect} from "naive-ui";
import FilterBlock from "@/components/QueryBuilderComponents/FilterBlock.vue";
import {nextTick, onMounted, ref, watch} from "vue";

interface Props {
  canDelete?:boolean,
   availableKeys: Array<{ label: string; value: string; type: 'string' | 'number' | 'boolean' | 'selection'; options?: Array<{ label: string; value: any }> }>;
}

const {availableKeys=[], canDelete=false} = defineProps<Props>()
const emit = defineEmits(['remove'])

const group = defineModel('group', {default:{}})
const groupConditions = ref([])
const groupOperator = ref('_and')
const logical_operators = ref([
        {label:'AND', value:'_and'},
        {label:'OR', value:'_or'},
    ])
function addFilter(){
  groupConditions.value.push({})
}
function addGroup(){
  console.log('---adding group---')
  console.log('---groupConditions - BEFORE---',groupConditions.value)
  groupConditions.value.push({
    [groupOperator.value]: [],
    is_group: true
  })
  console.log('---groupConditions - AFTER---',groupConditions.value)
}

watch(() => groupOperator.value, () => {
  group.value = {
    [groupOperator.value]: groupConditions.value,
    is_group: true
  }
})

watch(() => groupConditions.value, async () => {
  console.log('-----groupConditions, changed-----')
  console.log(groupConditions.value)
  await nextTick(() => {
    group.value[groupOperator.value] = groupConditions.value
  })
})

onMounted(() => {
  group.value = {
    [groupOperator.value]: groupConditions.value,
    is_group: true
  }
})

</script>

<template>
  <div class="pb-4 group/group">
    <div class="border-l border-slate-200">
      <div class="flex flex-row items-center space-x-2 group/selector">
        <n-popselect v-model:value="groupOperator" :options="logical_operators">
          <n-button icon-placement="right" size="small" :type="groupOperator === '_and' ? 'primary' : 'info'" :bordered="false" tertiary class="!-ml-2 !bg-slate-100 !hover:bg-slate-200/80">
            {{ logical_operators.find(item=>item.value === groupOperator)?.label || '----' }}
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="10" stroke-dashoffset="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l-5 -5M12 15l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="10;0"/></path></svg>
            </template>
          </n-button>
        </n-popselect>
        <n-button v-if="canDelete" @click="() => emit('remove')" type="error" size="tiny" quaternary class="opacity-0 group-hover/selector:opacity-100">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"/></svg>
          </template>
        </n-button>
      </div>
      <div class="pl-8 py-2">
        <template v-for="(item, index) in groupConditions">
          <QueryGroup
            v-if="item.is_group"
            can-delete
            :available-keys="availableKeys"
            @remove="() => groupConditions.splice(index,1)"
            v-model:group="groupConditions[index]" />

          <FilterBlock
            v-else
            v-model:filter="groupConditions[index]"
            @remove="() => groupConditions.splice(index,1)"
            :availableKeys="availableKeys"
          />
        </template>
        <n-empty v-if="!groupConditions.length" size="tiny" description="No filters or groups" class="w-1/4" />
      </div>
    </div>
    <div class="flex flex-row space-x-6 opacity-0 group-hover/group:opacity-100">
      <n-button text type="primary" @click="addFilter">+ Add condition</n-button>
      <n-button text type="primary" @click="addGroup">+ Add group</n-button>
    </div>
  </div>
</template>

<style scoped>

</style>
