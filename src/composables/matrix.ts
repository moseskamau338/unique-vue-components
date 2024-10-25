import {type CSSProperties, ref} from "vue";
  import { TextItalic24Regular, TextBold24Regular, TextUnderline24Regular, TextStrikethrough24Regular } from '@vicons/fluent'
import type {WidgetSettings} from "@/types/matrix_types";

export function useMatrix(){
      let cols = ref(2)
    let rows = ref(2)
    const current_cell=ref(null)
    const style=ref<Record<string, CSSProperties>>({})
    const input_values = ref({})
    const widths = ref({})
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

    function applyStyle(property: CSSProperties, value){
          if(!style.value[current_cell.value]){
            style.value[current_cell.value] = {}
          }
          style.value[current_cell.value][property] = value
        }

    function transformLegacyData(matrix_settings: WidgetSettings) {
          const input_values = {};
          const style = {};
          const widths = {};

          // Get the sheet data (assuming a single sheet)
          const sheets = matrix_settings.matrix_config.sheets;
          const sheetId = Object.keys(sheets)[0];
          const sheet = sheets[sheetId];
          const cellData = sheet.cellData;
          const styles = matrix_settings.matrix_config.styles;

          // Initialize variables to track the largest row and column indices
          let maxRow = 0;
          let maxCol = 0;

          // Iterate over the cellData to extract values and styles
          for (const rowKey in cellData) {
            const rowIndex = parseInt(rowKey, 10);
            if (rowIndex > maxRow) maxRow = rowIndex;

            const row = cellData[rowKey];
            for (const colKey in row) {
              const colIndex = parseInt(colKey, 10);
              if (colIndex > maxCol) maxCol = colIndex;

              const cell = row[colKey];
              const row_col = `${rowIndex + 1}_${colIndex + 1}`; // Convert to 1-based index

              // Handle cell value
              let value = '';
              if (cell.f === '=SYSTEM()') {
                value = `config(${row_col})`;
              } else if (cell.v !== undefined) {
                value = cell.v;
              }
              input_values[row_col] = value;

              // Handle cell styles
              if (cell.s) {
                const styleId = cell.s;
                const cellStyle = styles[styleId];
                if (cellStyle) {
                  const cellStyleObj = {};

                  // Underline
                  if (cellStyle.ul) {
                    cellStyleObj['text-decoration'] = 'underline';
                  }
                  // Italic
                  if (cellStyle.it) {
                    cellStyleObj['font-style'] = 'italic';
                  }
                  // Bold
                  if (cellStyle.bl) {
                    cellStyleObj['font-weight'] = 'bold';
                  }
                  // Strikethrough
                  if (cellStyle.cl) {
                    cellStyleObj['text-decoration'] = 'line-through';
                  }
                  // Text color
                  if (cellStyle.fc) {
                    cellStyleObj['color'] = cellStyle.fc;
                  }

                  // Only include styles if any properties are set
                  if (Object.keys(cellStyleObj).length > 0) {
                    style[row_col] = cellStyleObj;
                  }
                }
              }
            }
          }

          // Set default widths for columns
          for (let col = 1; col <= maxCol + 1; col++) {
            widths[col.toString()] = 150;
          }

          // Internal function to get the largest row and column indices
          function getMaxRowCol() {
            return {
              maxRow: maxRow + 1, // Convert to 1-based index
              maxCol: maxCol + 1,
            };
          }

          // Optionally, you can use getMaxRowCol() as needed
          const { maxRow: largestRow, maxCol: largestCol } = getMaxRowCol();
          console.log('Largest Row:', largestRow);
          console.log('Largest Column:', largestCol);

          // Return the transformed data
          return {
            input_values,
            style,
            widths,
          };
        }

     const currentStyles = (value): string[] =>{
          return Object.keys(style.value?.[current_cell.value] || {})
              .filter(key => style.value?.[current_cell.value][key] === value)
        }

    function handleUpdateWidth(c, width: number){
        widths.value[c] = +width.toFixed(0)
    }

    return {
        applyStyle,
        currentStyles,
        handleUpdateWidth,
        transformLegacyData,
        style_panel,
        cols, rows,
        current_cell,
        style,
        input_values,
        widths
      }
}
