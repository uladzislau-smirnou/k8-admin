import type { UsageMode } from '../../shared/types/pipelines';

export interface PipelinesProps {
  tenantId?: string;
  mode?: UsageMode;
  theme?: 'blue' | 'green';
}
