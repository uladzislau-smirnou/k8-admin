'use client';
import { Pipelines } from '../../components/pipelines/pipelines';
import type { Pipeline } from '../../shared/types/pipelines';
import type { Column } from '../../shared/ui/table/types';

export function PipelinesClient({
  initialPipelines,
}: {
  initialPipelines: Pipeline[];
}) {
  const totalPipelines = initialPipelines.length;
  const activePipelines = initialPipelines.reduce((acc, newVal) => {
    return newVal.isActive ? acc + 1 : acc;
  }, 0);

  const pipelinesInfo = `${activePipelines} active / ${totalPipelines} total`;

  const columns: Column<Pipeline>[] = [
    {
      columnHeader: 'tenant id',
      cellValueKey: 'tenantId',
    },
    {
      columnHeader: 'pipeline Id',
      cellValueKey: 'pipelineId',
    },
    {
      columnHeader: 'pipeline name',
      cellValueKey: 'pipelineName',
    },
    {
      columnHeader: 'status',
      cellValueKey: 'isActive',
    },
  ];

  const cellRendered = ({
    row,
    column,
  }: {
    row: Pipeline;
    column: Column<Pipeline>;
  }) => {
    switch (column.cellValueKey) {
      case 'isActive': {
        const value = row[column.cellValueKey];
        return (
          <input
            type="checkbox"
            checked={!!value}
            onClick={() => alert(row.tenantId)}
            onChange={() => {
              // no-op to avoid react warning
            }}
          />
        );
      }
      case 'tenantId': {
        const value = row[column.cellValueKey];
        return (
          <span
            className="px-2 py-1 text-xs font-semibold rounded-full
            bg-(--pill-bg) text-(--pill-text)"
          >
            {value}
          </span>
        );
      }
      default: {
        const value = row[column.cellValueKey];
        return <span>{value}</span>;
      }
    }
  };

  return (
    <div className="theme-green">
      <div className="flex flex-wrap m-4 rounded-lg border border-(--pipelines-border)">
        <div className="w-full p-2 border-b border-(--pipelines-border)">
          <h2 className="text-2xl font-bold text-(--pipelines-text)">
            Sk8 admin
          </h2>
        </div>
        <div className="p-2 border-r border-(--pipelines-border) text-(--pipelines-text)">
          <p>Admin navbar</p>
        </div>
        <div className="flex-1 p-5">
          <Pipelines
            columns={columns}
            data={initialPipelines}
            headerTitle="Tenant Pipelines"
            pipelinesInfo={pipelinesInfo}
            cellRenderer={cellRendered}
            headerPillText="Autonomous Data Infra"
            onAddPipeline={() => {
              alert('check');
            }}
            themeKeys="green"
          />
        </div>
      </div>
    </div>
  );
}
