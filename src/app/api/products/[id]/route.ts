import { NextRequest, NextResponse } from 'next/server';

if (!process.env.BIGCOMMERCE_STORE_HASH) {
    throw new Error("BIGCOMMERCE_STORE_HASH is not defined");
}
if (!process.env.BIGCOMMERCE_ACCESS_TOKEN) {
    throw new Error("BIGCOMMERCE_ACCESS_TOKEN is not defined");
}

const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

interface Context {
  params: {
    id: string;
  };
}

export async function GET(
  _request: NextRequest,
  context: Context
) {
  try {
    const url = `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${context.params.id}`;

    const res = await fetch(url, {
      headers: {
        "X-Auth-Token": accessToken,
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    });

    if (!res.ok) throw new Error(`Failed to fetch product: ${res.statusText}`);

    const data = await res.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error(`Error fetching product ${context.params.id}:`, error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
} 