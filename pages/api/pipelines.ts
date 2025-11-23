import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import type { Pipeline } from '../../shared/types/pipelines';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pipeline[] | { error: string }>
) {
  try {
    const response = await axios.get<Pipeline[]>(
      'https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines'
    );

    return res.status(200).json(response.data);
  } catch (err: any) {
    const message =
      err.response?.data?.error || err.message || 'Failed to fetch pipelines';

    return res.status(500).json({ error: message });
  }
}
