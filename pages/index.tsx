import { useState } from 'react';
import { Pipelines } from '../components/pipelines/pipelines';
import type { Pipeline } from '../shared/types/pipelines';
import type { Column } from '../shared/ui/table/types';

export const mockPipelines: Pipeline[] = [
  {
    tenantId: 'xxx-ten-1',
    pipelineId: 'pl-001',
    pipelineName: 'Contacts Ingestion',
    isActive: true,
    name: 'contacts-pipeline',
  },
  {
    tenantId: 'xxx-ten-1',
    pipelineId: 'pl-002',
    pipelineName: 'Salesforce Sync',
    isActive: false,
    name: 'sf-sync',
  },
  {
    tenantId: 'xxx-ten-1',
    pipelineId: 'pl-003',
    pipelineName: 'Billing ETL',
    isActive: true,
    name: 'billing-etl',
  },
  {
    tenantId: 'xxx-ten-2',
    pipelineId: 'pl-004',
    pipelineName: 'Data Warehouse Sync',
    isActive: true,
    name: 'dw-sync',
  },
  {
    tenantId: 'xxx-ten-2',
    pipelineId: 'pl-005',
    pipelineName: 'Customer Analytics',
    isActive: false,
    name: 'customer-analytics',
  },
];

export default function Home() {
  const [pipelines, setPipelines] = useState<Pipeline[]>(mockPipelines);
  // const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get<Pipeline[]>('/api/pipelines');
  //       setPipelines(res.data);
  //     } catch (error) {
  //       setError('Failed to load pipelines');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, []);

  if (isLoading) {
    return <p>loading...</p>;
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
      cell: (value) => {
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full bg-green-200 text-green-800`}
          >
            {value}
          </span>
        );
      },
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
      cell: (value) => {
        return <span>{value ? 'active' : 'inactive'}</span>;
      },
    },
  ];

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
          data={mockPipelines}
          headerTitle="Tenant Pipelines"
          pipelinesInfo={pipelinesInfo}
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
