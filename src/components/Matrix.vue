<script setup lang="ts">
import {NButton, NButtonGroup, NColorPicker, NDivider, NInput, NIcon} from 'naive-ui'
  import { TextItalic24Regular, TextBold24Regular, TextUnderline24Regular, TextStrikethrough24Regular } from '@vicons/fluent'
import {computed, type CSSProperties, ref} from "vue";

let cols = ref(2)
let rows = ref(2)
const current_cell=ref(null)
const style=ref<Record<string, CSSProperties>>({})

const style_panel = ref([
  {
    icon:TextBold24Regular,
    css_property:'font-weight',
    css_value:'bold'
  },
   {
    icon:TextUnderline24Regular,
    css_property:'text-decoration',
    css_value:'underline'
  },
    {
    icon:TextStrikethrough24Regular,
    css_property:'text-decoration',
    css_value:'line-through'
  },
     {
    icon:TextItalic24Regular,
    css_property:'font-style',
    css_value:'italic'
  },

])

const input_values = ref({})

function applyStyle(property: CSSProperties, value){
  if(!style.value[current_cell.value]){
    style.value[current_cell.value] = {}
  }
  style.value[current_cell.value][property] = value
}

const currentStyles = (value): string[] =>{
  return Object.keys(style.value?.[current_cell.value] || {})
      .filter(key => style.value?.[current_cell.value][key] === value)
}
</script>

<template>
  <pre>
    {{JSON.stringify(input_values, null,2)}}
  </pre>
  <div class="bg-white border border-slate-200 rounded p-2 w-1/2 flex flex-row justify-between">
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
  <div class="relative group">
    <!--horizontal-->
    <div class="grid place-items-center items-center relative w-1/2 mx-auto opacity-0 group-hover:opacity-100">
      <div role="separator" class="h-px w-full bg-slate-200 absolute inset-y-5 z-0"></div>
      <n-button-group size="small" class="relative z-10 bg-white p-1">
        <n-button @click="cols--" class="!px-4">-</n-button>
        <n-button @click="cols++" class="!px-4">+</n-button>
      </n-button-group>
    </div>

    <div class="flex flex-row relative">
      <div class="opacity-0 group-hover:opacity-100 absolute -left-12">
          <div class="flex flex-col items-center justify-center relative h-[200px]">
            <div role="separator" class="w-px h-full bg-slate-200 absolute inset-[1.6rem] z-0"></div>
            <n-button-group size="small" vertical class="relative z-10 bg-white p-1">
              <n-button @click="rows--" class="!px-4">-</n-button>
              <n-button @click="rows++" class="!px-4">+</n-button>
            </n-button-group>
          </div>
      </div>

      <table class="border-collapse h-fit">
        <tbody>
              <tr v-for="r in rows">
                <td v-for="c in cols" style="padding: 0">
                  <n-input
                      :value="input_values[`${r}-${c}`]"
                      :on-update:value="(val) => {
                        input_values[`${r}-${c}`] = val
                      }"
                      :style="{
                        ...style[`${r}-${c}`] ?? {},
                      }"
                      :class="[
                          r !== rows ? 'border-[0.5px]' : 'border-b-none',
                          c !== cols ? 'border-r-[0.5px]' : 'border-r-none',
                      ]"
                      size="tiny" class="!border-slate-300 !text-xs outline-0 !p-1 ring-0 !w-[90px] !rounded-none"
                      placeholder=""
                      @focus="() => current_cell = `${r}-${c}`" />
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
