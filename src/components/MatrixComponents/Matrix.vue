<script setup lang="ts">
import {NButton, NButtonGroup, NColorPicker, NDivider, NIcon} from 'naive-ui'
import ResizableColumn from "@/components/MatrixComponents/ResizableColumn.vue";
import {useMatrix} from "@/composables/matrix";
import {onMounted} from "vue";
import TableInput from "@/components/MatrixComponents/TableInput.vue";

interface Props {
  viewOnly?: boolean
  data?: {style:any,widths:any,input_values:any, cols:number, rows:number}
}

const props = defineProps<Props>()

const {
  style_panel,
  transformLegacyData,
  cols,
  rows,
  current_cell,
  style,
  widths,
  input_values,
  applyStyle,
  handleUpdateWidth,
  currentStyles
} = useMatrix()

onMounted(() => {
  if(props.data){
    // set defaults of data is provided
    input_values.value = props.data.input_values
    style.value = props.data.style
    widths.value = props.data.widths
    cols.value = props.data.cols
    rows.value = props.data.rows
  }
})

</script>

<template>
  <div v-if="!viewOnly" class="bg-white border border-slate-200 rounded p-2 w-1/2 flex flex-row justify-between">
    <n-button-group class="flex flex-row">
      <n-button v-for="item in style_panel" size="small"
                :quaternary="!currentStyles(item.css_value).includes(item.css_property)"
                :tertiary="currentStyles(item.css_value).includes(item.css_property)"
                @click="() => applyStyle(item.css_property, currentStyles(item.css_value).includes(item.css_property) ? null : item.css_value)">
        <template #icon>
          <n-icon :component="item.icon" />
        </template>
      </n-button>
      <n-button size="small" quaternary> <n-color-picker
          class="!w-20 !h-6"
          :value="style[current_cell]?.['color']"
          :on-update:value="(value) => {
              style[current_cell] ??= {}
            style[current_cell]['color'] = value
          }" />
      </n-button>
    </n-button-group>
    <n-divider vertical/>
    <n-button tertiary size="small">Configure</n-button>
    <n-divider vertical/>
    {{current_cell}}
  </div>
  <div class="relative group/matrix">
    <!--horizontal-->
    <div v-if="!viewOnly" class="grid place-items-center items-center relative w-1/2 mx-auto opacity-0 group-hover/matrix:opacity-100">
      <div role="separator" class="h-px w-full bg-slate-200 absolute inset-y-5 z-0"></div>
      <n-button-group size="small" class="relative z-10 bg-white p-1">
        <n-button @click="cols--" class="!px-4">-</n-button>
        <n-button @click="cols++" class="!px-4">+</n-button>
      </n-button-group>
    </div>

    <div class="flex flex-row relative">
      <div v-if="!viewOnly" class="opacity-0 group-hover/matrix:opacity-100 absolute -left-12">
          <div class="flex flex-col items-center justify-center relative h-[200px]">
            <div role="separator" class="w-px h-full bg-slate-200 absolute inset-[1.6rem] z-0"></div>
            <n-button-group size="small" vertical class="relative z-10 bg-white p-1">
              <n-button @click="rows--" class="!px-4">-</n-button>
              <n-button @click="rows++" class="!px-4">+</n-button>
            </n-button-group>
          </div>
      </div>

      <table class="border-collapse h-fit">
        <thead v-if="!viewOnly">
        <tr>
          <td v-for="i in cols" style="height: 20px">
            <ResizableColumn @update-width="(width) => handleUpdateWidth(i, width)">
              {{i}}
            </ResizableColumn>
          </td>
        </tr>
        </thead>
        <tbody>
              <tr v-for="r in rows">
                <td v-for="c in cols" style="padding: 0">
                  <template v-if="r == 1">
                    <ResizableColumn @update-width="(width) => handleUpdateWidth(c, width)">
                      <table-input
                        :key="`${r}_${c}`"
                          :style="style[`${r}_${c}`] ?? {}"
                          :disabled="viewOnly"
                        v-model:value="input_values[`${r}_${c}`]"
                        @onFocus="() => current_cell = `${r}_${c}`"
                        />
                    </ResizableColumn>
                  </template>
                  <table-input
                      v-else
                      :key="`${r}_${c}`"
                        :style="style[`${r}_${c}`] ?? {}"
                        :disabled="viewOnly"
                      v-model:value="input_values[`${r}_${c}`]"
                      @onFocus="() => current_cell = `${r}_${c}`"
                      />
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style>
.n-color-picker-trigger__value{display: none}
</style>
