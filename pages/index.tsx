import { useEffect, useState } from 'react';
import { Pipelines } from '../components/pipelines/pipelines';
import type { Pipeline } from '../shared/types/pipelines';
import type { Column } from '../shared/ui/table/types';
import axios from 'axios';

export default function Home() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<Pipeline[]>('/api/pipelines');
        setPipelines(res.data);
      } catch (error) {
        setError('Failed to load pipelines');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const totalPipelines = pipelines.length;
  const activePipelines = pipelines.reduce((acc, newVal) => {
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
    <div className="flex flex-wrap gap-3">
      <div className="w-full p-2 border">
        <p>Admin header</p>
      </div>
      <div className="p-2 border">
        <p>Admin navbar</p>
      </div>
      <div className="flex-1">
        <Pipelines
          columns={columns}
          data={pipelines}
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
  );
}
