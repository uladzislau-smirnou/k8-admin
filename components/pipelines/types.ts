import type { Pipeline } from '../../shared/types/pipelines';
import type { Column } from '../../shared/ui/table/types';

export type PipelinesProps = {
  headerTitle: string;
  headerPillText: string;
  pipelinesInfo: string;
  data: Pipeline[];
  columns: Column<Pipeline>[];
  onAddPipeline: () => Promise<void> | void;
  themeKeys?: 'green' | 'blue';
};
