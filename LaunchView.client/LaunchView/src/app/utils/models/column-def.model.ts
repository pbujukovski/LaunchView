export interface ColumnDef {
    columnDef: string;          // the key in the data
    header: string;             // column header
    type?: 'text' | 'date' | 'status' | 'actions'; // type for rendering
  }