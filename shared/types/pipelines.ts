import type { ValueOf } from 'next/dist/shared/lib/constants';
import type { USAGE_MODE } from '../constants/pipelines';

export type Pipeline = {
  tenantId: string;
  pipelineId: string;
  pipelineName: string;
  isActive: boolean;
  name: string;
};

export type UsageMode = ValueOf<typeof USAGE_MODE>;
