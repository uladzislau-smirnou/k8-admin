import { Table } from '../../shared/ui/table/table';
import type { PipelinesProps } from './types';

export function Pipelines({
  headerPillText = 'Embedded Sk8 component',
  headerTitle,
  pipelinesInfo,
  data,
  columns,
  cellRenderer,
  onAddPipeline,
  themeKeys = 'blue',
}: PipelinesProps) {
  return (
    <div className={`theme-${themeKeys}`}>
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
          data={data}
          columns={columns}
          cellRenderer={cellRenderer}
          emptyDataText="No pipelines found"
        />
      </div>
    </div>
  );
}
