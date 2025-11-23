import type { ReactNode } from 'react';
import type { Pipeline } from '../../shared/types/pipelines';
import type { Column } from '../../shared/ui/table/types';

export type PipelinesProps = {
  headerTitle: string;
  headerPillText?: string;
  pipelinesInfo: string;
  data: Pipeline[];
  columns: Column<Pipeline>[];
  cellRenderer?: (data: {
    row: Pipeline;
    column: Column<Pipeline>;
  }) => ReactNode;
  onAddPipeline: () => Promise<void> | void;
  themeKeys?: 'green' | 'blue';
};
