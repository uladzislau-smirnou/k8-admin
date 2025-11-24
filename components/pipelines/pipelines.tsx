'use client';
import { Table } from '../../shared/ui/table/table';
import { useFetchPipelines } from './hooks/use-fetch-pipeline';
import { getPipelinesConfig } from './lib/get-pipelines-config';
import type { PipelinesProps } from './types';

export function Pipelines({ tenantId, mode = 'embed', theme }: PipelinesProps) {
  if (mode === 'embed' && !tenantId)
    throw new Error('Provide a valid tetantId');

  const { isLoading, errorMessage, pipelines } = useFetchPipelines(
    tenantId,
    mode
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  const {
    columns,
    headerPillText,
    headerTitle,
    pipelinesInfo,
    cellRenderer,
    rowClassName,
  } = getPipelinesConfig(mode, pipelines);

  const onAddPipeline = () => {
    alert('adding pipeline...');
  };

  return (
    <div className={`theme-${theme}`}>
      <div className="font-sans p-5 rounded-lg border border-(--pipelines-border) text-(--pipelines-text)">
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-(--pipelines-border) border-dashed">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-(--pipelines-text)">
              {headerTitle}
            </h2>

            <span
              className="px-2 py-1 text-xs font-semibold rounded-full
              bg-(--pill-bg) text-(--pill-text)"
            >
              {headerPillText}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-(--pipelines-text)">{pipelinesInfo}</p>

            <button
              className="px-4 py-2 rounded-full cursor-pointer border-none leading-none
              bg-(--pipelines-primary-bg) text-(--pipelines-primary-text) capitalize"
              onClick={onAddPipeline}
            >
              add pipeline
            </button>
          </div>
        </div>

        <Table
          data={pipelines}
          columns={columns}
          cellRenderer={cellRenderer}
          rowClassName={rowClassName}
          emptyDataText="No pipelines found"
        />
      </div>
    </div>
  );
}
