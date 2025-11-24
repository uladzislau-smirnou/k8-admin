import { USAGE_MODE } from '../../../shared/constants/pipelines';
import type { Pipeline, UsageMode } from '../../../shared/types/pipelines';
import type { Column } from '../../../shared/ui/table/types';

export const getPipelinesConfig = (mode: UsageMode, pipelines: Pipeline[]) => {
  const cellRenderer = ({
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
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={!!value}
              onClick={() => alert(row.tenantId)}
              onChange={() => {
                // no-op to avoid react warning
              }}
            />
            <span className="toggle-slider" />
          </label>
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

  const rowClassName = (row: Pipeline) => {
    return row.isActive ? '' : 'row-inactive';
  };

  const activePipelines = pipelines.reduce((acc, newVal) => {
    return newVal.isActive ? acc + 1 : acc;
  }, 0);

  if (mode === USAGE_MODE.EMBED) {
    const totalPipelines = pipelines.length;
    const pipelinesInfo = `${activePipelines} active / ${totalPipelines} total`;
    const columns: Column<Pipeline>[] = [
      {
        columnHeader: 'pipeline Id',
        cellValueKey: 'pipelineId',
      },
      {
        columnHeader: 'pipeline name',
        cellValueKey: 'pipelineName',
      },
      {
        columnHeader: 'active',
        cellValueKey: 'isActive',
      },
    ];
    const headerPillText = 'Embedded Sk8 component';
    const headerTitle = 'Sk8 Admin';
    return {
      headerTitle,
      headerPillText,
      pipelinesInfo,
      columns,
      cellRenderer,
      rowClassName,
    };
  } else {
    const pipelinesInfo = `${activePipelines} active pipelines`;
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
    const headerPillText = 'Autonomous Data Infra';
    const headerTitle = 'Pipelines';
    return {
      headerTitle,
      headerPillText,
      pipelinesInfo,
      columns,
      cellRenderer,
      rowClassName,
    };
  }
};
