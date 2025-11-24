import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [
  'https://k8-vendor.vercel.app',
  'http://localhost:3000', // optional dev
];

// Build CORS headers
function corsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

// Preflight request
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');

  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

export async function GET(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');

    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get('tenantId');

    let url =
      'https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines';

    if (tenantId) url += `?tenantId=${tenantId}`;

    const res = await fetch(url);

    if (!res.ok) {
      return new NextResponse(
        JSON.stringify({ message: 'Failed to fetch data' }),
        {
          status: res.status,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin),
          },
        }
      );
    }

    const data = await res.json();

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(origin),
      },
    });
  } catch (error) {
    const origin = request.headers.get('origin');

    return new NextResponse(
      JSON.stringify({
        message: 'Failed to fetch pipelines due to a network error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin),
        },
      }
    );
  }
}
