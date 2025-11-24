import { NextResponse } from 'next/server';
import axios from 'axios';
import type { Pipeline } from '../../../shared/types/pipelines';

export async function GET() {
  try {
    const response = await axios.get<Pipeline[]>(
      'https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines'
    );

    return NextResponse.json(response.data);
  } catch (err: any) {
    const message =
      err.response?.data?.error || err.message || 'Failed to fetch pipelines';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
