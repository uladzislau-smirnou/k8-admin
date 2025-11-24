import { useEffect, useState } from 'react';
import { USAGE_MODE } from '../../../shared/constants/pipelines';
import type { Pipeline, UsageMode } from '../../../shared/types/pipelines';

export const useFetchPipelines = (tenantId?: string, mode?: UsageMode) => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        let urlString: string;
        if (mode === USAGE_MODE.EMBED) {
          const url = new URL(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/pipelines`
          );
          if (tenantId) {
            url.searchParams.append('tenantId', tenantId);
          }
          urlString = url.toString();
        } else {
          const params = tenantId ? new URLSearchParams({ tenantId }) : '';
          urlString = `/api/pipelines${params ? '?' + params : ''}`;
        }

        const res = await fetch(urlString);
        if (!res.ok) {
          setErrorMessage('Failed to fetch data');
        } else {
          setPipelines(await res.json());
        }
      } catch {
        setErrorMessage('Failed to fetch pipelines due to a network error');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tenantId, mode]);

  return {
    pipelines,
    isLoading,
    errorMessage,
  };
};
