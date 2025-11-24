import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get('tenantId');

    let url =
      'https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines';

    if (tenantId) url += `?tenantId=${tenantId}`;

    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch data' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch pipelines due to a network error' },
      { status: 500 }
    );
  }
}
