import { PipelinesClient } from '../components/pipelines-client/pipelines-client';
import type { Pipeline } from '../shared/types/pipelines';

async function getPipelines() {
  const res = await fetch(
    'https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines',
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const pipelines: Pipeline[] = await getPipelines();

  return <PipelinesClient initialPipelines={pipelines} />;
}
