import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout-store', () => {
  const status = ref<boolean>(false)
  // Handle positions
  const handles = ['tl', 'tr', 'mr', 'br', 'bm', 'bl', 'ml', 'tm'];

  // Reactive array to store positions
  const elementPositions = ref([
    { id: 'chart1', x: 0, y: 0, width: undefined, height: undefined },
    { id: 'chart2', x: 0, y: 0, width: undefined, height: undefined }
  ]);

  function dragged(x,y, id){
    elementPositions.value[id] = { ...elementPositions.value[id], x, y };
  }

  function resized(x, y, width, height, id){
    elementPositions.value[id] = { ...elementPositions.value[id], x, y, width, height };
  }

  // Save coordinates when the button is clicked
  const getCoords = () => {
    console.log('Saved Coordinates:', elementPositions.value);
    // You can send this data to an API or save it to local storage
    return elementPositions.value
  };

  return { dragged, resized, handles, elementPositions, getCoords, status }
})
