import { NextResponse } from "next/server";

const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

export async function GET() {
  // Debug logging
  console.log('API Route - Environment Variables:', {
    storeHash,
    accessToken: accessToken ? 'exists' : 'missing'
  });

  if (!accessToken || !storeHash) {
    return NextResponse.json(
      { error: "Missing credentials", debug: { hasStoreHash: !!storeHash, hasToken: !!accessToken } },
      { status: 500 }
    );
  }

  try {
    // Use v2 endpoint instead
    const url = `https://api.bigcommerce.com/stores/${storeHash}/v2/countries`;
    
    const res = await fetch(url, {
      headers: {
        'X-Auth-Token': accessToken,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('BigCommerce API Error:', error);
      throw new Error(`API Error: ${error}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 