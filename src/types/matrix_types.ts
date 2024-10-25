export interface WidgetSettings {
  page_coordinates: PageCoordinates;
  matrix_config: MatrixConfig;
  cell_config: Record<string, any>;
}

interface PageCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MatrixConfig {
  sheets: Record<string, Sheet>;
  styles: Record<string, any>;
}

interface Sheet {
  id: string;
  name: string;
  mergeData: any[]; // Replace 'any' with specific type if known
  cellData: Record<string, Record<string, CellData>>;
}

interface CellData {
  v?: string;      // Value
  t?: number;      // Type
  f?: string;      // Formula
  s?: string;      // Style ID
}
