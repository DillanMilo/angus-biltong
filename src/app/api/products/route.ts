import { NextResponse } from "next/server";

const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

export async function GET() {
  if (!storeHash || !accessToken) {
    return NextResponse.json({ error: "Missing API credentials" }, { status: 500 });
  }

  try {
    const url = `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?include=images`;

    const res = await fetch(url, {
      headers: {
        "X-Auth-Token": accessToken,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
