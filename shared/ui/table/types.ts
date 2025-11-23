import type { ReactNode } from 'react';

export type Column<T> = {
  [K in keyof T]: {
    columnHeader: string;
    cellValueKey: K;
  };
}[keyof T];

export type TableProps<D extends {}> = {
  data: D[];
  columns: Column<D>[];
  emptyDataText?: string;
  cellRenderer?: (data: { row: D; column: Column<D> }) => ReactNode;
};
